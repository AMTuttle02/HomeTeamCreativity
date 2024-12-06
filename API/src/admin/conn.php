<?php
require_once '../secrets.php';

if (session_status() === PHP_SESSION_ACTIVE) {
} else {
    session_start();
}

$servername = SERVER;
$user = MYSQL_USER;
$pass = MYSQL_PASSWORD;
$dbname = MYSQL_DATABASE;
$conn = mysqli_connect($servername, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>
