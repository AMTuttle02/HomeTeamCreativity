<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

session_start();

include '../admin/conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $inputs = json_decode(file_get_contents('php://input'), true);
  $orderId = $inputs['order_id'];
  $empty = 0;
  if ($orderId == 0) {
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

    $result = $query->get_result();

    if (!$result) {
      die("Result set failed: " . $conn->error);
    }

    if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      $orderId = $row['order_id'];
      $totalCost = $row['total_cost'];
    }
  }
  else if ($orderId == 1) {
    $empty = 1;
  }
  else {
    $query = $conn->prepare(
      "SELECT order_id, total_cost
      FROM orders
      WHERE order_id = $orderId");
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
  }

  if ($empty == 1) {
    echo json_encode([]);
  }
  else {
    $query = $conn->prepare(
                            "SELECT *
                            FROM product_orders
                            INNER JOIN products ON product_orders.product_id = products.product_id
                            WHERE product_orders.order_id = ?");
    $query->bind_param(
                      "s",
                      $orderId);
    if (!$query->execute()) {
      die("Query failed: " . $stmt->error);
    }

    $result = $query->get_result();

    $rows = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
    }

    echo json_encode($rows);
  }
  mysqli_close($conn);
}

?>
