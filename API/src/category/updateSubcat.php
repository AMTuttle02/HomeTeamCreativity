<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

include '../admin/conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SESSION['admin']) {
  // accept form-data or json
  $raw = file_get_contents('php://input');
  $input = json_decode($raw, true);
  $id = 0;
  $name = '';
  $category = '';
  if (!empty($_POST['id'])) {
    $id = intval($_POST['id']);
  } elseif (is_array($input) && isset($input['id'])) {
    $id = intval($input['id']);
  }
  if (!empty($_POST['name'])) {
    $name = trim($_POST['name']);
  } elseif (is_array($input) && isset($input['name'])) {
    $name = trim($input['name']);
  }
  if (!empty($_POST['category'])) {
    $category = trim($_POST['category']);
  } elseif (is_array($input) && isset($input['category'])) {
    $category = trim($input['category']);
  }

  if ($id <= 0 || $name === '') {
    echo json_encode(0);
    mysqli_close($conn);
    exit();
  }

  $query = $conn->prepare("UPDATE subcategories SET name = ?, category = ? WHERE id = ?");
  $query->bind_param("ssi", $name, $category, $id);
  if (!$query->execute()) {
    echo json_encode(0);
  } else {
    echo json_encode(1);
  }
}

mysqli_close($conn);

?>
