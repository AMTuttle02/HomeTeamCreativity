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
    $email = $inputs['email'];
    $first = $inputs['first'];
    $last = $inputs['last'];
    $ship = $inputs['shipping'];
    $location = $inputs['dbLocation'];

    if ($inputs["order_id"]) {
        $orderId = $inputs["order_id"];

        $query = $conn->prepare(
                            "UPDATE orders
                            SET location = ?, shipped = ?, email = ?, first_name = ?, last_name = ?
                            WHERE order_id = ?");
        $query->bind_param(
                        "ssssss",
                        $location,
                        $ship,
                        $email,
                        $first,
                        $last,
                        $orderId);
        if (!$query->execute()) {
            die("Query failed: " . $stmt->error);
        }
        $_SESSION['order_id'] = $orderId;
    }
    else {
        $userId = $_SESSION["userId"];

        // Obtain order details
        $query = $conn->prepare(
            "SELECT *
            FROM orders
            WHERE user_id = $userId AND is_active = 1 AND is_cart = 1"
        );
        if (!$query->execute()) {
            die("Query failed: " . $query->error);
        }

        $result = mysqli_fetch_assoc($query->get_result());

        if (!$result) {
            die("Result set failed: " . $conn->error);
        }

        $orderId = $result['order_id'];

        $query = $conn->prepare(
                            "UPDATE orders
                            SET location = ?, shipped = ?, email = ?, first_name = ?, last_name = ?
                            WHERE order_id = ?");
        $query->bind_param(
                        "ssssss",
                        $location,
                        $ship,
                        $email,
                        $first,
                        $last,
                        $orderId);
        if (!$query->execute()) {
            die("Query failed: " . $stmt->error);
        }
    }

    mysqli_close($conn);

    echo 1;
}
?>