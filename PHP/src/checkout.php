<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

session_start();

include 'conn.php';

if ($_SESSION["order_id"]) {
    $orderId = $_SESSION["order_id"];

    // Obtain order details
    $query = $conn->prepare(
        "SELECT *
        FROM orders
        WHERE order_id = $orderId"
    );
}
else {
    $userId = $_SESSION["userId"];

    // Obtain order details
    $query = $conn->prepare(
        "SELECT *
        FROM orders
        WHERE user_id = $userId AND is_active = 1 AND is_cart = 1"
    );
}

if (!$query->execute()) {
    die("Query failed: " . $query->error);
}

$result = mysqli_fetch_assoc($query->get_result());

if (!$result) {
    die("Result set failed: " . $conn->error);
}

$orderId = $result['order_id'];
$email = $result['email'];
$first = $result['first_name'];
$last = $result['last_name'];

if ($orderId && $email && $first && $last) {
    $query = $conn->prepare(
                        "UPDATE orders
                        SET is_cart = 0, paid = 1, status = 'processing'
                        WHERE order_id = ?");
    $query->bind_param(
                    "s",
                    $orderId);
    if (!$query->execute()) {
        die("Query failed: " . $stmt->error);
    }

    if ($_SESSION["order_id"]) {}
    else {
        $query = $conn->prepare(
                                "INSERT INTO orders (user_id, total_cost, is_cart)
                                VALUES (?, 0, 1);");
        $query->bind_param(
                            "s",
                            $_SESSION["userId"]);
        if (!$query->execute()) {
            die("Query failed: " . $query->error);
        }
    }
    include 'orderConfirmationPaid.php';

    mysqli_close($conn);

    header("HTTP/1.1 303 See Other");
    header("Location: /orderComplete");
}
else {
    header("HTTP/1.1 303 See Other");
    header("Location: /orderfailed");
}

?>