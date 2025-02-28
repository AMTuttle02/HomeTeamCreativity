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
  $error = $_POST['error'];
  $file = $_POST['file'];

  $errorHtml = "<!DOCTYPE html>
                    <html>
                    <head>
                        <title>Error Log</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                font-size: 14px;
                            }
                            table {
                                border-collapse: collapse;
                                width: 100%;
                            }
                            th, td {
                                border: 1px solid #ddd;
                                padding: 8px;
                                text-align: left;
                            }
                            th {
                                background-color: #f2f2f2;
                            }
                        </style>
                    </head>
                    <body>
                        <h2>Error Log</h2>
                        <table>
                            <tr>
                                <th>Timestamp</th>
                                <th>File</th>
                                <th>Error Message</th>
                            </tr>
                            <tr>
                                <td>" . date("Y-m-d H:i:s") . "</td>
                                <td>" . $file . "</td>
                                <td>" . $error . "</td>
                            </tr>
                            </table>
                    </body>
                    </html>"
  ;

  $mail->isSMTP();
  $mail->SMTPDebug = 0;
  $mail->Host = 'smtp.titan.email';
  $mail->Port = 587;
  $mail->SMTPAuth = true;
  $mail->Username = ERROR_EMAIL_USERNAME;
  $mail->Password = ERROR_EMAIL_PASSWORD;
  $mail->setFrom('it@hometeamcreativity.com', 'HomeTeam Creativity IT');
  $mail->addReplyTo('it@hometeamcreativity.com', 'HomeTeam Creativity IT');
  $mail->addAddress('alexmtuttle@gmail.com', 'Alex Tuttle');
  $mail->addBCC('it@hometeamcreativity.com', 'HomeTeam Creativity IT');
  $mail->Subject = 'Error Log: HomeTeam Creativity';
  $mail->isHTML(true);
  $mail->Body = $errorHtml;
  $mail->SMTPOptions = array( 
    'ssl' => array( 
    'verify_peer' => false, 
    'verify_peer_name' => false, 
    'allow_self_signed' => true 
    ) 
    );
  if (!$mail->send()) {
    echo json_encode('Mailer Error: ' . $mail->ErrorInfo);
  } else {
    echo(json_encode(1));
  }
}
?>