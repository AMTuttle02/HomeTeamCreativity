<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

require_once 'secrets.php';

session_start();

include 'conn.php';

if ($_SESSION["order_id"]) {
    $orderId = $_SESSION["order_id"];
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
}

$query = $conn->prepare(
                    "UPDATE orders
                    SET is_cart = 0, status = 'processing'
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
    if ($_SESSION["order_id"]) {
        $userId = NAU_ID;
        $query->bind_param(
            "s",
            $userId);
    }
    else {
        $query->bind_param(
                            "s",
                            $_SESSION["userId"]);
    }
    if (!$query->execute()) {
        die("Query failed: " . $query->error);
    }
}

include 'orderConfirmation.php';

mysqli_close($conn);


header("HTTP/1.1 303 See Other");
header("Location: /orderComplete");

?>