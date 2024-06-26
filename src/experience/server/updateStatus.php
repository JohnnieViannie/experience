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

include"./config.php";


   $data = json_decode(file_get_contents('php://input'), true);
   var_dump($data);

// Check if userId and status are provided in the POST request
if (isset($data['userId']) && isset($data['status'])) {
    $userId = $data['userId'];
    $status = $data['status'];

    // Prepare and execute the update statement
    try {
        $stmt = $pdo->prepare("UPDATE users SET status = :status WHERE user_id = :userId");
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':userId', $userId);
        $stmt->execute();
        
        // Check if any rows were affected
        if ($stmt->rowCount() > 0) {
            echo json_encode(array("success" => true, "message" => "User status updated successfully"));
        } else {
            echo json_encode(array("success" => false, "message" => "User not found or status already updated"));
        }
    } catch (PDOException $e) {
        echo json_encode(array("success" => false, "message" => "Error updating user status: " . $e->getMessage()));
    }
} else {
    echo json_encode(array("success" => false, "message" => "userId and status are required"));
}


?>