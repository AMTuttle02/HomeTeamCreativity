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

  $query = $conn->prepare("INSERT INTO navbar (name, link, position)
  VALUES (?, ?, ?);");
  $query->bind_param("sss" 
                      , $tagName
                      , $link
                      , $position);
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
