<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

session_start();

include '../admin/conn.php';

$sql = "SELECT * FROM navbar;";
$result = mysqli_query($conn, $sql);
$rows = [];
while ($row = mysqli_fetch_assoc($result)) {
    $rows[] = $row;
}

function compareByPosition($a, $b) {
  return $a['position'] <=> $b['position'];
}

usort($rows, 'compareByPosition');

echo json_encode($rows);

mysqli_close($conn);

?>