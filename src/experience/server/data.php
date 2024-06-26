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
$response = array();

    // Retrieve tags from the database
    $stmt = $pdo->prepare("SELECT * FROM projects  WHERE deleted='0'");
    $stmt->execute();

    $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $stmtv = $pdo->prepare("SELECT * FROM users");
    $stmtv->execute();
    $users = $stmtv->fetchAll(PDO::FETCH_ASSOC);
    
    // Check if projects and users are found
    if ($users) {
        // Set success response with data
        $response['status'] = 'success';
        $response['code'] = 200;
        $response['message'] = 'Data retrieved successfully.';
        $response['projects'] = $projects;
        $response['users'] = $users;
    } else {
        // Set error response if no data is found
        $response['status'] = 'error';
        $response['code'] = 404;
        $response['message'] = 'No data found.';
    }


// Return JSON response
echo json_encode($response);
?>