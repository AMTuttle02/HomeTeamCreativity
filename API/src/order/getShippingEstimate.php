<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

session_start();

include '../admin/conn.php';
require_once '../secrets.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

$inputs = json_decode(file_get_contents('php://input'), true);
$orderId = isset($inputs['order_id']) ? intval($inputs['order_id']) : null;
$location = isset($inputs['dbLocation']) ? $inputs['dbLocation'] : '';

// extract 5-digit ZIP
$destZip = null;
if (preg_match('/\b(\d{5})\b/', $location, $m)) {
    $destZip = $m[1];
}

if (!$destZip) {
    echo json_encode(["error" => "No valid destination ZIP found in address"]);
    exit;
}

// count quantity
$qty = 0;
if ($orderId) {
    $pq = $conn->prepare("SELECT COALESCE(SUM(product_quantity),0) AS qty FROM product_orders WHERE order_id = ?");
    $pq->bind_param("i", $orderId);
    if ($pq->execute()) {
        $r = mysqli_fetch_assoc($pq->get_result());
        $qty = intval($r['qty']);
    }
}

// at least 1 ounce per order item assumed
$weightOz = max(1, $qty * 16);

function getOAuthToken() {
    $tokenUrl = USPS_API_BASE . '/oauth2/v3/token';
    $ch = curl_init($tokenUrl);
    $payload = [
        'client_id' => USPS_CLIENT_ID,
        'client_secret' => USPS_CLIENT_SECRET,
        'grant_type' => 'client_credentials'
    ];
    $jsonBody = json_encode($payload);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonBody);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);

    $resp = curl_exec($ch);
    if ($resp === false) { $err = curl_error($ch); curl_close($ch); return ["error" => "Token request failed: $err"]; }
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $json = json_decode($resp, true);
    if ($httpCode >= 400) return ["error" => "Token endpoint returned HTTP $httpCode", "raw" => $json ?: $resp];
    if (!$json || !isset($json['access_token'])) return ["error" => "Invalid token response", "raw" => $json ?: $resp];
    return ["token" => $json['access_token'], "raw" => $json];
}

function find_key_recursive($data, $keyToFind) {
    if (is_array($data)) {
        foreach ($data as $k => $v) {
            if ($k === $keyToFind) return $v;
            $res = find_key_recursive($v, $keyToFind);
            if ($res !== null) return $res;
        }
    }
    return null;
}

function callBaseRates($originZip, $destZip, $weightOz) {
    $tokenResult = getOAuthToken();
    if (isset($tokenResult['error'])) return ["error" => $tokenResult['error'], "detail" => $tokenResult];
    $accessToken = $tokenResult['token'];

    $baseRatesEndpoint = USPS_API_BASE . '/prices/v3/base-rates/search';

    // convert ounces to pounds for the prices API (approximately)
    $weightLbs = max(0.0, round($weightOz / 16, 3));

    $payload = [
        'originZIPCode' => $originZip,
        'destinationZIPCode' => $destZip,
        'weight' => $weightLbs,
        'length' => 12,
        'width' => 10,
        'height' => 4,
        'mailClass' => 'USPS_GROUND_ADVANTAGE',
        'processingCategory' => 'MACHINABLE',
        'destinationEntryFacilityType' => 'NONE',
        'rateIndicator' => 'DR',
        'priceType' => 'COMMERCIAL'
    ];

    $ch = curl_init($baseRatesEndpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $accessToken
    ]);
    $resp = curl_exec($ch);
    if ($resp === false) { $err = curl_error($ch); curl_close($ch); return ["error" => "Prices request failed: $err"]; }
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $json = json_decode($resp, true);
    if ($httpCode >= 400) {
        return ["error" => "USPS API error", "status" => $httpCode, "raw" => $json ?: $resp];
    }

    // per spec, use totalBasePrice from response
    $total = find_key_recursive($json, 'totalBasePrice');
    if ($total !== null && is_numeric($total)) {
        return ["shipping_cost" => floatval($total), "raw" => $json];
    }

    // fallback: try totalBasePrice inside options or first element
    if (is_array($json)) {
        // try search for numeric totalBasePrice anywhere
        $flat = json_encode($json);
        preg_match_all('/"totalBasePrice"\s*:\s*([0-9]+\.?[0-9]*)/', $flat, $m);
        if (!empty($m[1])) {
            return ["shipping_cost" => floatval(min($m[1])), "raw" => $json];
        }
    }

    return ["error" => "No totalBasePrice found", "raw" => $json];
}

$origin = defined('USPS_ORIGIN_ZIP') ? USPS_ORIGIN_ZIP : '44833';
$result = callBaseRates($origin, $destZip, $weightOz);
if (isset($result['error'])) {
    echo json_encode(["error" => $result['error'], "detail" => (isset($result['detail']) ? $result['detail'] : (isset($result['raw']) ? $result['raw'] : null))]);
    exit;
}

echo json_encode(["shipping_cost" => round(floatval($result['shipping_cost']), 2), "weight_oz" => $weightOz, "raw" => (isset($result['raw']) ? $result['raw'] : null)]);

mysqli_close($conn);

?>
