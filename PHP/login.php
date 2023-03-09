<?php
// Run by fetch in login.jsx to query the database
// Requires login.jsx to pass it a "JSON.stringify()"-ed form containing variables with these names
// email, password
// returns email of the row with a matching email and password
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

// Get user logging in
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $query = $conn->prepare("SELECT * FROM users WHERE email = ? AND pswrd = ?;");
  $query->bind_param("ss", $inputs["email"], $inputs["password"]);
  $result = mysqli_query($conn, $query);
  $users = [];
  while ($row = mysqli_fetch_assoc($result)) {
    // Get only user email from query (second column of the table)
    $users[] = $row[1];
  }
  echo json_encode($users);
}

mysqli_close($conn);
