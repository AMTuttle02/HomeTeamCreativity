<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: text/plain');

session_start();

include 'conn.php';

if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
  // Get the user's first name from the session
  $firstName = $_SESSION['first_name'];
  $userId = $_SESSION['userId'];
  $lastName = $_SESSION['last_name'];
  $email = $_SESSION['email'];
  $admin = $_SESSION['admin'];

  // Return the user's first name as JSON
  echo json_encode(array('first_name' => $firstName, 'userId' => $userId, 'last_name' => $lastName, 'email' => $email, 'admin' => $admin));
} else {
  // If the user is not logged in, return an error message as JSON
  echo json_encode(array('error' => 'User not logged in'));
}

?>

