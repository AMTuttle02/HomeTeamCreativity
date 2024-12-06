<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');

session_start();

include '../admin/conn.php';
require_once '../secrets.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $id = $_POST["id"];

  $query = $conn->prepare("DELETE FROM navbar
                           WHERE id = ?");
  $query->bind_param("s"
                      , $id
                    );
  if (!$query->execute()) {
    die(json_encode("ERR: Navbar Link update failed with id: " . $id 
                    . ". " . $query->error
                  ));
  }

  echo(json_encode(1));
}

?>
