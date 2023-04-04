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
  $stmt = $conn->prepare(
                        "INSERT INTO 
                        product_orders (order_id, product_id, product_quantity, color, product_type, product_details) 
                        VALUES (?, ?, ?, ?, ?, ?)");
  $query->bind_param(
                    "ssssss", 
                    $inputs["order_id"], 
                    $inputs["product_id"], 
                    $inputs["quantity"], 
                    $inputs["color"], 
                    $inputs["product_type"], 
                    $inputs["product_details"]);
  if (!$query->execute()) {
    // If insertion fails, return error message
    echo json_encode("ERR: Insertion failed to execute" . $query->error);
    }
    else {
        echo json_encode("Product added to cart");
    }
}

mysqli_close($conn);

?>