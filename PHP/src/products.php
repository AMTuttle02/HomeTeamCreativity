<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

include 'conn.php';

// Get all products
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $sql = "SELECT * FROM products WHERE product_id > 0";
  $result = mysqli_query($conn, $sql);
  $products = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $products[] = $row;
  }
  echo json_encode($products);
}

mysqli_close($conn);
