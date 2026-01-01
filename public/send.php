<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
    exit;
}

$data = filter_input_array(INPUT_POST, [
    'fname' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
    'email' => FILTER_VALIDATE_EMAIL,
    'phone' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
    'subject' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
    'message' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
]);

// Validate required fields
if (empty($data['fname']) || empty($data['email']) || empty($data['phone']) || empty($data['subject']) || empty($data['message'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
    exit;
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'milakb943@gmail.com';
    $mail->Password = 'insleuqafwsejtmq';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;
    $mail->CharSet = 'UTF-8';

    $mail->setFrom('milakb943@gmail.com', 'Website Contact Form');
    $mail->addAddress('Info@milaknights.com', 'Milaknight');
    $mail->addReplyTo($data['email'], $data['fname']);

    $mail->isHTML(true);
    $mail->Subject = "رسالة جديدة من نموذج الاتصال";
    $mail->Body = "
    <h1>New message from website</h1>
    <p><strong>Name:</strong> {$data['fname']}</p>
    <p><strong>Email:</strong> {$data['email']}</p>
    <p><strong>Phone:</strong> {$data['phone']}</p>
    <p><strong>Subject:</strong> {$data['subject']}</p>
    <p><strong>Message:</strong><br>{$data['message']}</p>
";

    $mail->send();
    echo json_encode(['status' => 'success']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى لاحقًا.']);
    error_log("Mailer Error: " . $e->getMessage());
}