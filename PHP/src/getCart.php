<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

session_start();

include 'conn.php';

// Create new user account
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $inputs = json_decode(file_get_contents('php://input'), true);

  $orderId = 0;
  // Insert product to users cart
  $query = $conn->prepare(
                        "SELECT *
                        FROM orders
                        WHERE user_id = ? AND is_active = 1 AND is_cart = 1");
  $query->bind_param(
                    "s",
                    $_SESSION["userId"]);
  if (!$query->execute()) {
    die("Query failed: " . $stmt->error);
  }

  $result = mysqli_fetch_assoc($query->get_result());

  if (!$result) {
    die("Result set failed: " . $conn->error);
  }
  echo json_encode($result);
}

mysqli_close($conn);

?>
