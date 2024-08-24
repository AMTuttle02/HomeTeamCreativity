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

        $file_path = USER_UPLOAD_DIR;

        $query = $conn->prepare("SELECT * FROM product_orders 
                                WHERE order_id = ?");
        $query->bind_param(
            "s",
            $orderId);

        if (!$query->execute()) {
            die(json_encode('Top Failed'));
        }
        $result = $query->get_result();

        if (!$result) {
            die("Result set failed: " . $conn->error);
        }

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $file_path = USER_UPLOAD_DIR;
                if ($row['customerFilename']) {
                    $file_path .= $row['customerFilename'];
                    unlink($file_path);
                }
            }
        }
        echo json_encode(1);
    }
}

mysqli_close($conn);

?>
