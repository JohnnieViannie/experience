<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
if ($method === "OPTIONS") {
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    header("HTTP/1.1 200 OK");
    die();
}

include "config.php"; // Include your database configuration file

// Retrieve the _POST from the HTTP POST request
$projectName = $_POST['projectName'] ?? '';
$shortBio = $_POST['shortbio'] ?? '';
$about = $_POST['about'] ?? '';
$tags = $_POST['tags'] ?? [];
$skills = $_POST['skills'] ?? [];
$studentN = $_POST['studentNumber'] ?? '';
$timeFrame = $_POST['timeFrame'] ?? '';
$statusText = $_POST['statusText'] ?? '';
// Check if required fields are present
if (empty($projectName) || empty($shortBio)) {
    echo json_encode(array("message" => "Project Name and Short Bio are required"));
    exit();
}

// Check if display image is present and not empty
if (!isset($_FILES['displayImage']) || $_FILES['displayImage']['error'] !== UPLOAD_ERR_OK || $_FILES['displayImage']['size'] == 0) {
    echo json_encode(array("message" => "Display image is missing or empty"));
    exit();
}

// Handle display image upload
$targetDisplayDir = "dp/"; // Directory where display image will be stored
$displayFileName = uniqid() . '_' . basename($_FILES['displayImage']['name']); // Unique filename based on current time
$targetDisplayFilePath = $targetDisplayDir . $displayFileName;

// Validate display image file
if (!move_uploaded_file($_FILES['displayImage']['tmp_name'], $targetDisplayFilePath)) {
    echo json_encode(array("message" => "Failed to upload display image"));
    exit();
}

// Format the date
$date = date('Y-m-d');

// Prepare SQL statement for inserting project _POST including display image
$stmt = $pdo->prepare("INSERT INTO projects (name, bio, about, profile_pic, booked, created, time_frame, students_number, status_text) VALUES (:projectName, :shortBio, :about, :displayImage, '1', :date, :timeFrame, :studentN, :status_text)");

// Bind parameters for project _POST including display image
$stmt->bindParam(':projectName', $projectName);
$stmt->bindParam(':shortBio', $shortBio);
$stmt->bindParam(':about', $about);
$stmt->bindParam(':displayImage', $targetDisplayFilePath);
$stmt->bindParam(':date', $date);
$stmt->bindParam(':studentN', $studentN);
$stmt->bindParam(':timeFrame', $timeFrame);
$stmt->bindParam(':status_text', $statusText);

// Execute the statement
$stmt->execute();
$projectId = $pdo->lastInsertId(); // Get the ID of the last inserted project

// Check if partner images are present and not empty
if (!isset($_FILES['partnerImages']) || empty($_FILES['partnerImages']['tmp_name'][0])) {
    echo json_encode(array("message" => "Partner images are missing or empty"));
    exit();
}

// Handle partner images upload
$partnerImagePaths = [];
$targetPartnerDir = "images/"; // Directory where partner images will be stored

if (isset($_FILES['partnerImages']) && is_array($_FILES['partnerImages']['tmp_name'])) {
    foreach ($_FILES['partnerImages']['tmp_name'] as $key => $tmp_name) {
        if ($_FILES['partnerImages']['size'][$key] > 0) {
            $partnerFileName = uniqid() . '_' . basename($_FILES['partnerImages']['name'][$key]); // Unique filename based on current time
            $partnerTargetFilePath = $targetPartnerDir . $partnerFileName;

            // Upload partner image file to server
            if (move_uploaded_file($tmp_name, $partnerTargetFilePath)) {
                $partnerImagePaths[] = $partnerTargetFilePath;
            }
        }
    }
} else {
    echo json_encode(array("message" => "There are no partner images to upload."));
}

// Prepare SQL statement for inserting partner image paths into the partner table
$stmt = $pdo->prepare("INSERT INTO partner_images (project_id, image) VALUES (:projectId, :imagePath)");

// Bind parameters and insert each partner image path
foreach ($partnerImagePaths as $imagePath) {
    $stmt->bindParam(':projectId', $projectId);
    $stmt->bindParam(':imagePath', $imagePath);
    $stmt->execute();
}

// Check if additional images are present and not empty
if (!isset($_FILES['moreImages']) || empty($_FILES['moreImages']['tmp_name'][0])) {
    echo json_encode(array("message" => "Additional images are missing or empty"));
    exit();
}

// Handle additional images upload
$additionalImagePaths = [];
$targetAdditionalDir = "images/"; // Directory where additional images will be stored

if (isset($_FILES['moreImages']) && is_array($_FILES['moreImages']['tmp_name'])) {
    foreach ($_FILES['moreImages']['tmp_name'] as $key => $tmp_name) {
        if ($_FILES['moreImages']['size'][$key] > 0) {
            $additionalFileName = uniqid() . '_' . basename($_FILES['moreImages']['name'][$key]); // Unique filename based on current time
            $additionalTargetFilePath = $targetAdditionalDir . $additionalFileName;

            // Upload additional image file to server
            if (move_uploaded_file($tmp_name, $additionalTargetFilePath)) {
                $additionalImagePaths[] = $additionalTargetFilePath;
            }
        }
    }
} else {
    echo json_encode(array("message" => "There are no additional images to upload."));
}

// Prepare SQL statement for inserting additional image paths into the database
$stmt = $pdo->prepare("INSERT INTO project_images (project_id, name) VALUES (:projectId, :imagePath)");

// Bind parameters and insert each additional image path
foreach ($additionalImagePaths as $imagePath) {
    $stmt->bindParam(':projectId', $projectId);
    $stmt->bindParam(':imagePath', $imagePath);
    $stmt->execute();
}

// Prepare SQL statement for inserting tag
$stmt = $pdo->prepare("INSERT INTO project_tags (project_id, tag_id) VALUES (:projectId, :tagId)");

// Bind parameters and insert each selected tag
if (isset($_POST['tags']) && is_array($_POST['tags'])) {
    foreach ($_POST['tags'] as $tagId) {
        $stmt->bindParam(':projectId', $projectId);
        $stmt->bindParam(':tagId', $tagId);
        $stmt->execute();
    }
}

// Prepare SQL statement for inserting skills _POST
$stmt = $pdo->prepare("INSERT INTO project_skills (project_id, skill_id) VALUES (:projectId, :skillId)");

// Bind parameters and insert each selected skill
if (isset($_POST['skills']) && is_array($_POST['skills'])) {
    foreach ($_POST['skills'] as $skillId) {
       $stmt->bindParam(':projectId', $projectId);
        $stmt->bindParam(':skillId', $skillId);
        $stmt->execute();
    }
}

// Redirect to the admin page after successful execution
header("Location: https://ni-experiences.com/admin");

// Close the database connection
$pdo = null;

?>
