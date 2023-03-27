<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: text/plain');

session_start();

include 'conn.php';

$admin = $_SESSION['admin'];

echo json_encode(array('admin' => $admin));

?>

