<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

session_start();

include 'conn.php';

if (isset($_SESSION["recentDesign"])) {
    $fileName = $_SESSION["recentDesign"];
}

if (isset($fileName)) {
  $stmt = $conn->prepare ("SELECT * FROM products WHERE filename='$fileName'");
  if (!$stmt->execute()) {
    die("Query failed: " . $stmt->error);
  }

  $result = $stmt->get_result();

  if (!$result) {
    die("Result set failed: " . $conn->error);
  }

  $design = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $design[] = $row;
  }
  echo json_encode($design);
}

mysqli_close($conn);
