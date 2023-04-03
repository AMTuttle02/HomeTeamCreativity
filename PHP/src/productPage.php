<?php
// Requires products.jsx to pass it a "JSON.stringify()"-ed form containing the variable with this name
// product_id
// returns all elements of the row with a matching product_id
// If there is no matching row, returns an empty array

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Access-Control-Allow-Headers: Content-Type");

// Connect to the MySQL database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hometeam";
$conn = mysqli_connect($servername, $username, $password, $dbname);
$inputs = json_decode(file_get_contents('php://input'), true);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Get user logging in
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $query = $conn->prepare("SELECT * FROM products WHERE product_id = ?;");
  $query->bind_param("s", $inputs["product_id"]);
  $result = mysqli_query($conn, $query);
  $productData = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $productData[] = $row;
  }
  
  echo json_encode($productData);
}

mysqli_close($conn);
?>
