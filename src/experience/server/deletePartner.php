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

// Retrieve image path from database
$stmt = $pdo->prepare("SELECT image FROM partner_images WHERE project_id = :projectId AND id = :imageId");
$stmt->bindParam(':projectId', $projectId);
$stmt->bindParam(':imageId', $imageId);
$stmt->execute();
$imagePath = $stmt->fetchColumn();

// Delete image file from storage
if (file_exists($imagePath)) {
    unlink($imagePath);
}

// Prepare SQL statement for deleting partner image
$stmt = $pdo->prepare("DELETE FROM partner_images WHERE project_id = :projectId AND id = :imageId");

// Bind parameters and execute statement
$stmt->bindParam(':projectId', $projectId);
$stmt->bindParam(':imageId', $imageId);

if ($stmt->execute()) {
    echo json_encode(array("code" => 100, "message" => "Partner image deleted successfully"));
} else {
    echo json_encode(array("code" => 500, "message" => "Failed to delete partner image"));
}

// Close the database connection
$pdo = null;
?>