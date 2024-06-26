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
$em = $data['email'];
$password = $data['npassword'];
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate input
   
    include'./encrypt.php';
   
   $email = encryptor('decrypt', $em);

    // Hash the new password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Prepare and execute the update statement
    $sql = "UPDATE users SET password = :password WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':password', $hashedPassword);
    $stmt->bindParam(':email', $email);

    // Check if the update was successful
    if ($stmt->execute()) {
        // Password updated successfully
        echo json_encode(array("success" => true, "message" => "Password updated successfully."));
    } else {
        // Error updating password
        echo json_encode(array("success" => false, "message" => "Error updating password. Please try again."));
    }
}
?>