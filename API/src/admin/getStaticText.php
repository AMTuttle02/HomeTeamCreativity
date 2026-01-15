<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

include '../admin/conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  try {
    $page = $_POST["page"];
    $location = $_POST["location"];

    $query = $conn->prepare("SELECT * FROM staticText WHERE page = ? AND location = ?;");
    $query->bind_param("ss" 
                        , $page
                        , $location);
    $query->execute();
    $result = $query->get_result();
    $row = $result->fetch_assoc();

    if ($row && array_key_exists("text", $row)) {
      echo json_encode($row["text"]);
    } else {
      // No row found for given page/location — return null JSON without raising a PHP warning
      echo json_encode(null);
    }
  } catch (Exception $e) {
    throw(json_encode("ERR: Get static text failed with page " . $page 
                      . ", location: " . $location
                      . ". " . $e
                    ));
  }
}

?>