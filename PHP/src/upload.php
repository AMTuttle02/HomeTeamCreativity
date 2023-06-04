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
  $file = $_FILES['image'];
  $targetDir = UPLOAD_DIR;
  $targetFile = $targetDir . basename($file["name"]);
  $fileName = basename($file["name"]);
  $uploadOk = 1;
  $imageFileType = strtolower(pathinfo($targetFile,PATHINFO_EXTENSION));
  
  // Check if image file is a actual image or fake image
  if(isset($_POST["submit"])) {
    $check = getimagesize($file["tmp_name"]);
    if($check !== false) {
      $uploadOk = 1;
    } else {
      echo json_encode("File is not an image.");
      $uploadOk = 0;
    }
  }
  
  // Check if file already exists
  if (file_exists($targetFile)) {
    echo json_encode("Sorry, file already exists.");
    $uploadOk = 0;
  }
  
  // Check file size
  if ($file["size"] > 500000) {
    echo json_encode("Sorry, your file is too large.");
    $uploadOk = 0;
  }
  
  // Allow certain file formats
  if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
  && $imageFileType != "gif" ) {
    echo json_encode("Sorry, only JPG, JPEG, PNG & GIF files are allowed.");
    $uploadOk = 0;
  }
  
  // Check if $uploadOk is set to 0 by an error
  if ($uploadOk == 0) {
    echo json_encode("Sorry, your file was not uploaded.");
  // if everything is ok, try to upload file
  } else {
    if (move_uploaded_file($file["tmp_name"], $targetFile)) {
      echo json_encode("The file has been uploaded with name " . $productName . " and price $" . $price . "with filename: " . $fileName);
      // Attempt to insert new design into table
      $query = $conn->prepare("INSERT INTO products (product_name, price, filename, tag_list, tColors, lColors, cColors, hColors) VALUES (?, ?, ?, ?, ?, ?, ?, ?);");
      $query->bind_param("ssssssss", $productName, $price, $fileName, $tags, $tColors, $lColors, $cColors, $hColors);
      if (!$query->execute()) {
        // If insertion fails, return error message
        echo json_encode("ERR: Insertion failed to execute" . $query->error);
      }
      $_SESSION['recentDesign'] = $fileName;
    } else {
      echo json_encode("Sorry, there was an error uploading your file from " . $file["tmp_name"] . " to " . $targetFile);
    }
  }
}

?>
