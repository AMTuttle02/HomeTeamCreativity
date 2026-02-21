<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

include '../admin/conn.php';

if (session_status() === PHP_SESSION_ACTIVE) {
} else {
    session_start();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_SESSION['admin'])) {
  $input = json_decode(file_get_contents('php://input'), true);
  $id = 0;
  $cat = '';
  if (!empty($_POST['id'])) {
    $id = intval($_POST['id']);
  } elseif (is_array($input) && isset($input['id'])) {
    $id = intval($input['id']);
  }
  if (!empty($_POST['category'])) {
    $cat = trim($_POST['category']);
  } elseif (is_array($input) && isset($input['category'])) {
    $cat = trim($input['category']);
  }

  if ($id > 0) {
    $query = $conn->prepare("DELETE FROM categories WHERE id = ?");
    $query->bind_param("i", $id);
  } elseif ($cat !== '') {
    $query = $conn->prepare("DELETE FROM categories WHERE category = ?");
    $query->bind_param("s", $cat);
  } else {
    echo json_encode(0);
    mysqli_close($conn);
    exit();
  }

  if (!$query->execute()) {
    echo json_encode(0);
  }
  else {
    echo json_encode(1);
  }
}

mysqli_close($conn);

?>
