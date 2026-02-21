<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

include '../admin/conn.php';

// Create new user account
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // support either JSON body or form-data
  $raw = file_get_contents('php://input');
  $input = json_decode($raw, true);
  $subcategory = '';
  $category = '';
  if (!empty($_POST['subcategory'])) {
    $subcategory = trim($_POST['subcategory']);
  } elseif (is_array($input) && isset($input['subcategory'])) {
    $subcategory = trim($input['subcategory']);
  }
  if (!empty($_POST['category'])) {
    $category = trim($_POST['category']);
  } elseif (is_array($input) && isset($input['category'])) {
    $category = trim($input['category']);
  }

  $query = $conn->prepare(
                        "INSERT INTO subcategories (name, category)
                        VALUES (?, ?)");
  $query->bind_param(
                    "ss",
                    $subcategory,
                    $category);

  if (!$query->execute()) {
    echo json_encode(0);
  }
  else {
    echo json_encode(1);
  }
}

mysqli_close($conn);

?>