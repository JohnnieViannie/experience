<?php
// Database connection configuration
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');

include 'config.php';

try {
    // Decode the JSON data sent from the frontend
    $data = json_decode(file_get_contents('php://input'), true);

    // Check if tag data is provided
    if (isset($data['tag'])) {
        $tag = $data['tag'];

        // Prepare SQL statement
        $sql = "INSERT INTO tag (name) VALUES (:tag)";
        $stmt = $pdo->prepare($sql);

        // Bind parameters
        $stmt->bindParam(":tag", $tag, PDO::PARAM_STR);

        // Execute statement
        $stmt->execute();

        // Output success message
        echo json_encode(["success" => true, "message" => "Tag added successfully"]);
        exit();
    } else {
        // Output error message if tag input is not provided
        echo json_encode(["success" => false, "message" => "Tag input is required"]);
        exit();
    }
} catch(PDOException $e) {
    // Output error message if database connection fails or query execution fails
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    exit();
}
?>