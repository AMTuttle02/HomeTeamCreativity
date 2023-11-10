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
  $product_id = $_SESSION["product_id"];

  // Attempt to insert new design into table
  $query = $conn->prepare("UPDATE products 
                          SET product_name = ?, price = ?, tag_list = ?, tColors = ?, lColors = ?, cColors = ?, hColors = ?, categories = ?, default_style = ?
                          WHERE product_id = ?;");
  $query->bind_param("ssssssssss", $productName, $price, $tags, $tColors, $lColors, $cColors, $hColors, $categories, $defaultStyle, $product_id);
  if (!$query->execute()) {
    // If insertion fails, return error message
    echo json_encode("ERR: Insertion failed to execute" . $query->error);
  }
  else {
    echo json_encode(1);
  }
}

?>
