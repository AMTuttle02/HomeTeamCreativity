<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

include 'conn.php';

// Get all users
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $sql = "SELECT * FROM products";
  $result = mysqli_query($conn, $sql);
  $users = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $users[] = $row;
  }
  echo json_encode($users);
}

mysqli_close($conn);
