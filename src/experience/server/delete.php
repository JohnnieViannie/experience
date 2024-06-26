<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
    header("HTTP/1.1 200 OK");
    die();
}
$data = json_decode(file_get_contents('php://input'), true);
include "config.php"; // Include your
// Retrieve the project ID from the POST request
$projectId = $data['projectId'];

// Check if project ID is provided
if (empty($projectId)) {
    echo json_encode(array("success" => false, "message" => "Project ID is required"));
    exit();
}

try {
    // Prepare and execute the SQL statement to delete the project
    $stmt = $pdo->prepare("UPDATE projects SET deleted ='1' WHERE id = :projectId");
    $stmt->bindParam(':projectId', $projectId);
    

    // Check if any rows were affected (i.e., if the project was deleted)
    if ($stmt->execute()) {
        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("success" => false, "message" => "Failed to delete project"));
    }
} catch (PDOException $e) {
    echo json_encode(array("success" => false, "message" => "Database error: " . $e->getMessage()));
}

?>