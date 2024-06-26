<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');

include "./config.php";

// Retrieve the data from the HTTP POST request
$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];

// Check if the email exists in the database
$stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
$stmt->bindParam(':email', $email);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// Prepare JSON response
if ($user) {
    // Email exists
    $response = array('exists' => true, 'message' => 'Email exists in the database.');
} else {
    // Email does not exist
    $response = array('exists' => false, 'message' => 'Email does not exist in the database.');
}

// Return JSON response
echo json_encode($response);
?>