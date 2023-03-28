<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: text/plain');

session_start();

include 'conn.php';

$admin = $_SESSION['admin'];

if ($admin) {
    echo json_encode(array('admin' => $admin));
}
else {
    echo 0;
}

?>

