<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

include 'conn.php';

if (session_status() === PHP_SESSION_ACTIVE) {
} else {
    session_start();
}

// Obtain order details
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputs = json_decode(file_get_contents('php://input'), true);
    $orderId = $inputs['order'];
    if ($_SESSION['admin']) {
        $query = $conn->prepare(
            "UPDATE orders
            SET status = 'complete'
            WHERE order_id = $orderId"
        );

        if (!$query->execute()) {
            echo json_encode(0);
        }

        echo json_encode(1);
    }
}

mysqli_close($conn);

?>
