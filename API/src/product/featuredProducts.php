<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

include '../admin/conn.php';

// Get all products
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $sql = "SELECT * FROM products WHERE featured > 0";
  $result = mysqli_query($conn, $sql);
  $products = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $products[] = $row;
  }

  function compareByPosition($a, $b) {
    return $a['featured'] <=> $b['featured'];
  }
  
  usort($products, 'compareByPosition');

  echo json_encode($products);
}

mysqli_close($conn);
