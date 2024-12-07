<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

include '../admin/conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $page = $_POST["page"];
  $location = $_POST["location"];

  $query = $conn->prepare("SELECT * FROM staticText WHERE page = ? AND location = ?;");
  $query->bind_param("ss" 
                      , $page
                      , $location);
  if (!$query->execute()) {
    throw(json_encode("ERR: Get static text failed with page " . $page 
                    . ", location: " . $location
                    . ". " . $query->error
                  ));
  }

  $result = $query->get_result();
  $row = $result->fetch_assoc();

  echo json_encode($row["text"]);
}

?>