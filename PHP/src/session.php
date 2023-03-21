<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: text/plain');

session_start();

include 'conn.php';

if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
  // Get the user's first name from the session
  $firstName = $_SESSION['first_name'];

  // Return the user's first name as JSON
  echo json_encode(array('first_name' => $firstName));
} else {
  // If the user is not logged in, return an error message as JSON
  echo json_encode(array('error' => 'User not logged in'));
}

?>

