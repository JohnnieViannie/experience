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

try {
    $projectId = $_POST['projectId'];
    $partnerImages = $_FILES['partnerImages'];

    // Validate project ID
    if (empty($projectId)) {
        echo json_encode(array("message" => "Project ID is required"));
        exit();
    }

    $partnerImagePaths = [];
    $targetPartnerDir = "partners/"; // Directory where partner images will be stored

    // Ensure the upload directory exists
    if (!is_dir($targetPartnerDir)) {
        mkdir($targetPartnerDir, 0777, true);
    }

    if (isset($partnerImages) && is_array($partnerImages['tmp_name'])) {
        foreach ($partnerImages['tmp_name'] as $key => $tmp_name) {
            if ($partnerImages['size'][$key] > 0) {
                $partnerFileName = uniqid() . '_' . basename($partnerImages['name'][$key]);
                $partnerFileName = preg_replace('/[^A-Za-z0-9_\-\.]/', '_', $partnerFileName); // Sanitize file name
                $partnerTargetFilePath = $targetPartnerDir . $partnerFileName;

                // Upload partner image file to server
                if (move_uploaded_file($tmp_name, $partnerTargetFilePath)) {
                    $partnerImagePaths[] = $partnerTargetFilePath;
                } else {
                    echo json_encode(array("message" => "Failed to upload file: " . $partnerImages['name'][$key]));
                    exit();
                }
            }
        }
    }

    // Prepare SQL statement for inserting partner image paths into the partner table
    $stmt = $pdo->prepare("INSERT INTO partner_images (project_id, image) VALUES (:projectId, :imagePath)");

    // Bind parameters and insert each partner image path
    foreach ($partnerImagePaths as $imagePath) {
        $stmt->bindParam(':projectId', $projectId);
        $stmt->bindParam(':imagePath', $imagePath);
        $stmt->execute();
    }

    // Close the database connection
    $pdo = null;

    echo json_encode(array("message" => "Files uploaded successfully", "imagePaths" => $partnerImagePaths));
    header("Location: https://ni-experiences.com/editor"); 
} catch (Exception $e) {
    echo json_encode(array("message" => "An error occurred: " . $e->getMessage()));
}

?>