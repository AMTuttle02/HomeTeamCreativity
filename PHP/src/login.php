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

// Connect to the MySQL database
$servername = "db";
$username = "MYSQL_USER";
$password = "MYSQL_PASSWORD";
$dbname = "hometeam";
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Get user logging in
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $inputs = json_decode(file_get_contents('php://input'), true);
  $email = $inputs['email'];
  $password = $inputs['password'];

  $stmt = $conn->prepare("SELECT first_name FROM users WHERE email = ? AND pswrd = ?");
  $stmt->bind_param("ss", $inputs["email"], $inputs["password"]);

  if (!$stmt->execute()) {
    die("Query failed: " . $stmt->error);
  }

  $result = $stmt->get_result();

  if (!$result) {
    die("Result set failed: " . $conn->error);
  }

  $users = [];

  

  while ($row = $result->fetch_assoc()) {
    $users[] = $row;
    $_SESSION['name'] = $row['first_name'];
  }

  echo json_encode($users);
}

mysqli_close($conn);
?>
