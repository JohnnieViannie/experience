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

$data = json_decode(file_get_contents('php://input'), true);

include "config.php"; // Include your database configuration file

// Retrieve the email from the POST request
$email = $data['email'];

// Fetch booking information for the specified email
$stmt = $pdo->prepare("SELECT * FROM booking b JOIN users uz ON uz.user_id = b.user_id JOIN projects ps ON ps.id = b.project_id WHERE uz.email = :email AND b.status= 'booked'");
$stmt->bindParam(':email', $email);
$stmt->execute();
$book = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Fetch all projects that are not deleted and are booked
$stmt2 = $pdo->prepare("
SELECT p.*, t.name AS project_tag

                        FROM projects p 

                        LEFT JOIN project_tags pt ON pt.project_id = p.id 

                        LEFT JOIN tag t ON pt.tag_id = t.id 

                        WHERE p.deleted='0' AND p.booked= '1' 

                        GROUP BY p.id



");
$stmt2->execute();
$projects = $stmt2->fetchAll(PDO::FETCH_ASSOC);

// Fetch user information for the specified email
$stmt3 = $pdo->prepare("SELECT * FROM users WHERE email = :email");
$stmt3->bindParam(':email', $email);
$stmt3->execute();
$user = $stmt3->fetchAll(PDO::FETCH_ASSOC);

// Prepare data for JSON response
$datax = array(
    'book'=> $book,
    'projects' => $projects,
    'user'=> $user
);

// Send JSON response
echo json_encode($datax);

// Close the database connection
$pdo = null;
?>