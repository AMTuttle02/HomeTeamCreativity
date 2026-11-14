<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include 'conn.php';

$query = $conn->prepare("SELECT location, charge_sales_tax FROM pickupLocations ORDER BY location");
if ($query === false || !$query->execute()) {
    http_response_code(500);
    echo json_encode(["error" => "Unable to load pickup locations"]);
    exit;
}

$result = $query->get_result();
$locations = [];
while ($row = $result->fetch_assoc()) {
    $locations[] = [
        "location" => $row["location"],
        "charge_sales_tax" => (int)$row["charge_sales_tax"]
    ];
}

if (count($locations) === 0) {
    $legacy = $conn->prepare("SELECT text FROM staticText WHERE page = ? AND location = ? LIMIT 1");
    $page = "checkout";
    $key = "pickupLocations";
    $legacy->bind_param("ss", $page, $key);
    if ($legacy->execute()) {
        $legacyResult = $legacy->get_result()->fetch_assoc();
        if ($legacyResult && !empty($legacyResult["text"])) {
            foreach (explode(";", $legacyResult["text"]) as $location) {
                $location = trim($location);
                if ($location !== "") {
                    $locations[] = ["location" => $location, "charge_sales_tax" => 0];
                }
            }
        }
    }
}

echo json_encode($locations);
?>