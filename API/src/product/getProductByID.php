<?php
// Requires products.jsx to pass it a "JSON.stringify()"-ed form containing the variable with this name
// product_id
// returns all elements of the row with a matching product_id
// If there is no matching row, returns an empty array

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Access-Control-Allow-Headers: Content-Type");

session_start();

// Connect to the MySQL database
include '../admin/conn.php';

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

$inputs = json_decode(file_get_contents('php://input'), true);

if (isset($_SESSION['product_id'])) {
  $id = $_SESSION['product_id'];
}
else if (isset($inputs['product_id'])) {
  $id = $inputs['product_id'];
}
else {
  echo json_encode("ERR: No product_id provided");
  exit();
}

$query = $conn->prepare("SELECT * FROM products WHERE product_id = ?;");
$query->bind_param("s", $id);
if (!$query->execute()) {
  // If insertion fails, return error message
  echo json_encode("ERR: Insertion failed to execute" . $query->error);
}
else {
  $result = $query->get_result();
  $products = mysqli_fetch_assoc($result);

  echo json_encode($products);
}

mysqli_close($conn);
?>
