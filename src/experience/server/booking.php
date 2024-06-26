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
$data = json_decode(file_get_contents('php://input'), true);


// Retrieve the _POST from the H
$projectId = $data['project_id'];
$userid = $data['user_id'];


    
    $statement = $pdo->prepare("UPDATE booking SET status = 'booked' WHERE project_id = :projectId AND user_id= :id");

    // Bind parameters
    $statement->bindParam(':id', $userid);
    $statement->bindParam(':projectId', $projectId);

    // Execute the statement
    $statement->execute();
    
    
      $stmt = $pdo->prepare("UPDATE projects SET booked = '0' WHERE id = :projectId");

    // Bind parameters
   
    $stmt->bindParam(':projectId', $projectId);

    // Execute the statement
    $stmt->execute();

    // Close the connection
    $pdo = null;

    // Return a success response if needed
   


?>