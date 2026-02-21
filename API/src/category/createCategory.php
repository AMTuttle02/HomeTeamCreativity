<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

include '../admin/conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // support either JSON body or form-data
  $raw = file_get_contents('php://input');
  $input = json_decode($raw, true);
  $cat = '';
  if (!empty($_POST['category'])) {
    $cat = trim($_POST['category']);
  } elseif (is_array($input) && isset($input['category'])) {
    $cat = trim($input['category']);
  }
  if ($cat === '') {
    echo json_encode(0);
    mysqli_close($conn);
    exit();
  }

  // determine next position
  $res = mysqli_query($conn, "SELECT MAX(position) AS maxpos FROM categories");
  $pos = 1;
  if ($res) {
    $row = mysqli_fetch_assoc($res);
    if ($row && isset($row['maxpos'])) {
      $pos = intval($row['maxpos']) + 1;
    }
  }

  $query = $conn->prepare(
                        "INSERT INTO categories (category, position)
                        VALUES (?, ?)");
  $query->bind_param(
                    "si",
                    $cat,
                    $pos);

  if (!$query->execute()) {
    echo json_encode(0);
  }
  else {
    echo json_encode(1);
  }
}

mysqli_close($conn);

?>
