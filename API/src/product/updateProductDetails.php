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
  // Accept new semicolon-separated id lists for categories and subcategories.
  $categories = isset($_POST['categories']) ? $_POST['categories'] : (isset($_POST['subcategories']) ? $_POST['subcategories'] : '');
  $subcategories = isset($_POST['subcategories']) && isset($_POST['categories']) ? $_POST['subcategories'] : '';
  $defaultStyle = $_POST["default_style"];
  $styleSize = isset($_POST['style_size']) ? $_POST['style_size'] : '';
  if (empty($styleSize)) {
    echo json_encode("ERR: style_size required");
    exit();
  }
  $styleLocation = $_POST["default_style_location"];
  $customDetailsRequired = $_POST["customFieldRequired"];
  // prefer explicit product_id from POST, fallback to session
  $product_id = isset($_POST['product_id']) ? intval($_POST['product_id']) : (isset($_SESSION["product_id"]) ? intval($_SESSION["product_id"]) : 0);
  if ($product_id === 0) {
    echo json_encode(array('success' => false, 'error' => 'product_id not provided'));
    exit;
  }
  $sizeAvailable = $_POST["sizeAvailable"];

  // fetch existing filenames
  $fstmt = $conn->prepare("SELECT filename_front, filename_back FROM products WHERE product_id = ? LIMIT 1");
  $fstmt->bind_param("i", $product_id);
  $fstmt->execute();
  $fres = $fstmt->get_result();
  $existingFront = '';
  $existingBack = '';
  if ($fres && $fres->num_rows > 0) {
    $frow = $fres->fetch_assoc();
    $existingFront = $frow['filename_front'];
    $existingBack = $frow['filename_back'];
  }

  $newFront = $existingFront;
  $newBack = $existingBack;

  // handle explicit removal flags (delete current file and clear DB filename)
  if (isset($_POST['remove_front']) && $_POST['remove_front'] == '1') {
    // Prevent deleting the side that is configured as the default style location
    if ($styleLocation === 'front') {
      echo json_encode(array('success' => false, 'error' => 'Cannot delete front design because default style location is front'));
      exit;
    }
    if ($existingFront && $existingFront !== '') {
      $oldPath = UPLOAD_DIR . $existingFront;
      if (file_exists($oldPath)) {@unlink($oldPath);} 
    }
    $newFront = '';
  }

  if (isset($_POST['remove_back']) && $_POST['remove_back'] == '1') {
    // Prevent deleting the side that is configured as the default style location
    if ($styleLocation === 'back') {
      echo json_encode(array('success' => false, 'error' => 'Cannot delete back design because default style location is back'));
      exit;
    }
    if ($existingBack && $existingBack !== '') {
      $oldPath = UPLOAD_DIR . $existingBack;
      if (file_exists($oldPath)) {@unlink($oldPath);} 
    }
    $newBack = '';
  }

  // handle uploaded files if provided
  if (isset($_FILES['frontFile']) && $_FILES['frontFile']['error'] === UPLOAD_ERR_OK) {
    $file = $_FILES['frontFile'];
    $orig = basename($file['name']);
    // check DB for existing use of this filename by other products
    $check = $conn->prepare("SELECT product_id FROM products WHERE (filename_front = ? OR filename_back = ?) AND product_id != ? LIMIT 1");
    $check->bind_param("ssi", $orig, $orig, $product_id);
    $check->execute();
    $cres = $check->get_result();
    if ($cres && $cres->num_rows > 0) {
      echo json_encode(array('success' => false, 'error' => 'Filename "' . $orig . '" is already used by another product'));
      exit;
    }
    $target = UPLOAD_DIR . $orig;
    // delete the old product file first (per requirement)
    if ($existingFront && $existingFront !== '') {
      $oldPath = UPLOAD_DIR . $existingFront;
      if (file_exists($oldPath)) {@unlink($oldPath);} 
    }
    // if a file already exists at the target filename, remove it so we cleanly replace
    if (file_exists($target)) {@unlink($target);} 
    if (!move_uploaded_file($file['tmp_name'], $target)) {
      echo json_encode(array('success' => false, 'error' => 'Cannot upload front file'));
      exit;
    }
    $newFront = $orig;
  }

  if (isset($_FILES['backFile']) && $_FILES['backFile']['error'] === UPLOAD_ERR_OK) {
    $file = $_FILES['backFile'];
    $orig = basename($file['name']);
    // check DB for existing use of this filename by other products
    $check = $conn->prepare("SELECT product_id FROM products WHERE (filename_front = ? OR filename_back = ?) AND product_id != ? LIMIT 1");
    $check->bind_param("ssi", $orig, $orig, $product_id);
    $check->execute();
    $cres = $check->get_result();
    if ($cres && $cres->num_rows > 0) {
      echo json_encode(array('success' => false, 'error' => 'Filename "' . $orig . '" is already used by another product'));
      exit;
    }
    $target = UPLOAD_DIR . $orig;
    // delete the old product file first (per requirement)
    if ($existingBack && $existingBack !== '') {
      $oldPath = UPLOAD_DIR . $existingBack;
      if (file_exists($oldPath)) {@unlink($oldPath);} 
    }
    // if a file already exists at the target filename, remove it so we cleanly replace
    if (file_exists($target)) {@unlink($target);} 
    if (!move_uploaded_file($file['tmp_name'], $target)) {
      echo json_encode(array('success' => false, 'error' => 'Cannot upload back file'));
      exit;
    }
    $newBack = $orig;
  }

  // Update product including possible new filenames
  $query = $conn->prepare("UPDATE products 
                          SET product_name = ?, price = ?, tag_list = ?, tColors = ?, lColors = ?, cColors = ?, hColors = ?, categories = ?, subcategories = ?, default_style = ?, style_size=?, default_style_location = ?, CustomDetailsRequired = ?, sizesAvailable = ?, filename_front = ?, filename_back = ?
                          WHERE product_id = ?;");
  $query->bind_param("ssssssssssssssssi", $productName, $price, $tags, $tColors, $lColors, $cColors, $hColors, $categories, $subcategories, $defaultStyle, $styleSize, $styleLocation, $customDetailsRequired, $sizeAvailable, $newFront, $newBack, $product_id);
  if (!$query->execute()) {
    // If insertion fails, return error message
    echo json_encode(array('success' => false, 'error' => 'DB update failed: ' . $query->error));
  }
  else {
    echo json_encode(array('success' => true));
  }
}

?>
