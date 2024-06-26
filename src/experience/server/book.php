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
    $emailuser = htmlspecialchars($data['email']);
    $projectid = htmlspecialchars($data['projectid']);
    $start_date = htmlspecialchars($data['start_date']);
    $end_date = htmlspecialchars($data['end_date']);
    $pricing_plan = htmlspecialchars($data['pricing_plan']);
    $num_students = htmlspecialchars($data['num_students']);
    $name = htmlspecialchars($data['name']); // Assuming this field is for project name

    // Prepare and execute query to fetch user details
    $stmt1 = $pdo->prepare("SELECT * FROM users WHERE email = :email");
    $stmt1->bindParam(':email', $emailuser);
    $stmt1->execute();

    // Fetch the result as an associative array
    $row = $stmt1->fetch(PDO::FETCH_ASSOC);

    if ($row) {
        // Extract user details
        $id = $row['user_id'];
        $uname = $row['username'];
        
    }

    // Prepare and execute query to insert booking data
    $stmt2 = $pdo->prepare("INSERT INTO booking (project_id, user_id, status, created, start_date, end_date, pricing_plan, num_students) VALUES (:pid, :uid, 'pending', NOW(), :start_date, :end_date, :pricing_plan, :num_students)");
    $stmt2->bindParam(':pid', $projectid);
    $stmt2->bindParam(':uid', $id);
    $stmt2->bindParam(':start_date', $start_date);
    $stmt2->bindParam(':end_date', $end_date);
    $stmt2->bindParam(':pricing_plan', $pricing_plan);
    $stmt2->bindParam(':num_students', $num_students);
    $stmt2->execute();

    // Construct email message
    $message = "Hello,<br><br>" . $uname . " has booked the ".$name." project. Kindly login to check the request. Details:<br>";
    $message .= "Email: ".$emailuser."<br>";
    $message .= "Start Date: ".$start_date."<br>";
    $message .= "End Date: ".$end_date."<br>";
    $message .= "Pricing Plan: ".$pricing_plan."<br>";
    $message .= "Number of Students: ".$num_students."<br>";

    // Instantiate PHPMailer
    $mail = new PHPMailer(true);
    
    try {
        // Server settings
        $mail->isSMTP();                                         // Send using SMTP
        $mail->Host       = 'mail.browse-index.com';           // SMTP server
        $mail->SMTPAuth   = true;                                // Enable SMTP authentication
        $mail->Username   = 'hello@browse-index.com';        // SMTP username
        $mail->Password   = '774137204aS#!';                      // SMTP password
        $mail->SMTPSecure = 'ssl';                               // Enable TLS encryption
        $mail->Port       = 465;                                 // TCP port to connect to

        // Recipients
        $mail->setFrom('hello@browse-index.com');
        $mail->addAddress('hello@browse-index.com', 'indEx');
        $mail->addReplyTo('hello@browse-index.com', 'indEx');

        // Content
        $mail->isHTML(true);                                    // Set email format to HTML
        $mail->Subject = 'Booking';
        $mail->Body    = $message;

        // Send email
        $mail->send();

        echo json_encode(array("success" => true, "message" => "Booking email sent successfully."));
    } catch (Exception $e) {
        echo json_encode(array("success" => false, "message" => "Error sending booking email: " . $mail->ErrorInfo));
    }

} else {
    // Return JSON response if any form field is empty
    echo json_encode(array("success" => false, "message" => "Please fill in all fields of the contact form."));
    exit;
}
?>
