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
$projectName = $_POST['projectName'];
$shortBio = $_POST['shortbio'];
$about = $_POST['about'];
$timeFrame = $_POST['timeFrame']; 
$studentsNumber = $_POST['studentsNumber']; 
$statusText = $_POST['statusText']; 
$tags = $_POST['tags'];
$skills = $_POST['skills'];
$displayImage = $_FILES['displayImage'];
$moreImages = $_FILES['moreImages'];
$partnerImages = $_FILES['partnerImages'];

// Validate project ID
if (empty($projectId)) {
    echo json_encode(array("message" => "Project ID is required"));
    exit();
}

// Validate required fields
if (empty($projectName) || empty($shortBio) || empty($displayImage)) {
    echo json_encode(array("message" => "Project Name, Short Bio, and Display Image are required"));
    exit();
}

// Handle display image upload
$targetDisplayDir = "dp/"; // Directory where display image will be stored
$displayFileName = uniqid() . '_' . basename($displayImage['name']); // Unique filename based on current time
$targetDisplayFilePath = $targetDisplayDir . $displayFileName;

// Validate and move display image file
if (!move_uploaded_file($displayImage['tmp_name'], $targetDisplayFilePath)) {
    echo json_encode(array("message" => "Failed to upload display image"));
    exit();
}

// Prepare SQL statement for updating project details
$stmt = $pdo->prepare("UPDATE projects SET name = :projectName, status_text = :statusText, time_frame = :timeFrame, students_number = :studentsNumber, bio = :shortBio, about = :about, profile_pic = :displayImage WHERE id = :projectId");

// Bind parameters for project details
$stmt->bindParam(':projectId', $projectId);
$stmt->bindParam(':projectName', $projectName);
$stmt->bindParam(':statusText', $statusText);
$stmt->bindParam(':timeFrame', $timeFrame);
$stmt->bindParam(':studentsNumber', $studentsNumber);
$stmt->bindParam(':shortBio', $shortBio);
$stmt->bindParam(':about', $about);
$stmt->bindParam(':displayImage', $targetDisplayFilePath);

// Execute the update statement
if (!$stmt->execute()) {
    echo json_encode(array("message" => "Failed to update project details"));
    exit();
}

// Handle additional images upload
$moreImagePaths = [];
$targetMoreDir = "images/"; // Directory where additional images will be stored

if (isset($moreImages) && is_array($moreImages['tmp_name'])) {
    foreach ($moreImages['tmp_name'] as $key => $tmp_name) {
        if ($moreImages['size'][$key] > 0) {
            $moreFileName = uniqid() . '_' . basename($moreImages['name'][$key]); // Unique filename based on current time
            $moreTargetFilePath = $targetMoreDir . $moreFileName;

            // Upload additional image file to server
            if (move_uploaded_file($tmp_name, $moreTargetFilePath)) {
                $moreImagePaths[] = $moreTargetFilePath;
            }
        }
    }
}

// Prepare SQL statement for inserting additional image paths into the project_images table
$stmt = $pdo->prepare("INSERT INTO project_images (project_id, name) VALUES (:projectId, :imagePath)");

// Bind parameters and insert each additional image path
foreach ($moreImagePaths as $imagePath) {
    $stmt->bindParam(':projectId', $projectId);
    $stmt->bindParam(':imagePath', $imagePath);
    $stmt->execute();
}

// Handle project tags (assuming project_tags table has a composite primary key of (project_id, tag_id))
if (!empty($tags)) {
    // Delete existing project tags
    $deleteStmt = $pdo->prepare("DELETE FROM project_tags WHERE project_id = :projectId");
    $deleteStmt->bindParam(':projectId', $projectId);
    $deleteStmt->execute();

    // Prepare SQL statement for inserting project tags
    $insertStmt = $pdo->prepare("INSERT INTO project_tags (project_id, tag_id) VALUES (:projectId, :tagId)");
 
    // Bind parameters and insert each selected tag
    foreach ($tags as $tagId) {
        $insertStmt->bindParam(':projectId', $projectId);
        $insertStmt->bindParam(':tagId', $tagId);
        $insertStmt->execute();
    }
}

// Handle project skills (assuming project_skills table has a composite primary key of (project_id, skill_id))
if (!empty($skills)) {
    // Delete existing project skills
    $deleteStmt = $pdo->prepare("DELETE FROM project_skills WHERE project_id = :projectId");
    $deleteStmt->bindParam(':projectId', $projectId);
    $deleteStmt->execute();

    // Prepare SQL statement for inserting project skills
    $insertStmt = $pdo->prepare("INSERT INTO project_skills (project_id, skill_id) VALUES (:projectId, :skillId)");

    // Bind parameters and insert each selected skill
    foreach ($skills as $skillId) {
        $insertStmt->bindParam(':projectId', $projectId);
        $insertStmt->bindParam(':skillId', $skillId);
        $insertStmt->execute();
    }
}

// Handle partner images upload
$partnerImagePaths = [];
$targetPartnerDir = "images/"; // Directory where partner images will be stored

if (isset($partnerImages) && is_array($partnerImages['tmp_name'])) {
    foreach ($partnerImages['tmp_name'] as $key => $tmp_name) {
        if ($partnerImages['size'][$key] > 0) {
            $partnerFileName = uniqid() . '_' . basename($partnerImages['name'][$key]); // Unique filename based on current time
            $partnerTargetFilePath = $targetPartnerDir . $partnerFileName;

            // Upload partner image file to server
            if (move_uploaded_file($tmp_name, $partnerTargetFilePath)) {
                $partnerImagePaths[] = $partnerTargetFilePath;
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

// Redirect to the admin page after successful execution
header("Location: https://ni-experiences.com/admin");
exit(); // Terminate script execution
?>
