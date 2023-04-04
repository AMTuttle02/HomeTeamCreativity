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

  // Check if email address already exists
  $query = $conn->prepare(
                        "INSERT INTO 
                        product_orders (order_id, product_id, product_quantity, color, product_type, size, product_details) 
                        VALUES (?, ?, ?, ?, ?, ?, ?)");
  $query->bind_param(
                    "sssssss",
                    $inputs["order_id"], 
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