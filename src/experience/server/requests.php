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
    $stmt = $pdo->prepare("SELECT * FROM projects ps JOIN booking bg ON bg.project_id= ps.id JOIN users ON users.user_id= bg.user_id WHERE bg.status ='pending'");
    $stmt->execute();

    $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    
    if ($projects) {
        // Set success response with data
    
     
        $response['projects'] = $projects;
     
    } else {
        // Set error response if no data is found
        $response['status'] = 'error';
        $response['code'] = 404;
        $response['message'] = 'No data found.';
    }


// Return JSON response
echo json_encode($response);
?>