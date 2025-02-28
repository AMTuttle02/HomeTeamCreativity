<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

include '../admin/conn.php';

$sql = "SELECT * FROM categories";
$result = mysqli_query($conn, $sql);
$categories = [];
while ($row = mysqli_fetch_assoc($result)) {
  $categories[] = $row;
}

function compareByPosition($a, $b) {
  return $a['position'] <=> $b['position'];
}

usort($categories, 'compareByPosition');
echo json_encode($categories);


mysqli_close($conn);

?>