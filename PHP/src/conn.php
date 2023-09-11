<?php
require 'secrets.php';

$servername = SERVER;
$user = MYSQL_USER;
$pass = MYSQL_PASSWORD;
$dbname = MYSQL_DATABASE;
$conn = mysqli_connect($servername, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>
