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

include "./config.php";

// Retrieve the data from the HTTP POST request
$data = json_decode(file_get_contents('php://input'), true);


// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Initialize response array
    $response = array();

    // Retrieve form data
    $projectName = $data['projectName'];
    $shortbio = $data['shortbio'];
    $about = $data['about'];
    
    // Check if the data isn't empty
    if (!empty($projectName) && !empty($shortbio) && !empty($about)) {
        // Handle display picture (dp) upload
        // Assuming you have a directory to store uploaded display pictures
        $targetDir = "uploads/";
        $dp = "";
        if (!empty($_FILES['dp']['name'])) {
            $dp = $targetDir . basename($_FILES["dp"]["name"]);
            if (!move_uploaded_file($_FILES["dp"]["tmp_name"], $dp)) {
                $response['status'] = 'error';
                $response['code'] = 500;
                $response['message'] = 'Error uploading display picture.';
                echo json_encode($response);
                exit;
            }
        }
        
        // Handle other images upload
        // Assuming you have a directory to store uploaded other images
        $otherImages = [];
        $uploadSuccess = true; // Flag to track if all files were successfully uploaded
        if (!empty($_FILES['images']['name'][0])) {
            foreach ($_FILES['images']['name'] as $key => $name) {
                $targetFile = $targetDir . basename($_FILES["images"]["name"][$key]);
                if (move_uploaded_file($_FILES["images"]["tmp_name"][$key], $targetFile)) {
                    $otherImages[] = $targetFile;
                } else {
                    $uploadSuccess = false;
                    $response['status'] = 'error';
                    $response['code'] = 500;
                    $response['message'] = 'Error uploading files.';
                    echo json_encode($response);
                    exit;
                }
            }
        }
        
        // Proceed with database insert only if all files were successfully uploaded
        if ($uploadSuccess) {
            // Insert data into the projects table
            $stmt = $pdo->prepare("INSERT INTO projects (projectName, shortbio, about, dp) VALUES (?, ?, ?, ?)");
            // Bind parameters
            $stmt->bindParam(1, $projectName);
            $stmt->bindParam(2, $shortbio);
            $stmt->bindParam(3, $about);
            $stmt->bindParam(4, $dp);
            // Execute the statement
            if ($stmt->execute()) {
                // Get the last inserted project id
                $lastProjectId = $pdo->lastInsertId();
                
                // Insert other images into other_images table
                if (!empty($otherImages)) {
                    foreach ($otherImages as $image) {
                        $stmt = $pdo->prepare("INSERT INTO other_images (projectId, image) VALUES (?, ?)");
                        $stmt->bindParam(1, $lastProjectId);
                        $stmt->bindParam(2, $image);
                        $stmt->execute();
                    }
                }

                // Set success response
                $response['status'] = 'success';
                $response['code'] = 200;
                $response['message'] = 'Project added successfully.';
                echo json_encode($response);
                exit;
            } else {
                // Set error response if database insert fails
                $response['status'] = 'error';
                $response['code'] = 500;
                $response['message'] = 'Error adding project.';
                echo json_encode($response);
                exit;
            }
        }
    } else {
        // Set error response if required fields are not filled
        $response['status'] = 'error';
        $response['code'] = 400;
        $response['message'] = 'Please fill in all required fields.';
        echo json_encode($response);
        exit;
    }
}
?>