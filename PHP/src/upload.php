<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');

session_start();

include 'conn.php';
require_once 'secrets.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $productName = $_POST["productName"];
  $price = $_POST["price"];
  $tags = $_POST["tags"];
  $tColors = $_POST["tColors"];
  $lColors = $_POST["lColors"];
  $cColors = $_POST["cColors"];
  $hColors = $_POST["hColors"];
  $categories = $_POST["subcategories"];
  $defaultStyle = $_POST["default_style"];
  $styleLocation = $_POST["style_location"];
  $targetDir = UPLOAD_DIR;
  $uploadedFiles = [];
  $errorMessages = [];
  $fileName = "";

  foreach ($_FILES['images']['tmp_name'] as $key => $tmp_name) {
    $uploadFile = $targetDir . basename($_FILES['images']['name'][$key]);
    $fileName .= basename($_FILES['images']['name'][$key]) . ";";

    if (move_uploaded_file($tmp_name, $uploadFile)) {
      $uploadedFiles[] = $uploadFile;
    } else {
      $errorMessages[] = "Failed to upload {$_FILES['images']['name'][$key]}";
    }
  }

  if (!empty($errorMessages)) {
    echo json_encode(['error' => $errorMessages]);
  } else {
      echo json_encode(['success' => 'Files uploaded successfully', 'files' => $uploadedFiles]);
      // Attempt to insert new design into table
    $query = $conn->prepare("INSERT INTO products (product_name, price, filename, tag_list, tColors, lColors, cColors, hColors, categories, default_style, style_locations)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);");
    $query->bind_param("sssssssssss", $productName, $price, $fileName, $tags, $tColors, $lColors, $cColors, $hColors, $categories, $defaultStyle, $styleLocation);
    if (!$query->execute()) {
    // If insertion fails, return error message
    echo json_encode("ERR: Insertion failed to execute" . $query->error);
    }
    $_SESSION['recentDesign'] = $fileName;
  }
}

?>
