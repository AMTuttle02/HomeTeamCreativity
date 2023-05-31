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
    if ($_SESSION['admin']) {
        $query = $conn->prepare(
            "SELECT *
            FROM orders o
            JOIN product_orders po ON o.order_id = po.order_id
            JOIN products p ON p.product_id = po.product_id
            WHERE o.status = 'processing'"
        );

        if (!$query->execute()) {
            die("Query failed: " . $query->error);
        }

        $result = $query->get_result();

        $rows = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
        }
        echo json_encode($rows);
    }
}

mysqli_close($conn);

?>
