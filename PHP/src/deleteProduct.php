<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

include 'conn.php';
require_once 'secrets.php';

if (session_status() === PHP_SESSION_ACTIVE) {
} else {
    session_start();
}

// Create new user account
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SESSION['admin']) {
    $input = json_decode(file_get_contents('php://input'), true);

    $file_path_front = UPLOAD_DIR;
    $file_path_back = UPLOAD_DIR;

    $query = $conn->prepare(
                        "SELECT * FROM products WHERE product_id = ?");
    $query->bind_param(
                    "i",
                    $input['id']);

    if (!$query->execute()) {
        echo json_encode('Top Failed');
    }
    else {
        $result = $query->get_result();

        if (!$result) {
            die("Result set failed: " . $conn->error);
        }

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if ($row['filename_front']) {
                $file_path_front .= $row['filename_front'];
            }
            if ($row['filename_back']) {
                $file_path_back .= $row['filename_back'];
            }
        }

        if ($file_path_front != UPLOAD_DIR) {
            if (!unlink($file_path_front)) {
                die(json_encode('Unable to delete the front file.' . $file_path_front));
            }
        }
        if ($file_path_back != UPLOAD_DIR) {
            if (!unlink($file_path_back)) {
                die(json_encode('Unable to delete the back file.'));
            }
        }

        $query = $conn->prepare(
                                "DELETE FROM products
                                WHERE product_id = ?");
        $query->bind_param(
                        "i",
                        $input['id']);

        if (!$query->execute()) {
        echo json_encode("Result set failed: " . $conn->error);
        }
        else {
            echo json_encode(1);
        }
    }
}

mysqli_close($conn);

?>