<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: text/plain');

session_start();

include 'conn.php';

if (isset($_SESSION['admin'])) {
    $admin = $_SESSION['admin'];
    echo json_encode(array('admin' => $admin));
}
else {
    echo 0;
}

?>

