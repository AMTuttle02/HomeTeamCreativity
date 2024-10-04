<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

session_start();

include '../admin/conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputs = json_decode(file_get_contents('php://input'), true);
    $orderId = $inputs['orderId'];

    $query = $conn->prepare(
        "SELECT *
        FROM product_orders
        JOIN products ON product_orders.product_id = products.product_id
        WHERE product_orders.order_id = ?"
    );
    $query->bind_param("i", $orderId);
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

    mysqli_close($conn);
}
?>
