<?php
// Requires login.jsx to pass it a "JSON.stringify()"-ed form containing variables with these names
// email, password
// returns email of the row with a matching email and password
// If there is no matching row, returns an empty array

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Access-Control-Allow-Headers: Content-Type");

session_start();

include 'conn.php';

// Get user logging in
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $inputs = json_decode(file_get_contents('php://input'), true);
  $email = $inputs['email'];

  $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
  $stmt->bind_param("s", $email);

  if (!$stmt->execute()) {
    die("Query failed: " . $stmt->error);
  }

  $result = $stmt->get_result();

  if (!$result) {
    die("Result set failed: " . $conn->error);
  }

  if ($result->num_rows > 0) {
    // Set the session variables
    $row = $result->fetch_assoc();
    $_SESSION['loggedin'] = true;
    $_SESSION['email'] = $email;
    $_SESSION['first_name'] = $row['first_name'];
    $_SESSION['last_name'] = $row['last_name'];
    $_SESSION['admin'] = $row['admin'];
    $_SESSION['userId'] = $row['user_id'];
    $_SESSION['order_id'] = 0;

    echo(json_encode($_SESSION));
  } else {
    // If the email and password do not match, display an error message
    echo(json_encode("Invalid email or password."));
  } 
}

$conn->close();
?>