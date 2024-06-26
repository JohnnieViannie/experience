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
$data = json_decode(file_get_contents("php://input"), true);
$projectId = $data['projectId'];
$imageId = $data['imageId'];

// Validate input
if (empty($projectId) || empty($imageId)) {
    echo json_encode(array("code" => 400, "message" => "Project ID and image ID are required"));
    exit();
}

// Fetch the image path from the database
$stmt = $pdo->prepare("SELECT name FROM project_images WHERE project_id = :projectId AND id = :imageId");
$stmt->bindParam(':projectId', $projectId);
$stmt->bindParam(':imageId', $imageId);
$stmt->execute();
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$result) {
    echo json_encode(array("code" => 404, "message" => "Project or image not found"));
    exit();
}

$imagePath = $result['name'];

if (empty($imagePath)) {
    echo json_encode(array("code" => 404, "message" => "Image not found for this project"));
    exit();
}

// Delete image file from server
if (file_exists($imagePath)) {
    if (!unlink($imagePath)) {
        echo json_encode(array("code" => 500, "message" => "Failed to delete image file"));
        exit();
    }
} else {
    echo json_encode(array("code" => 404, "message" => "Image file not found on server"));
    exit();
}

// Prepare SQL statement for deleting project image entry
$stmt = $pdo->prepare("DELETE FROM project_images WHERE project_id = :projectId AND id = :imageId");
$stmt->bindParam(':projectId', $projectId);
$stmt->bindParam(':imageId', $imageId);

if ($stmt->execute()) {
    echo json_encode(array("code" => 100, "message" => "Project image deleted successfully"));
} else {
    echo json_encode(array("code" => 500, "message" => "Failed to delete project image from database"));
}

// Close the database connection
$pdo = null;
?>