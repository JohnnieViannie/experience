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
$email = $data['email'];
$password = $data['password'];

// Check if the email and password match a user in the database
$stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');

$stmt->bindValue(':email', $email);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!empty($user) && password_verify($password, $user['password'])) {

if($user['verified']== '1'){

if($user['status']== '1'){
  // Login successful, return JSON response
  $email = $user['email'];
  $response = array('login' => 'success', 'email'=>$email, 'name'=>$user['username']);
  echo json_encode($response);
}else{
  
  $response = array('login' => 'failed', 'email'=>$email, 'name'=>$user['username']);
  
}
  }else{
  
  $email = $user['email'];
  $response = array('login' =>false, 'note'=>"Not verified", 'code'=>'50','email'=>$email, 'name'=>$user['username']);
  echo json_encode($response);
   
  
  }
  
} elseif (empty($user)) {
  // Email doesn't exist, return JSON response
  $response = array('login' => 'failed', 'note'=>"email doesn't exist");
  echo json_encode($response);
} else {
  // Login failed (wrong password), return JSON response
  $response = array('login' => 'failed', 'note'=>"wrong password", 'code'=> '100');
  echo json_encode($response);
}
?>