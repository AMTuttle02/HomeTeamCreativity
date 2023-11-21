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

  $file_path = USER_UPLOAD_DIR;

  $query = $conn->prepare("SELECT * FROM product_orders 
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
    die(json_encode('Top Failed'));
  }
  $result = $query->get_result();

  if (!$result) {
    die("Result set failed: " . $conn->error);
  }

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $file_path .= $row['filename'];
  }

  if (file_exists($file_path)) {
    if (unlink($file_path)) {
      $query = $conn->prepare(
                            "DELETE FROM product_orders
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
  }
}

mysqli_close($conn);

?>