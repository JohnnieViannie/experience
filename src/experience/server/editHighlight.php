<?php

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
$data = json_decode(file_get_contents('php://input'), true);
// Retrieve POST data
$projectId = $data['projectId'];
$timeFrame = $data['timeFrame']; 
$studentsNumber = $data['studentsNumber']; 
$statusText = $data['statusText']; 

// Validate project ID
if (empty($projectId)) {
    echo json_encode(array("message" => "Project ID is required"));
    exit();
}

// Prepare and bind parameters for the update statement
$stmt = $pdo->prepare("UPDATE projects SET status_text = :statusText, time_frame = :timeFrame, students_number = :studentsNumber WHERE id = :projectId");

// Bind parameters for project details
$stmt->bindParam(':projectId', $projectId);
$stmt->bindParam(':statusText', $statusText);
$stmt->bindParam(':timeFrame', $timeFrame);
$stmt->bindParam(':studentsNumber', $studentsNumber);

// Execute the update statement
if (!$stmt->execute()) {
    echo json_encode(array("message" => "Failed to update project details"));
    exit();
}

// Return JSON response on success
echo json_encode(array("message" => "Project details updated successfully", "code"=>100));
?>