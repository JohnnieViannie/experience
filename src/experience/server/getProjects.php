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


$query = "SELECT 
    p.id, 
    p.name AS project, 
    profile_pic, 
    about, 
    bio, 
    status_text, 
    time_frame, 
    students_number, 
    GROUP_CONCAT(DISTINCT t.name) AS tags, 
    GROUP_CONCAT(DISTINCT s.name) AS skills, 
    GROUP_CONCAT(DISTINCT i.name) AS images, 
    GROUP_CONCAT(DISTINCT pi.image) AS logos 
FROM 
    projects p 
LEFT JOIN 
    project_tags pt ON p.id = pt.project_id 
LEFT JOIN 
    tag t ON pt.tag_id = t.id 
LEFT JOIN 
    project_skills ps ON p.id = ps.project_id 
LEFT JOIN 
    skills s ON ps.skill_id = s.id 
LEFT JOIN 
    project_images i ON p.id = i.project_id 
LEFT JOIN 
    partner_images pi ON pi.project_id = p.id 
WHERE 
    deleted = '0' 
GROUP BY 
    p.id 
ORDER BY 
    p.id DESC";

// Prepare and execute the query
$stmt = $pdo->prepare($query);
$stmt->execute();

// Fetch data as associative array
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Format the data into JSON format
$json_data = [];

foreach ($result as $row) {
    $project = [
        "id" => $row['id'],
        "dp" => $row['profile_pic'],
        "time" => $row['time_frame'],
        "studentsN" => $row['students_number'],
         "statusText" => $row['status_text'],
        "image" => explode(',', $row['images'])[0], // Use only the first image
        "title" => $row['project'],
         "statusText" => $row['status_text'],
        "about" => $row['about'], // Assuming project name is also the title
          "bio" => $row['bio'],
        "excerpt" => "", // Add excerpt if available in your database
        "author" => "", // Add author if available in your database
        "skills" => explode(',', $row['skills']),
        "category" => explode(',', $row['tags']), // Assuming tags represent categories
        "status" => [], // Add status if available in your database
        "images" => explode(',', $row['images']), // Assuming logos are the same as images
         "logos" => explode(',', $row['logos']) // Assuming logos are the same as images
    ];

    // Push the formatted project data into JSON array
    $json_data[] = $project;
}

// Output the JSON data
header('Content-Type: application/json');
echo json_encode($json_data, JSON_PRETTY_PRINT);
?>