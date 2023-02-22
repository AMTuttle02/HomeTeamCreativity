<?php
// Run by fetch in login.jsx to query the database
// Requires login.jsx to pass it a "JSON.stringify()"-ed form containing variables with these names
// email, password
// returns all attributes of the row with a matching email and password
// If there is no matching row, returns an empty array

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

// Connect to the MySQL database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hometeam";
$conn = mysqli_connect($servername, $username, $password, $dbname);
$inputs = json_decode(file_get_contents('php://input'), true);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Get all users
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $sql = "SELECT * FROM users WHERE email = '" . $inputs["email"] . "' AND pswrd = '" . $inputs["password"] . "';";
  $result = mysqli_query($conn, $sql);
  $users = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $users[] = $row;
  }
  echo json_encode($users);
}

mysqli_close($conn);
