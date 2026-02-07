<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

include '../admin/conn.php';

// Create new user account
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $inputs = json_decode(file_get_contents('php://input'), true);

  // Insert coupon; support separate categories and subcategories columns
  $query = $conn->prepare(
                        "INSERT INTO coupons (code, description, amount, type, minimum_required, maximum_allowed, start_time, end_time, categories, subcategories)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
  $query->bind_param(
                    "ssssssssss",
                    $inputs['code'],
                    $inputs['description'],
                    $inputs['amount'],
                    $inputs['type'],
                    $inputs['minimum_required'],
                    $inputs['maximum_allowed'],
                    $inputs['start_time'],
                    $inputs['end_time'],
                    $inputs['categories'],
                    $inputs['subcategories']
                  );

  if (!$query->execute()) {
    // If insertion fails, return error message
    echo json_encode($query->error);
  }
  else {
    echo json_encode(1);
  }
}

mysqli_close($conn);

?>