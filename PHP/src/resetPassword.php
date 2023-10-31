<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

session_start();

include 'conn.php';

date_default_timezone_set('America/New_York');

// Create new user account
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $inputs = json_decode(file_get_contents('php://input'), true);
  $cryptid = $inputs["password"];

  $query = $conn->prepare("SELECT * FROM resetTokens WHERE email = ? AND token = ?;");
  $query->bind_param("ss" , $inputs["email"], $inputs["token"]);

  if (!$query->execute()) {
    // If insertion fails, return error message
    die(json_encode("ERR: Insertion failed to execute" . $query->error));
  }

  $result = $query->get_result();
  $row = $result->fetch_assoc();
  if ($result->num_rows > 0) {
    $dbTime = strtotime($row["resetTime"]); // Convert the database date string to a timestamp
    $currentTime = strtotime(date("Y-m-d H:i:s")); // Convert the current date string to a timestamp

    // Calculate the time difference
    $timeDifference = $currentTime - $dbTime;

    // Check if the time difference is greater than 20 minutes (1200 seconds)
    if ($timeDifference > 1200) {
      die(json_encode(0 . " and " . $dbTime . " and " . $currentTime . " and " . $timeDifference));
    }
    if ($row["email"] != $inputs["email"]) {
      die(json_encode(0));
    }
    if ($row["token"] != $inputs["token"]) {
      die(json_encode(0));
    }
  }
  else {
    die(json_encode(0));
  }

  // Attempt to insert new password into table
  $query = $conn->prepare("UPDATE users SET pswrd = ? WHERE email = ?;");
  $query->bind_param("ss", $cryptid, $inputs["email"]);

  if (!$query->execute()) {
    // If insertion fails, return error message
    die(json_encode("ERR: Insertion failed to execute" . $query->error));
  }

  // Attempt to insert new password into table
  $query = $conn->prepare("DELETE FROM resetTokens WHERE email = ?;");
  $query->bind_param("s", $inputs["email"]);

  if (!$query->execute()) {
    // If insertion fails, return error message
    die(json_encode("ERR: Deletion failed to execute" . $query->error));
  }

  $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
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
    $_SESSION['email'] = $row['email'];
    $_SESSION['first_name'] = $row['first_name'];
    $_SESSION['last_name'] = $row['last_name'];
    $_SESSION['admin'] = $row['admin'];
    $_SESSION['userId'] = $row['user_id'];

    echo(1);
  } else {
    // If the email and password do not match, display an error message
    echo(json_encode("Invalid email or password."));
  } 
}

mysqli_close($conn);

?>