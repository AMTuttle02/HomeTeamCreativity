<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'conn.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_SESSION['admin'])) {
    http_response_code(403);
    echo json_encode(["error" => "Admin access required"]);
    exit;
}

$inputs = json_decode(file_get_contents('php://input'), true);
if (!isset($inputs['locations']) || !is_array($inputs['locations'])) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid pickup locations"]);
    exit;
}

$conn->begin_transaction();
$delete = $conn->prepare("DELETE FROM pickupLocations");
if ($delete === false || !$delete->execute()) {
    $conn->rollback();
    http_response_code(500);
    echo json_encode(["error" => "Unable to save pickup locations"]);
    exit;
}

$insert = $conn->prepare("INSERT INTO pickupLocations (location, charge_sales_tax) VALUES (?, ?)");
if ($insert === false) {
    $conn->rollback();
    http_response_code(500);
    echo json_encode(["error" => "Unable to save pickup locations"]);
    exit;
}

foreach ($inputs['locations'] as $item) {
    $location = isset($item['location']) ? trim((string)$item['location']) : "";
    if ($location === "") {
        continue;
    }
    $chargeSalesTax = !empty($item['charge_sales_tax']) ? 1 : 0;
    $insert->bind_param("si", $location, $chargeSalesTax);
    if (!$insert->execute()) {
        $conn->rollback();
        http_response_code(500);
        echo json_encode(["error" => "Unable to save pickup locations"]);
        exit;
    }
}

$conn->commit();
echo json_encode(1);
?>