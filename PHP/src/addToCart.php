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
                        WHERE user_id = ? AND is_active = 1");
  $query->bind_param(
                    "s",
                    $_SESSION["userId"]);
  if (!$query->execute()) {
    die("Query failed: " . $stmt->error);
  }

  $result = $query->get_result();

  if (!$result) {
    die("Result set failed: " . $conn->error);
  }

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $orderId = $row['order_id'];
    $totalCost = $row['total_cost'];
  }

  $productCost = $inputs['price'];
  $totalCost = $totalCost + $productCost;

  $query = $conn->prepare(
                        "UPDATE orders 
                        SET total_cost = $totalCost 
                        WHERE orders.order_id = $orderId");
  if (!$query->execute()) {
    // If insertion fails, return error message
    die(json_encode(0));
  }

  // Insert product to users cart
  $query = $conn->prepare(
                        "INSERT INTO 
                        product_orders (order_id, product_id, product_quantity, color, product_type, size, product_details) 
                        VALUES (?, ?, ?, ?, ?, ?, ?)");
  $query->bind_param(
                    "sssssss",
                    $orderId, 
                    $inputs["product_id"], 
                    $inputs["quantity"], 
                    $inputs["color"], 
                    $inputs["product_type"], 
                    $inputs["size"], 
                    $inputs["product_details"]);
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