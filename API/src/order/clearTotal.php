<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

session_start();

include '../admin/conn.php';

if (isset($_SESSION["total"])) {
    unset($_SESSION["total"]);
}

if (isset($_SESSION["discount"])) {
  unset($_SESSION["discount"]);
}

header("HTTP/1.1 303 See Other");
header("Location: /cart");
?>