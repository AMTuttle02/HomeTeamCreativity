<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');

session_start();

include '../admin/conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $id = isset($_POST['id']) ? $_POST['id'] : null;
  $position = isset($_POST['position']) ? $_POST['position'] : null;

  if ($id === null || $position === null) {
    echo json_encode(0);
    exit();
  }

  $query = $conn->prepare("UPDATE categories SET position = ? WHERE id = ?");
  $query->bind_param("ii", $position, $id);

  if (!$query->execute()) {
    die(json_encode("ERR: Category position update failed: " . $query->error));
  }

  echo json_encode(1);
}

?>
