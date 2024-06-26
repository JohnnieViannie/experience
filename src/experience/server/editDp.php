<?php

// Set headers for CORS and content type
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');

// Handle preflight OPTIONS request
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    header("HTTP/1.1 200 OK");
    die();
}

// Include database configuration file
include "config.php";

// Retrieve POST data
$projectId = $_POST['projectId'];

// Validate project ID
if (empty($projectId)) {
    echo json_encode(array("code" => 400, "message" => "Project ID is required"));
    exit();
}

// Handle edit picture
if ($_FILES['newPicture']['size'] > 0) {
  
  // Handle delete picture
// Retrieve image path from database
$stmt = $pdo->prepare("SELECT profile_pic FROM projects WHERE id = :projectId" );
$stmt->bindParam(':projectId', $projectId);
$stmt->execute();
$imagePath = $stmt->fetchColumn();


// Validate input
if (empty($imagePath)) {
    echo json_encode(array("code" => 400, "message" => "Image path is required"));
    exit();
}

// Delete image file from server
if (file_exists($imagePath)) {
    unlink($imagePath);
}


    $newPicture = $_FILES['newPicture'];
    $targetDir = "dp/"; // Directory where project pictures will be stored
    $newPictureName = uniqid() . '_' . basename($newPicture['name']); // Unique filename based on current time
    $targetFilePath = $targetDir . $newPictureName;

    // Upload new project picture file to server
    if (move_uploaded_file($newPicture['tmp_name'], $targetFilePath)) {
        // Update project picture in database
        $stmt = $pdo->prepare("UPDATE projects SET profile_pic = :projectPic WHERE id = :projectId");
        $stmt->bindParam(':projectPic', $targetFilePath);
        $stmt->bindParam(':projectId', $projectId);
        $stmt->execute();

        echo json_encode(array("code" => 100, "message" => "Project picture updated successfully"));
        exit();
    } else {
        echo json_encode(array("code" => 500, "message" => "Failed to upload new project picture"));
        exit();
    }
}


echo json_encode(array("code" => 100, "message" => "Project picture deleted successfully"));

// Close the database connection
$pdo = null;
header("Location: https://ni-experiences.com/editor");
?>