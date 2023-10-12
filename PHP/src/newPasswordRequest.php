<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

require 'vendor/autoload.php';
require_once 'secrets.php';
use PHPMailer\PHPMailer\PHPMailer;
$mail = new PHPMailer;

if (session_status() === PHP_SESSION_ACTIVE) {
} else {
    session_start();
}

include 'conn.php';

date_default_timezone_set('America/New_York');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $input = json_decode(file_get_contents('php://input'), true);
  $email = $input['email'];

  // Generate a unique token for password reset
  $token = bin2hex(random_bytes(16));
  $reset_link = DOMAIN . '/resetpassword/' . $token;

  $resetTime = date("Y-m-d H:i:s");

  // Check if email address exists
  $stmt = $conn->prepare("SELECT email FROM users WHERE email = ?");
  $stmt->bind_param("s", $email);
  if (!$stmt->execute()) {
    die("Query failed: " . $stmt->error);
    exit(1);
  }

  $result = $stmt->get_result();
  $existing_user = $result->fetch_assoc();

  if (!$existing_user) {
    die(json_encode(0));
  }

  // Check if email address already exists in table
  $stmt = $conn->prepare("SELECT email FROM resetTokens WHERE email = ?");
  $stmt->bind_param("s", $email);
  if (!$stmt->execute()) {
    die("Query failed: " . $stmt->error);
    exit(1);
  }

  $result = $stmt->get_result();
  $existing_user = $result->fetch_assoc();

  if ($existing_user) {
    // If email already exists, return error message
    $query = $conn->prepare("UPDATE resetTokens SET token = ?, resetTime = ? WHERE email = ?;");
    $query->bind_param("sss", $token, $resetTime, $email);

    if (!$query->execute()) {
      // If insertion fails, return error message
      echo json_encode("ERR: Insertion failed to execute" . $query->error);
      exit(1);
    }
  }
  else {
    // Attempt to insert new user into table
    $query = $conn->prepare("INSERT INTO resetTokens (email, token, resetTime) VALUES (?, ?, ?);");
    $query->bind_param("sss", $email, $token, $resetTime);

    if (!$query->execute()) {
      // If insertion fails, return error message
      echo json_encode("ERR: Insertion failed to execute" . $query->error);
      exit(1);
    }
  }

  // Email body
  $message = '
  <html>
  <head>
    <title>Password Reset</title>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .button {
        background-color: #FF6B6B;
        color: white;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <p>Hello,</p>
      <p>You have requested a password reset. Click the link below to reset your password:</p>
      <p><a class="button" style="background-color: #FF6B6B; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px;" href="' . $reset_link . '">Reset Password</a></p>
      <p>NOTE: The link will expire in 15 minutes from receiving this email.</p>
      <p>If you did not request this password reset, please ignore this email.</p>
    </div>
  </body>
  </html>
  ';


  $mail->isSMTP();
  $mail->SMTPDebug = 0;
  $mail->Host = 'smtp.titan.email';
  $mail->Port = 587;
  $mail->SMTPAuth = true;
  $mail->Username = FORGOT_EMAIL_USERNAME;
  $mail->Password = FORGOT_EMAIL_PASSWORD;
  $mail->setFrom('passwordreset@hometeamcreativity.com', 'HomeTeam Creativity Password Reset');
  $mail->addReplyTo('admin@hometeamcreativity.com', 'HomeTeam Creativity Admin');
  $mail->addAddress($email);
  $mail->Subject = 'HomeTeam Creativity Password Reset';
  //$mail->msgHTML(file_get_contents('message.html'), __DIR__);
  $mail->isHTML(true);
  $mail->Body = $message;
  if (!$mail->send()) {
      echo json_encode('Mailer Error: ' . $mail->ErrorInfo);
  }
  else {
    echo json_encode(1);
  }
}
?>