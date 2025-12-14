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
    $text = $_POST["text"];
    // Update the text for the given page and location
    $update = $conn->prepare("UPDATE staticText SET text = ? WHERE page = ? AND location = ?;");
    if ($update === false) {
      throw(new Exception("Prepare failed: " . $conn->error));
    }
    $update->bind_param("sss", $text, $page, $location);
    $ok = $update->execute();
    if ($ok === false) {
      throw(new Exception("Execute failed: " . $update->error));
    }

    // If no rows were updated, optionally insert a new row
    if ($update->affected_rows === 0) {
      // check if a row exists; if not, insert
      $check = $conn->prepare("SELECT id FROM staticText WHERE page = ? AND location = ?;");
      $check->bind_param("ss", $page, $location);
      $check->execute();
      $res = $check->get_result();
      if ($res->num_rows === 0) {
        $insert = $conn->prepare("INSERT INTO staticText (page, location, text) VALUES (?, ?, ?);");
        if ($insert === false) {
          throw(new Exception("Prepare insert failed: " . $conn->error));
        }
        $insert->bind_param("sss", $page, $location, $text);
        $insOk = $insert->execute();
        if ($insOk === false) {
          throw(new Exception("Insert failed: " . $insert->error));
        }
        echo json_encode(1);
        exit;
      }
    }

    echo json_encode(1);
  } catch (Exception $e) {
    http_response_code(500);
    echo json_encode("ERR: Update static text failed with page " . $page 
                      . ", location: " . $location
                      . ". " . $e->getMessage()
                    );
  }
}

?>