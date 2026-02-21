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

  // use provided position or fall back to MAX(position)+1; positions must be >= 1
  $pos = null;
  if (isset($_POST['position']) && $_POST['position'] !== '') {
    $pos = intval($_POST['position']);
  } elseif (is_array($input) && isset($input['position'])) {
    $pos = intval($input['position']);
  }
  if ($pos === null || $pos <= 0) {
    $res = mysqli_query($conn, "SELECT MAX(position) AS maxpos FROM categories");
    $pos = 1;
    if ($res) {
      $row = mysqli_fetch_assoc($res);
      if ($row && isset($row['maxpos'])) {
        $pos = intval($row['maxpos']) + 1;
      }
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
