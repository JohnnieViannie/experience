<?php

// Start output buffering
ob_start();

// Set headers for CORS and content type
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');

// Handle preflight OPTIONS request
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    header("HTTP/1.1 200 OK");
    ob_end_flush(); // Send output and stop buffering
    die();
}

// Include database configuration file
include "config.php";

// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

try {
    $projectId = $_POST['projectId'] ?? null;
    $moreImages = $_FILES['moreImages'] ?? null;

    // Validate project ID
    if (empty($projectId)) {
        http_response_code(400);
        echo json_encode(array("message" => "Project ID is required"));
        ob_end_flush(); // Send output and stop buffering
        exit();
    }

    if (empty($moreImages) || !is_array($moreImages['tmp_name'])) {
        http_response_code(400);
        echo json_encode(array("message" => "No images were uploaded"));
        ob_end_flush(); // Send output and stop buffering
        exit();
    }

    $partnerImagePaths = [];
    $targetPartnerDir = "images/"; // Directory where partner images will be stored

    // Ensure the upload directory exists
    if (!is_dir($targetPartnerDir)) {
        mkdir($targetPartnerDir, 0777, true);
    }

    foreach ($moreImages['tmp_name'] as $key => $tmp_name) {
        if ($moreImages['size'][$key] > 0) {
            // Check for upload errors
            if ($moreImages['error'][$key] !== UPLOAD_ERR_OK) {
                http_response_code(400);
                echo json_encode(array("message" => "File upload error: " . $moreImages['name'][$key]));
                ob_end_flush(); // Send output and stop buffering
                exit();
            }

            $partnerFileName = uniqid() . '_' . basename($moreImages['name'][$key]);
            $partnerFileName = preg_replace('/[^A-Za-z0-9_\-\.]/', '_', $partnerFileName); // Sanitize file name
            $partnerTargetFilePath = $targetPartnerDir . $partnerFileName;

            // Upload partner image file to server
            if (move_uploaded_file($tmp_name, $partnerTargetFilePath)) {
                $partnerImagePaths[] = $partnerTargetFilePath;
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Failed to upload file: " . $moreImages['name'][$key]));
                ob_end_flush(); // Send output and stop buffering
                exit();
            }
        }
    }

    // Prepare SQL statement for inserting partner image paths into the partner table
    $stmt = $pdo->prepare("INSERT INTO project_images (project_id, name) VALUES (:projectId, :imagePath)");

    // Bind parameters and insert each partner image path
    foreach ($partnerImagePaths as $imagePath) {
        $stmt->bindParam(':projectId', $projectId);
        $stmt->bindParam(':imagePath', $imagePath);
        $stmt->execute();
    }

    // Success response
    echo json_encode(array("message" => "Files uploaded successfully", "imagePaths" => $partnerImagePaths));
    
    // Close the database connection
    $pdo = null;

    // Redirect to the editor page
    header("Location: https://ni-experiences.com/editor");
    ob_end_flush(); // Send output and stop buffering
    exit();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array("message" => "An error occurred: " . $e->getMessage()));
    ob_end_flush(); // Send output and stop buffering
}