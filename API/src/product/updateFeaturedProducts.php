<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

include '../admin/conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $input = json_decode(file_get_contents('php://input'), true);
  if (!$input || !is_array($input)) {
    echo json_encode("Error - invalid input");
    exit;
  }

  // set all featured = 0
  $reset = $conn->query("UPDATE products SET featured = 0");
  if ($reset === false) {
    echo json_encode("Error - cannot reset featured products");
    exit;
  }

  // prepare update
  $stmt = $conn->prepare("UPDATE products SET featured = ? WHERE product_id = ?");
  if ($stmt === false) {
    echo json_encode("Error - cannot prepare update statement");
    exit;
  }

  foreach ($input as $p) {
    if (isset($p['id']) && isset($p['position']) && $p['position'] >= 1) {
      $stmt->bind_param("ii", $p['position'], $p['id']);
      $stmt->execute();
    }
  }

  echo json_encode(1);
}

mysqli_close($conn);
?>