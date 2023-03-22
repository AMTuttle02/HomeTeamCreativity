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

session_start();

include 'conn.php';

// Create new user account
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $inputs = json_decode(file_get_contents('php://input'), true);
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
  }
  else {
    // Attempt to insert new user into table
    $query = $conn->prepare("INSERT INTO users (email, pswrd, first_name, last_name) VALUES (?, ?, ?, ?);");
    $query->bind_param("ssss", $inputs["email"], $inputs["password"], $inputs["fname"], $inputs["lname"]);

    if (!$query->execute()) {
      // If insertion fails, return error message
      echo json_encode("ERR: Insertion failed to execute" . $query->error);
    }
    else {
      // Check that the new user now exists and return first_name
      $stmt = $conn->prepare("SELECT first_name FROM users WHERE email = ?");
      $stmt->bind_param("s", $inputs["email"]);

      if (!$stmt->execute()) {
        die(json_encode("Query failed: " . $stmt->error));
      }
    
      $result = $stmt->get_result();
    
      if (!$result) {
        die(json_encode("Result set failed: " . $conn->error));
      }
    
      if ($result->num_rows > 0) {
        // Set the session variables
        $row = $result->fetch_assoc();
        $_SESSION['loggedin'] = true;
        $_SESSION['email'] = $inputs["email"];
        $_SESSION['first_name'] = $row['first_name'];
    
        echo(json_encode($_SESSION));
      } else {
        // If the email and password do not match, display an error message
        echo(json_encode("Invalid email or password."));
      } 
    }
  }
}

mysqli_close($conn);

?>