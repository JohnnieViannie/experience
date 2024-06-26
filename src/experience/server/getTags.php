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


$response = array();

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve tags from the database
    $stmt = $pdo->prepare("SELECT * FROM tag");
    $stmt->execute();
    $tags = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $stmtv = $pdo->prepare("SELECT * FROM skills");
    $stmtv->execute();
    $skills = $stmtv->fetchAll(PDO::FETCH_ASSOC);
    // Check if tags are found
    if ($tags) {
        // Set success response with tags data
        $response['status'] = 'success';
        $response['code'] = 200;
        $response['message'] = 'Tags retrieved successfully.';
        $response['data'] = $tags;
        $response['skills'] = $skills;
    } else {
        // Set error response if no tags are found
        $response['status'] = 'error';
        $response['code'] = 404;
        $response['message'] = 'No tags found.';
    }
} else {
    // Set error response for invalid request method
    $response['status'] = 'error';
    $response['code'] = 405;
    $response['message'] = 'Method Not Allowed.';
}

// Return JSON response
echo json_encode($response);
?>