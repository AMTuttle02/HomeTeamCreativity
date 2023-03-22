<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: text/plain');

session_start();

include 'conn.php';

if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
  // log out user
  session_destroy();
  echo json_encode(array('User logged out'));
} else {
  // If the user is not logged in, return an error message as JSON
  echo json_encode(array('error' => 'User not logged in'));
}

?>
