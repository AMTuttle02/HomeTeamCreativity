<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

session_start();

include 'conn.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $inputs = json_decode(file_get_contents('php://input'), true);

    $code = $inputs['code'];
    // Obtain order details
    $query = $conn->prepare(
                          "SELECT *
                          FROM coupons
                          WHERE code = ?");
    
    $query->bind_param('s', $code);
    
    if (!$query->execute()) {
      die("Query failed: " . $stmt->error);
    }

    $result = mysqli_fetch_assoc($query->get_result());

    if (!$result) {
      die("Result set failed: " . $conn->error);
    }

    echo json_encode($result);
}

mysqli_close($conn);

?>