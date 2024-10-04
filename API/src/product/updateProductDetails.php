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
  $categories = $_POST["subcategories"];
  $defaultStyle = $_POST["default_style"];
  $styleLocation = $_POST["default_style_location"];
  $customDetailsRequired = $_POST["customFieldRequired"];
  $product_id = $_SESSION["product_id"];
  $sizeAvailable = $_POST["sizeAvailable"];

  // Attempt to insert new design into table
  $query = $conn->prepare("UPDATE products 
                          SET product_name = ?, price = ?, tag_list = ?, tColors = ?, lColors = ?, cColors = ?, hColors = ?, categories = ?, default_style = ?, default_style_location = ?, CustomDetailsRequired = ?, sizesAvailable = ?
                          WHERE product_id = ?;");
  $query->bind_param("sssssssssssss", $productName, $price, $tags, $tColors, $lColors, $cColors, $hColors, $categories, $defaultStyle, $styleLocation, $customDetailsRequired, $sizeAvailable, $product_id);
  if (!$query->execute()) {
    // If insertion fails, return error message
    echo json_encode("ERR: Insertion failed to execute" . $query->error);
  }
  else {
    echo json_encode(1);
  }
}

?>
