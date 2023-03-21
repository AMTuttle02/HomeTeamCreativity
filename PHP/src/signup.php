<?php
// Run by fetch in SignUp.jsx to query the database
// Requires SignUp.jsx to pass it a "JSON.stringify()"-ed form containing variables with these names
// email, password, fname, lname
// inserts a new row into the users table, then returns the given email
// If the email to insert is not unique or the query otherwise fails, returns an error message

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

// Connect to the MySQL database
$servername = "db";
$username = "MYSQL_USER";
$password = "MYSQL_PASSWORD";
$dbname = "hometeam";
$conn = mysqli_connect($servername, $username, $password, $dbname);
$inputs = json_decode(file_get_contents('php://input'), true);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Create new user account
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Check if email address already exists
  $stmt = $conn->prepare("SELECT email FROM users WHERE email = ?");
  $stmt->bind_param("s", $inputs["email"]);
  if (!$stmt->execute()) {
    die("Query failed: " . $stmt->error);
  }

  $result = $stmt->get_result();
  $existing_user = $result->fetch_assoc();

  if ($existing_user) {
    // If email already exists, return error message
    echo json_encode("ERR: Email address already exists");
  } else {
    // Attempt to insert new user into table
    $query = $conn->prepare("INSERT INTO users (email, pswrd, first_name, last_name) VALUES (?, ?, ?, ?);");
    $query->bind_param("ssss", $inputs["email"], $inputs["password"], $inputs["fname"], $inputs["lname"]);

    if (!$query->execute()) {
      // If insertion fails, return error message
      echo json_encode("ERR: Insertion failed to execute");
    } else {
      // Check that the new user now exists and return email
      $stmt = $conn->prepare("SELECT email FROM users WHERE email = ?");
      $stmt->bind_param("s", $inputs["email"]);

      if (!$stmt->execute()) {
        die("Query failed: " . $stmt->error);
      }

      $result = $stmt->get_result();
      $users = [];

      while ($row = $result->fetch_assoc()) {
        $users[] = $row;
      }

      echo json_encode($users);
    }
  }
}

mysqli_close($conn);
