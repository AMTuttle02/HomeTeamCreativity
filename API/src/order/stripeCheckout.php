<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

require_once '../secrets.php';

if (session_status() === PHP_SESSION_ACTIVE) {
} else {
    session_start();
}

include '../admin/conn.php';

if ($_SESSION["order_id"]) {
    $orderId = $_SESSION["order_id"];

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


if (isset($_SESSION['total'])) {
    $total_cost = $_SESSION['total'];
} else {
    header("Location: " . '/404');
}

$total_cost *= 100;

// stripe integration
require_once '../vendor/autoload.php';

\Stripe\Stripe::setApiKey(STRIPE_KEY);

$YOUR_DOMAIN = DOMAIN;

$checkout_session = \Stripe\Checkout\Session::create([
'line_items' => [
        [
            'price_data' => [
                'currency' => 'usd',
                'unit_amount' => $total_cost,
                'product_data' => [
                    'name' => 'Order ID: '.$orderId,
                    'description' => 'Click the back arrow above to review order details.',
                ],
            ],
            'quantity' => 1,
        ]
    ],
'mode' => 'payment',
'success_url' => $YOUR_DOMAIN . '/orderComplete/' . $orderId . '/'. 1 . '/{CHECKOUT_SESSION_ID}/1',
'cancel_url' => $YOUR_DOMAIN . '/500',
]);

// Return the checkout session ID as a JSON response
$response = [
    'checkout' => $checkout_session->url,
];

$query = $conn->prepare(
                    "UPDATE orders
                    SET stripeId = ?
                    WHERE order_id = ?");

$query->bind_param(
                "ss",
                $checkout_session->id,
                $orderId,);

if (!$query->execute()) {
    header('HTTP/1.1 500 Internal Server Error');
    header('Location: '. $YOUR_DOMAIN . '/500');
} else {
    echo json_encode($response);
}
