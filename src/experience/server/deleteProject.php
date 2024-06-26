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

// Include the Composer autoloader


// Retrieve the data from the HTTP POST request
$data = json_decode(file_get_contents('php://input'), true);



// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if the project ID is provided in the request
    if (isset($data["projectId"])) {
        // Get the project ID from the request
        $projectId = $data["projectId"];
        
     
            $stmt = $pdo->prepare("DELETE FROM projects WHERE project_id = :projectId");
            // Bind the project ID parameter
            $stmt->bindParam(":projectId", $projectId);
            // Execute the DELETE statement
            $stmt->execute();

            // Return a success message
            echo json_encode(["message" => "Project deleted successfully"]);
        } catch(PDOException $e) {
            // Return an error message if the deletion fails
            echo json_encode(["error" => "Error deleting project: " . $e->getMessage()]);
        }

        // Close the database connection
        $conn = null;
    } else {
        // Return an error message if the project ID is not provided in the request
        echo json_encode(["error" => "Project ID is required"]);
    }
} else {
    // Return an error message if the request method is not POST
    echo json_encode(["error" => "Only POST requests are allowed"]);
}
?>