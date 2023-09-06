<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

session_start();

include 'conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $inputs = json_decode(file_get_contents('php://input'), true);

  if ($inputs["order_id"]) {
    $orderId = $inputs["order_id"];

    $query = $conn->prepare(
                            "SELECT SUM(product_quantity)
                            FROM product_orders
                            WHERE order_id = ?");
    $query->bind_param(
                        "s",
                        $orderId);

    if (!$query->execute()) {
        die("Query failed: " . $stmt->error);
    }
        
    $result = $query->get_result();

    $row = $result->fetch_assoc();

    echo json_encode($row);
  }
  else {
    $orderId = 0;
    // Obtain order details
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

    $orderId = $result['order_id'];

    $query = $conn->prepare(
                            "SELECT SUM(product_quantity)
                            FROM product_orders
                            WHERE order_id = ?");
    $query->bind_param(
                        "s",
                        $orderId);

    if (!$query->execute()) {
        die("Query failed: " . $stmt->error);
    }
        
    $result = $query->get_result();

    $row = $result->fetch_assoc();

    echo json_encode($row);
  }

  mysqli_close($conn);
}

?>