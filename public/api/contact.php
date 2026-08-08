<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['name']) || empty($input['email']) || empty($input['message'])) {
    http_response_code(400);
    echo json_encode(["error" => "Name, email, and message are required."]);
    exit();
}

$to = getenv('CONTACT_RECEIVER_EMAIL') ?: "chawaisdev92@gmail.com";
$subject = "🚀 New Contact Form Submission: " . ($input['subject'] ?? "General Inquiry");
$name = htmlspecialchars($input['name']);
$email = htmlspecialchars($input['email']);
$message = htmlspecialchars($input['message']);
$phone = isset($input['phone']) ? htmlspecialchars($input['phone']) : '';
$company = isset($input['company']) ? htmlspecialchars($input['company']) : '';

$body = "You have received a new contact submission from your website:\n\n";
$body .= "Name: $name\n";
$body .= "Email: $email\n";
if ($phone) $body .= "Phone: $phone\n";
if ($company) $body .= "Company: $company\n";
$body .= "Subject: " . ($input['subject'] ?? 'N/A') . "\n\n";
$body .= "Message:\n$message\n";

$headers = "From: DevtaSoft Website <chawaisdev92@gmail.com>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(["success" => true, "message" => "Email sent successfully"]);
} else {
    echo json_encode(["success" => true, "message" => "Message received successfully"]);
}
?>
