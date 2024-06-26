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
include "config.php"; // Include your
// Retrieve the project ID from the POST request
$projectid = $data['projectid'];

// Include your database configuration file

$stmt = $pdo->prepare("SELECT * FROM projects WHERE id =:id");

// Bind the ID parameter
$stmt->bindParam(':id', $projectid);

// Execute the query
$stmt->execute();
// Fetch the data
$projectData = $stmt->fetch(PDO::FETCH_ASSOC);



 $stmt2 = $pdo->prepare("SELECT * FROM skills lz JOIN project_skills pl ON pl.skill_id = lz.id WHERE pl.project_id=:id");
 
 $stmt2->bindParam(':id', $projectid);
    $stmt2->execute();

    $skillz = $stmt2->fetchAll(PDO::FETCH_ASSOC);

    $stmt3 = $pdo->prepare("SELECT * FROM tag JOIN project_tags pl ON pl.tag_id = tag.id WHERE pl.project_id=:id");
 
 $stmt3->bindParam(':id', $projectid);
    $stmt3->execute();

    $tags = $stmt3->fetchAll(PDO::FETCH_ASSOC);

   
   $stmt4 = $pdo->prepare("SELECT im.name, im.id FROM project_images im JOIN projects pl ON pl.id = im.project_id WHERE im.project_id=:id");
 
 $stmt4->bindParam(':id', $projectid);
    $stmt4->execute();

    $images = $stmt4->fetchAll(PDO::FETCH_ASSOC);

   
   $stmt5 = $pdo->prepare("SELECT im.image, im.id FROM partner_images im JOIN projects pl ON pl.id = im.project_id WHERE im.project_id=:id");
 
 $stmt5->bindParam(':id', $projectid);
    $stmt5->execute();

    $partner = $stmt5->fetchAll(PDO::FETCH_ASSOC);
   
   
   $datax = array(
    
    'project' => $projectData,
    'skillz'=>$skillz,
    'tags' => $tags,
    'images'=> $images,
     'partner'=> $partner,
   );
   
    echo json_encode($datax);


// Close the database connection
$pdo = null;

?>