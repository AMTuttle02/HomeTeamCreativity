<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

session_start();

include 'conn.php';

// Obtain cart
$inputs = json_decode(file_get_contents('php://input'), true);

if ($_SESSION["order_id"]) {
    $orderId = $_SESSION["order_id"];
}
else {
    $userId = $_SESSION["userId"];

    // Obtain order details
    $query = $conn->prepare(
        "SELECT *
        FROM orders
        WHERE user_id = ? AND is_active = 1 AND is_cart = 0 AND order_date = 
            (SELECT MAX(order_date)
            FROM orders
            WHERE user_id = ? AND is_active = 1 AND is_cart = 0)"
    );
    $query->bind_param("ss", $userId, $userId);
    if (!$query->execute()) {
        die("Query failed: " . $query->error);
    }

    $result = mysqli_fetch_assoc($query->get_result());

    if (!$result) {
        die("Result set failed: " . $conn->error);
    }

    $orderId = $result['order_id'];
}

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
?>
