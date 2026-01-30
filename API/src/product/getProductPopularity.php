<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

include '../admin/conn.php';

// Return product popularity as product_id => total_quantity
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $sql = "SELECT product_id, SUM(COALESCE(product_quantity,1)) AS qty FROM product_orders GROUP BY product_id";
  $result = mysqli_query($conn, $sql);
  $pop = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $pop[$row['product_id']] = (int)$row['qty'];
  }
  echo json_encode($pop);
}

mysqli_close($conn);
