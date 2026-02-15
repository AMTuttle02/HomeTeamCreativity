<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');

session_start();

include '../admin/conn.php';
require_once '../secrets.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $productName = $_POST["productName"];
  $price = $_POST["price"];
  $tags = $_POST["tags"];
  $tColors = $_POST["tColors"];
  $lColors = $_POST["lColors"];
  $cColors = $_POST["cColors"];
  $hColors = $_POST["hColors"];
  // Accept either new 'categories' (ids) and 'subcategories' (ids),
  // or legacy 'subcategories' (names). Prefer explicit 'categories' and 'subcategories'.
  $categories = isset($_POST['categories']) ? $_POST['categories'] : (isset($_POST['subcategories']) ? $_POST['subcategories'] : '');
  $subcategories = isset($_POST['subcategories']) && isset($_POST['categories']) ? $_POST['subcategories'] : '';
  $defaultStyle = $_POST["default_style"];
  $styleSize = isset($_POST['style_size']) ? $_POST['style_size'] : '';
  if (empty($styleSize)) {
    die(json_encode("ERR: style_size required"));
  }
  $styleLocation = $_POST["style_location"];
  $customFieldRequired = $_POST['customFieldRequired'];
  $sizeAvailable = $_POST['sizeAvailable'];
  $targetDir = UPLOAD_DIR;
  $frontFile = NULL;
  $frontTargetFile = NULL;
  $frontFileName = NULL;
  $backFile = NULL;
  $backTargetFile = NULL;
  $backFileName = NULL;

  if (isset($_FILES['frontFile'])) {
    $frontFile = $_FILES['frontFile'];
    $frontTargetFile = $targetDir . basename($frontFile["name"]);
    $frontFileName = basename($frontFile["name"]);
    if (!move_uploaded_file($frontFile['tmp_name'], $frontTargetFile)) {
      die(json_encode("ERR: Cannot upload $frontFileName"));
    }
  }

  if (isset($_FILES['backFile'])) {
    $backFile = $_FILES['backFile'];
    $backTargetFile = $targetDir . basename($backFile["name"]);
    $backFileName = basename($backFile["name"]);
    if (!move_uploaded_file($backFile['tmp_name'], $backTargetFile)) {
      die(json_encode("ERR: Cannot upload $backFileName"));
    }
  }

  // Attempt to insert new design into table
  $query = $conn->prepare("INSERT INTO products (product_name, price, filename_front, filename_back, tag_list, tColors, lColors, cColors, hColors, categories, subcategories, default_style, style_size, default_style_location, CustomDetailsRequired, sizesAvailable)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);");
  $query->bind_param("ssssssssssssssss", $productName, $price, $frontFileName, $backFileName, $tags, $tColors, $lColors, $cColors, $hColors, $categories, $subcategories, $defaultStyle, $styleSize, $styleLocation, $customFieldRequired, $sizeAvailable);
  if (!$query->execute()) {
    // If insertion fails, return error message
    die(json_encode("ERR: Insertion failed to execute" . $query->error));
  }

  if ($styleLocation === 'front') {
    $_SESSION['recentDesign'] = $frontFileName;
    $_SESSION['recentDesignLocation'] = 'filename_front';
  }
  else if ($styleLocation === 'back') {
    $_SESSION['recentDesign'] = $backFileName;
    $_SESSION['recentDesignLocation'] = 'filename_back';
  }
}

?>
