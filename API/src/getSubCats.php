<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

session_start();

include 'conn.php';

$sql = "SELECT * FROM subcategories;";
$result = mysqli_query($conn, $sql);
$cats = [];
while ($row = mysqli_fetch_assoc($result)) {
    $cats[] = $row;
}

// Define a custom comparison function to sort by the "name" element
function compareByName($a, $b) {
    return strcmp($a['name'], $b['name']);
}

// Use the usort() function to sort the array of arrays based on the custom comparison function
usort($cats, 'compareByName');

echo json_encode($cats);

mysqli_close($conn);

?>
