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

    $query = $conn->prepare(
                        "UPDATE orders
                        SET is_cart = 0
                        WHERE order_id = ?");
    $query->bind_param(
                    "s",
                    $inputs["order_id"]);
    if (!$query->execute()) {
        die("Query failed: " . $stmt->error);
    }

    $query = $conn->prepare(
                            "INSERT INTO orders (user_id, total_cost, is_cart)
                            VALUES (?, 0, 1);");
    $query->bind_param(
                        "s",
                        $_SESSION["userId"]);
    if (!$query->execute()) {
        die("Query failed: " . $query->error);
    }

    include 'orderConfirmation.php';

    echo(1);
}
mysqli_close($conn);

?>