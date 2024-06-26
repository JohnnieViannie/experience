<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');

// Include PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Check if the request method is OPTIONS (preflight request)
require_once 'vendor/autoload.php';
include 'config.php';

// Decode the JSON data sent from the frontend
$data = json_decode(file_get_contents('php://input'), true);

// Check if all required fields are filled
if (!empty($data['email'])) {
    // Sanitize form data
 
    $email = htmlspecialchars($data['email']);
    $mail = new PHPMailer(true);
    $mail = new PHPMailer(true);

   
   include'./encrypt.php';
   
   $enEMail = encryptor('encrypt', $email);
        // Server settings
        $mail->isSMTP();                                            // Send using SMTP
        $mail->Host       = 'mail.browse-index.com';              // SMTP server
        $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
        $mail->Username   = 'hello@browse-index.com';           // SMTP username
        $mail->Password   = '774137204aS#!';                         // SMTP password
        $mail->SMTPOptions = array(
            'ssl' => array(
              'verify_peer' => false,
              'verify_peer_name' => false,
              'allow_self_signed' => true
            )
          );
        $mail->SMTPSecure = 'ssl';                               // Enable TLS encryption
        $mail->Port       = 465;                                    // TCP port to connect to

        // Recipients
        $mail->setFrom('hello@browse-index.com');
        $mail->addAddress($email, 'indEx');   // Add a recipient
        $mail->addReplyTo('hello@browse-index.com', 'indeX');                                   // Add a reply-to address

        // Content
        $mail->isHTML(true);                                      // Set email format to plain text
        $mail->Subject = 'Account verification';

        // Construct the message body
 
     include'passwordBodyEmail.php';
      
      
        $mail->Body = $message;

        // Send email
        $mail->send();

   


} else {
    // Return JSON response if any form field is empty
    echo json_encode(array("success" => false, "message" => "Please fill in all fields of the contact form."));
    exit;
}
?>