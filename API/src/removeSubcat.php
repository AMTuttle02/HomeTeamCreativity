<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

include 'conn.php';

// Create new user account
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $input = json_decode(file_get_contents('php://input'), true);

  // Insert product to users cart
  $query = $conn->prepare(
                        "DELETE FROM subcategories
                        WHERE name = ?;");
  $query->bind_param(
                    "s",
                    $input['subcategory']);

  if (!$query->execute()) {
    // If insertion fails, return error message
    echo json_encode(0);
  }
  else {
    echo json_encode(1);
  }
}

mysqli_close($conn);

?>