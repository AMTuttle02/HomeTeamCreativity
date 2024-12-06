<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');

session_start();

include '../admin/conn.php';
require_once '../secrets.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $tagName = $_POST["tagName"];
  $link = $_POST["link"];
  $position = $_POST["position"];
  $id = $_POST["id"];

  $query = $conn->prepare("UPDATE navbar
                           SET name = ?, link = ?, position = ?
                           WHERE id = ?");
  $query->bind_param("ssss" 
                      , $tagName
                      , $link
                      , $position
                      , $id
                    );
  if (!$query->execute()) {
    die(json_encode("ERR: Navbar Link update failed with tagName: " . $tagName 
                    . ", link: " . $link 
                    . ", position: " . $position 
                    . ", id: " . $id 
                    . ". " . $query->error
                  ));
  }

  echo(json_encode(1));
}

?>
