<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

include 'conn.php';

// Get all users
if ($_SERVER['REQUEST_METHOD'] === 'Post') {
  $sql = "";
  
}

echo json_encode("Hi");

mysqli_close($conn);
?>
