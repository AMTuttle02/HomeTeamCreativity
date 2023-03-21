<?php
$servername = "db";
$user = $_ENV['MYSQL_USER'];
$pass = $_ENV['MYSQL_PASSWORD'];
$dbname = $_ENV['MYSQL_DATABASE'];
$conn = mysqli_connect($servername, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>
