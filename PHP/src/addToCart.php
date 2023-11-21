<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');

require_once 'secrets.php';

session_start();

include 'conn.php';

// Create new user account
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $file = $_FILES['image'];
  $targetDir = USER_UPLOAD_DIR;
  $targetFile = $targetDir . basename($file["name"]);
  $fileName = basename($file["name"]);
  $imageFileType = strtolower(pathinfo($targetFile,PATHINFO_EXTENSION));

  // Check if image file is a actual image or fake image
  $check = getimagesize($file["tmp_name"]);
  if($check === false) {
    die(json_encode("File is not an image."));
  }
  
  // Check if file already exists
  if (file_exists($targetFile)) {
    die(json_encode("Sorry, file already exists."));
  }
  
  // Check file size
  if ($file["size"] > 500000) {
    die(json_encode("Sorry, your file is too large."));
  }
  
  // Allow certain file formats
  if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
    die(json_encode("Sorry, only JPG, JPEG, & PNG files are allowed."));
  }

  $orderId = $_POST['order_id'];
  $uID = 0;
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
    $uID = NAU_ID;
    $query = $conn->prepare(
      "INSERT INTO orders (user_id, total_cost, is_cart)
      VALUES ($uID, 0, 1);");
    if (!$query->execute()) {
      die("Query failed: " . $stmt->error);
    }
    $query = $conn->prepare(
      "SELECT order_id, total_cost
      FROM orders
      WHERE user_id = $uID AND is_active = 1 AND is_cart = 1
      ORDER BY order_date DESC
      LIMIT 1");
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

  $productCost = $_POST['price'];
  
  // if everything is ok, try to upload file
  if (move_uploaded_file($file["tmp_name"], $targetFile)) {
    // Insert product to users cart
    $query = $conn->prepare(
                          "INSERT INTO 
                          product_orders (order_id, product_id, product_quantity, color, product_type, size, product_details, filename) 
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $query->bind_param(
                      "ssssssss",
                      $orderId, 
                      $_POST["product_id"], 
                      $_POST["quantity"], 
                      $_POST["color"], 
                      $_POST["product_type"], 
                      $_POST["size"], 
                      $_POST["product_details"],
                      $fileName
                      );
    if (!$query->execute()) {
      // If insertion fails, return error message
      die(json_encode("Result set failed: " . $conn->error));
    }
    $totalCost = $totalCost + $productCost;
    $query = $conn->prepare(
                          "UPDATE orders 
                          SET total_cost = $totalCost 
                          WHERE orders.order_id = $orderId");
    if (!$query->execute()) {
      // If insertion fails, return error message
      die(json_encode(0));
    }
    if ($uID) {
      echo json_encode($orderId);
    }
    else {
      echo json_encode(1);
    }
  }
}

mysqli_close($conn);

?>