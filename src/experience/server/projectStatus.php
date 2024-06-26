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

include "config.php"; // Include your database configuration file

// Retrieve the _POST from the H
$projectId = $_POST['projectId'];
$newStatus = $_POST['newStatus'];


// Perform your database update operation here
// For example, if you're using PDO:

    
    $statement = $pdo->prepare("UPDATE projects SET status = :newStatus WHERE id = :projectId");

    // Bind parameters
    $statement->bindParam(':newStatus', $newStatus);
    $statement->bindParam(':projectId', $projectId);

    // Execute the statement
    $statement->execute();

    // Close the connection
    $pdo = null;

    // Return a success response if needed
    echo json_encode(["success" => true]);


?>