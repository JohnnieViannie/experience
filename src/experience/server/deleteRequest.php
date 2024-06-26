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

$data = json_decode(file_get_contents('php://input'), true);
$projectId = $data['project_id'];

if ($projectId) {
    $sql = "DELETE FROM booking WHERE project_id = :project_id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':project_id', $projectId, PDO::PARAM_INT);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Request deleted successfully"]);
    } else {
        echo json_encode(["message" => "Failed to delete request"]);
    }
} else {
    echo json_encode(["message" => "Invalid project ID"]);
}
?>
