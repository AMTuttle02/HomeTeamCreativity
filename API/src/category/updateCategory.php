<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

include '../admin/conn.php';

if (session_status() !== PHP_SESSION_ACTIVE) {
  session_start();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_SESSION['admin']) && $_SESSION['admin']) {
  $id = isset($_POST['id']) ? intval($_POST['id']) : 0;
  $cat = isset($_POST['category']) ? trim($_POST['category']) : '';
  $position = isset($_POST['position']) ? intval($_POST['position']) : null;

  if ($id <= 0 || $cat === '') {
    echo json_encode(0);
    mysqli_close($conn);
    exit();
  }

  if ($position === null) {
    $query = $conn->prepare("UPDATE categories SET category = ? WHERE id = ?");
    $query->bind_param("si", $cat, $id);
  } else {
    $query = $conn->prepare("UPDATE categories SET category = ?, position = ? WHERE id = ?");
    $query->bind_param("sii", $cat, $position, $id);
  }

  if (!$query->execute()) {
    echo json_encode(0);
  } else {
    echo json_encode(1);
  }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
  http_response_code(403);
  echo json_encode(array('error' => 'Unauthorized'));
}

mysqli_close($conn);

?>
