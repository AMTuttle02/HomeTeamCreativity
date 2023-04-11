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
include 'conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputs = json_decode(file_get_contents('php://input'), true);

    // Check connection
    if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
    }

    $_SESSION['product_id'] = $inputs['id'];

    echo json_encode($_SESSION['product_id']);
}
mysqli_close($conn);
?>
