<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

include '../admin/conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $inputs = json_decode(file_get_contents('php://input'), true);
  $orderId = $inputs['order_id'];
  $stripe = $inputs['stripe'];

  $query = $conn->prepare(
                      "UPDATE orders
                      SET stripeId = ?
                      WHERE order_id = ?");

  $query->bind_param(
                  "ss",
                  $stripe,
                  $orderId,);

  if (!$query->execute()) {
      header('HTTP/1.1 500 Internal Server Error');
      header('Location: '. $YOUR_DOMAIN . '/500');
  } else {
      echo json_encode(1);
  }
}