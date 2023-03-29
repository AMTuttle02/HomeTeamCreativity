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

include 'conn.php';

// Get user logging in
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $inputs = json_decode(file_get_contents('php://input'), true);
  $email = $inputs['email'];
  $cryptid = $inputs["password"];

  // Encrypt the input password
  // Encryption must always match the encryption used in signup.php
  if (CRYPT_STD_DES == 1) {
    $cryptid = crypt($inputs["password"], "HT");
  }

  $stmt = $conn->prepare("SELECT * FROM users WHERE email = ? AND pswrd = ?");
  $stmt->bind_param("ss", $email, $cryptid);

  if (!$stmt->execute()) {
    die("Query failed: " . $stmt->error);
  }

  $result = $stmt->get_result();

  if (!$result) {
    die("Result set failed: " . $conn->error);
  }

  if ($result->num_rows > 0) {
    // Set the session variables
    $row = $result->fetch_assoc();
    $_SESSION['loggedin'] = true;
    $_SESSION['email'] = $email;
    $_SESSION['first_name'] = $row['first_name'];
    $_SESSION['admin'] = $row['admin'];

    echo(json_encode($_SESSION));
  } else {
    // If the email and password do not match, display an error message
    echo(json_encode("Invalid email or password."));
  } 
}

$conn->close();
?>