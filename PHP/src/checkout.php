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
    $orderId = $inputs['orderId'];
    $paid = $inputs['paid'];
    $stripeId = $inputs['stripe'];

    // Obtain order details
    $query = $conn->prepare(
        "SELECT *
        FROM orders
        WHERE order_id = $orderId"
    );

    if (!$query->execute()) {
        die("Query failed: " . $query->error);
    }

    $result = mysqli_fetch_assoc($query->get_result());

    if (!$result) {
        die("Result set failed: " . $conn->error);
    }

    if ($result['status'] == 'active') {
        $query = $conn->prepare(
                            "UPDATE orders
                            SET is_cart = 0, paid = ?, status = 'processing'
                            WHERE order_id = ? AND stripeId = ?");
        $query->bind_param(
                        "sss",
                        $paid,
                        $orderId,
                        $stripeId);
        if (!$query->execute()) {
            die("Query failed: " . $stmt->error);
        }

        if ($_SESSION["order_id"]) {}
        else if (isset($_SESSION["userId"])) {
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

        if ($paid === '1') {
            include 'orderConfirmationPaid.php';
        } else if ($paid === '0') {
            include 'orderConfirmation.php';
        }

        mysqli_close($conn);
    }

    echo 1;
}

?>