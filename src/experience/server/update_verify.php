<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');




include 'config.php';


$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email']; // Assuming email is submitted via POST
$verificationStatus = '1';

// Prepare the SQL statement for updating verification status
$stmt = $pdo->prepare("UPDATE users SET verified = :verificationStatus WHERE email = :email");

// Bind parameters
$stmt->bindParam(':verificationStatus', $verificationStatus);
$stmt->bindParam(':email', $email);

// Execute the update query
try {
    if($stmt->execute()){
    
    $response = array("success" => true, "message" => "Verification status updated successfully.", "code"=>'100');
    echo json_encode($response);
    
    }
} catch(PDOException $e) {
    $response = array("success" => false, "message" => "Error: " . $e->getMessage());
    echo json_encode($response);
}

?>
