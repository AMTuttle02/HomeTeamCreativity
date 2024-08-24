<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST');
  header("Access-Control-Allow-Headers: X-Requested-With");

  include 'conn.php';

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputs = json_decode(file_get_contents('php://input'), true);
    
    $searchQuery = $inputs['searchContents'];

    // Split the search query into tags
    $tags = explode(" ", $searchQuery);

    // Construct the SQL query to select products that include any of the tags
    $sql = "SELECT * FROM products WHERE";
    $placeholders = [];
    foreach ($tags as $tag) {
      $sql .= " tag_list LIKE '%".$conn->real_escape_string($tag)."%' OR";
    }
    // Remove the last "OR" from the query
    $sql = substr($sql, 0, -2);

    // Execute the query and fetch the results
    $results = mysqli_query($conn, $sql);
    if (!$results) {
      die("Query failed: ".mysqli_error($conn));
    }
    $products = [];
    while ($row = mysqli_fetch_assoc($results)) {
      $products[] = $row;
    }
    echo json_encode($products);
  }

  mysqli_close($conn);

?>
