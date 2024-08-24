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

  $quantity = $input['quantity'] - 1;

  // Insert product to users cart
  $query = $conn->prepare(
                        "UPDATE product_orders
                        SET product_quantity = $quantity
                        WHERE order_id = ?
                        AND product_id = ?
                        AND color = ? 
                        AND product_type = ?
                        AND size = ?");
  $query->bind_param(
                    "sssss",
                    $input['order_id'],
                    $input['product_id'],
                    $input['color'],
                    $input['product_type'],
                    $input['size']);

  if (!$query->execute()) {
    // If insertion fails, return error message
    echo json_encode(0);
  }
  else {
    
    $price = $input['price'];

    $query = $conn->prepare(
                            "UPDATE orders
                            SET total_cost = total_cost - $price
                            WHERE order_id = ?");
    $query->bind_param(
        "s",
        $input['order_id']);

    if (!$query->execute()) {
        die("Query failed: " . $stmt->error);
    }
    else {
        echo json_encode(1);
    }
  }
}

mysqli_close($conn);

?>