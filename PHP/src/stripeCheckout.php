<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');
require_once 'secrets.php';

if (session_status() === PHP_SESSION_ACTIVE) {
} else {
    session_start();
}

include 'conn.php';

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
$total_cost = number_format(($result['total_cost'] * 1) + ($result['total_cost'] * 0.029 + 0.31), 2);

$total_cost = $total_cost * 100;

// stripe integration
require_once 'vendor/autoload.php';
//require_once '../secrets.php';

\Stripe\Stripe::setApiKey(STRIPE_KEY);
header('Content-Type: application/json');

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
  'success_url' => $YOUR_DOMAIN . '/api/checkout.php',
  'cancel_url' => $YOUR_DOMAIN . '/cart',
]);

header("HTTP/1.1 303 See Other");
header("Location: " . $checkout_session->url);

