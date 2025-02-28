<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

session_start();

include '../admin/conn.php';

// Obtain order details
$sql = "SELECT * FROM coupons";
  $result = mysqli_query($conn, $sql);
  $coupons = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $coupons[] = $row;
  }
  echo json_encode($coupons);


mysqli_close($conn);

?>