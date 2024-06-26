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
$skills = $data['skills'];

// Validate project ID and skills
if (empty($projectId) || empty($skills)) {
    echo json_encode(array("code" => 400, "message" => "Project ID and skills are required"));
    exit();
}

try {
    // Begin transaction
    $pdo->beginTransaction();

    // Delete existing skills for the project
    $deleteStmt = $pdo->prepare("DELETE FROM project_skills WHERE project_id = :projectId");
    $deleteStmt->bindParam(':projectId', $projectId);
    $deleteStmt->execute();

    // Insert new skills for the project
    $insertStmt = $pdo->prepare("INSERT INTO project_skills (project_id, skill_id) VALUES (:projectId, :skillId)");
    foreach ($skills as $skillId) {
        $insertStmt->bindParam(':projectId', $projectId);
        $insertStmt->bindParam(':skillId', $skillId);
        $insertStmt->execute();
    }

    // Commit transaction
    $pdo->commit();

    echo json_encode(array("code" => 100, "message" => "Project skills updated successfully"));
} catch (Exception $e) {
    // Rollback transaction in case of error
    $pdo->rollBack();
    echo json_encode(array("code" => 500, "message" => "Failed to update project skills", "error" => $e->getMessage()));
}
?>