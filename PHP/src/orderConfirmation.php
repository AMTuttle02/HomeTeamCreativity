<?php
   require 'vendor/autoload.php';
   use PHPMailer\PHPMailer\PHPMailer;
   $mail = new PHPMailer;
   $mail->isSMTP();
   $mail->SMTPDebug = 2;
   $mail->Host = 'smtp.titan.email';
   $mail->Port = 587;
   $mail->SMTPAuth = true;
   $mail->Username = 'orderconfirmation@hometeamcreativity.com';
   $mail->Password = 'ConfirmationOfOrder1!';
   $mail->setFrom('orderconfirmation@hometeamcreativity.com', 'HomeTeam Creativity Order Confirmation');
   $mail->addReplyTo('IT@hometeamcreativity.com', 'HomeTeam Creativity IT');
   $mail->addAddress('alexmtuttle@gmail.com', 'Alex Tuttle');
   $mail->Subject = 'WooWoo, Auto Emails!';
   $mail->msgHTML(file_get_contents('message.html'), __DIR__);
   $mail->Body = 'test!';
   //$mail->addAttachment('attachment.txt');
   if (!$mail->send()) {
       echo 'Mailer Error: ' . $mail->ErrorInfo;
   } else {
       echo 'The email message was sent.';
   }
?>