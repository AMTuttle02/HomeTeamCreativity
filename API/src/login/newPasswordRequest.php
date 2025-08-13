<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');
include '../admin/conn.php';
require '../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
$mail = new PHPMailer;

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
    die(json_encode("Query failed: " . $stmt->error));
  }

  $result = $stmt->get_result();
  $existing_user = $result->fetch_assoc();

  if (!$existing_user) {
    die(json_encode(404));
  }

  // Check if email address already exists in table
  $stmt = $conn->prepare("SELECT email FROM resetTokens WHERE email = ?");
  $stmt->bind_param("s", $email);
  if (!$stmt->execute()) {
    die(json_encode("Query failed: " . $stmt->error));
  }

  $result = $stmt->get_result();
  $existing_user = $result->fetch_assoc();

  if ($existing_user) {
    // email already has a token, update the token and reset time
    $query = $conn->prepare("UPDATE resetTokens SET token = ?, resetTime = ? WHERE email = ?;");
    $query->bind_param("sss", $token, $resetTime, $email);

    if (!$query->execute()) {
      // If insertion fails, return error message
      die(json_encode("ERR: Insertion failed to execute" . $query->error));
    }
  }
  else {
    // Attempt to insert new user into table
    $query = $conn->prepare("INSERT INTO resetTokens (email, token, resetTime) VALUES (?, ?, ?);");
    $query->bind_param("sss", $email, $token, $resetTime);

    if (!$query->execute()) {
      // If insertion fails, return error message
      die(json_encode("ERR: Insertion failed to execute" . $query->error));
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
  $mail->Username = ERROR_EMAIL_USERNAME;
  $mail->Password = ERROR_EMAIL_PASSWORD;
  $mail->setFrom('it@hometeamcreativity.com', 'HomeTeam Creativity Password Reset');
  $mail->addReplyTo('admin@hometeamcreativity.com', 'HomeTeam Creativity Admin');
  $mail->addAddress($email);
  $mail->addBCC('admin@hometeamcreativity.com', 'HomeTeam Creativity Admin');
  $mail->Subject = 'HomeTeam Creativity Password Reset';
  $mail->isHTML(true);
  $mail->Body = $message;
  $mail->SMTPOptions = array( 
    'ssl' => array( 
    'verify_peer' => false, 
    'verify_peer_name' => false, 
    'allow_self_signed' => true 
    ) 
    );
  if (!$mail->send()) {
      die(json_encode('Mailer Error: ' . $mail->ErrorInfo));
  }
  else {
    exit(json_encode(1));
  }
}
?>