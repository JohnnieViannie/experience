<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');

// Include PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Autoload PHPMailer classes
require_once 'vendor/autoload.php';
include 'config.php';

try {
    // Decode the JSON data sent from the frontend
    $data = json_decode(file_get_contents('php://input'), true);
    
    // For testing purposes
    $data['email'] = 'johnviannie01@gmail.com';

    // Check if email is provided
    if (!empty($data['email'])) {
        // Sanitize form data
        $email = htmlspecialchars($data['email']);
        $mail = new PHPMailer(true);

        include './encrypt.php';
        $enEmail = encryptor('encrypt', $email);

        // Server settings
        $mail->isSMTP();
        $mail->Host = 'mail.browse-index.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'hello@browse-index.com';
        $mail->Password = '774137204aS#!';
        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        // Recipients
        $mail->setFrom('hello@browse-index.com');
        $mail->addAddress($email, 'indEx');
        $mail->addReplyTo('hello@browse-index.com', 'indeX');

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Account verification';

        // Construct the message body
      //  include 'passwordBodyEmail.php';
        $mail->Body = 'hehe';

        // Send email
        $mail->send();
        echo json_encode(array("success" => true, "message" => "Email sent successfully."));
    } else {
        throw new Exception("Please fill in all fields of the contact form.");
    }
} catch (Exception $e) {
    // Return JSON response with error details
    echo json_encode(array("success" => false, "message" => $e->getMessage()));
}
?>