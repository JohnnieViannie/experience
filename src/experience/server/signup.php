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



$username = $data['name'];

$email = $data['email']; 
$pass = $data['password']; 
$phone_number = $data['phoneNumber'];
$intrest = $data['primaryInterest']; 
$university = $data['university']; 
$date = date('Y-m-d H:i');


$password     = password_hash($pass, PASSWORD_BCRYPT, array('cost' => 11));

$Date = date("Y-m-d");



// Check if email or phone number already exists in the database
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email OR phone_number = :phone_number LIMIT 1");
$stmt->bindParam(':email', $email);
$stmt->bindParam(':phone_number', $phone_number);
$stmt->execute();
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if ($row) {
    // Email or phone number already exists in the database
    $response = array("success" => false, "message" => "Email or phone number already exists in the database.");
    echo json_encode($response);
    die();
}

// Prepare the SQL statement for insertion
$stmt = $pdo->prepare("INSERT INTO users (username, email, password, phone_number, Intrest, created_at, verified, university, status) 
                        VALUES (:username, :email, :password, :phone_number, :Intrest,:date, 0, :university, '1')");

// Bind parameters
$stmt->bindParam(':username', $username);
$stmt->bindParam(':email', $email);
$stmt->bindParam(':password', $password);
$stmt->bindParam(':phone_number', $phone_number);
$stmt->bindParam(':Intrest', $intrest);
$stmt->bindParam(':university', $university);
$stmt->bindParam(':date', $Date);

// Execute the SQL statement
try {
    if($stmt->execute()){
    $response = array("success" => true, "message" => "Data inserted successfully.");
    echo json_encode($response);
    }
} catch(PDOException $e) {
    $response = array("success" => false, "message" => "Error: " . $e->getMessage());
    echo json_encode($response);
}

?>