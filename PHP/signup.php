<?php
// Run by fetch in SignUp.jsx to query the database
// Requires SignUp.jsx to pass it a "JSON.stringify()"-ed form containing variables with these names
// email, password, fname, lname
// inserts a new row into the users table, then returns the given email
// If the email to insert is not unique or the query otherwise fails, returns an error message

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

// Create new user account
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  // Attempt to insert new user into table
  $query = $conn->prepare("INSERT INTO users (email, pswrd, first_name, last_name) VALUES (?, ?, ?, ?);");
  $query->bind_param("ssss", $inputs["email"], $inputs["password"], $inputs["fname"], $inputs["lname"]);
  if(!mysqli_query($conn, $query)) {
    // If insertion fails, return error message
    echo json_encode("ERR: Insertion failed to execute");
  }
  else {
    // Check that the new user now exists and return email
    $query = $conn->prepare("SELECT * FROM users WHERE email = ?;");
    $query->bind_param("s", $inputs["email"]);
    $result = mysqli_query($conn, $query);
    $users = [];
    while ($row = mysqli_fetch_assoc($result)) {
      // Get only user email from query (second column of the table)
      $users[] = $row[1];
    }
  }
  echo json_encode($users);
}

mysqli_close($conn);
