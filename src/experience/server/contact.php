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
if (!empty($data['name']) && !empty($data['university']) && !empty($data['email']) && !empty($data['phoneNumber']) && !empty($data['primaryInterest'])) {
    // Sanitize form data
    $name = htmlspecialchars($data['name']);
    $university =  htmlspecialchars($data['university']);
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $phoneNumber = htmlspecialchars($data['phoneNumber']);
    $primaryInterest = htmlspecialchars($data['primaryInterest']);
    $myText = htmlspecialchars($data['message']);

    // Instantiate PHPMailer
    $mail = new PHPMailer(true);

   
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
        $mail->addAddress('hello@browse-index.com','indEx');   // Add a recipient
        $mail->addReplyTo($email, $name);                                   // Add a reply-to address

        // Content
        $mail->isHTML(true);                                      // Set email format to plain text
        $mail->Subject = 'New Contact Form Submission';

        // Construct the message body
        $message = "Contact Form Submission:\n\n<br>";
        $message .= "Name: " . $name . "\n<br>";
        $message .= "University: " . $university . "\n<br>";
        $message .= "Email: " . $email . "\n<br>";
        $message .= "Phone Number: " . $phoneNumber . "\n<br>";
        $message .= "Primary Interest: " . $primaryInterest . "\n\n<br>";
        $message .= "Message: " . $myText . "\n\n";

        $mail->Body = $message;

        // Send email
        $mail->send();

      

        /// store contact in the database
    
            // Set the PDO error mode to exception
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Check if email or phone number already exists in the database
            $stmt = $pdo->prepare("SELECT COUNT(*) FROM contact_list WHERE email = :email OR phone_number = :phoneNumber");
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':phoneNumber', $phoneNumber);
            $stmt->execute();
            $count = $stmt->fetchColumn();

            if ($count > 0) {
                // Email or phone number already exists, return error response
                echo json_encode(array("success" => false, "message" => "Email or phone number already exists."));
                exit;
            } else {
                // Insert user credentials into the contact_list table
                $stmt = $pdo->prepare("INSERT INTO contact_list (name, university, email, phone_number, primary_interest) VALUES(:name, :university, :email, :phoneNumber,:primaryInterest)");
                $stmt->bindParam(':name', $name);
                $stmt->bindParam(':university', $university);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':phoneNumber', $phoneNumber);
                $stmt->bindParam(':primaryInterest', $primaryInterest);
               
// Execute the prepared statement
if ($stmt->execute()) {
  
  echo json_encode(array("success" => true, "message" => "Message has been sent"));  
} else {
    // If execution fails, extract the error message
    $errorInfo = $stmt->errorInfo();
    $errorMessage = $errorInfo[2]; // The error message is usually at index 2
    // Handle the error message as needed
    echo "SQL error: " . $errorMessage;
}

                // Return success response
                echo json_encode(array("success" => true, "message" => "User credentials stored successfully."));
                exit;
            }


} else {
    // Return JSON response if any form field is empty
    echo json_encode(array("success" => false, "message" => "Please fill in all fields of the contact form."));
    exit;
}
?>