<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

session_start();

include 'conn.php';

// Obtain order details
$sql = "SELECT * FROM subcategories";
  $result = mysqli_query($conn, $sql);
  $cats = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $cats[] = $row;
  }
  echo json_encode($cats);


mysqli_close($conn);

?>