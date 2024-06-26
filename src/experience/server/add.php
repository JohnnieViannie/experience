<?php
// Database connection configuration
$header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');


include 'config.php';

// Decode the JSON data sent from the frontend
$data = json_decode(file_get_contents('php://input'), true);

$skill = $data['skill'];

        // Prepare SQL statement
        $sql = "INSERT INTO skills (.name) VALUES (:skill)";
        $stmt = $pdo->prepare($sql);
        
        // Bind parameters
        $stmt->bindParam(":skill", $skill, PDO::PARAM_STR);
        
        // Execute statement
        $stmt->execute();
        
        // Output success message
        echo json_encode(["success" => true, "message" => "Skill added successfully"]);
        exit();
    } else {
        // Output error message if skill input is not provided
        echo json_encode(["success" => false, "message" => "Skill input is required"]);
        exit();
    }
} catch(PDOException $e) {
    // Output error message if database connection fails or query execution fails
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    exit();
}
?>