<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
    exit;
}

$data = [
    'fname' => isset($_POST['fname']) ? htmlspecialchars(trim($_POST['fname'])) : '',
    'email' => isset($_POST['email']) ? trim($_POST['email']) : '',
    'phone' => isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : '',
    'service' => isset($_POST['service']) ? htmlspecialchars(trim($_POST['service'])) : 'غير محدد',
];

// ✅ تحقق من الاسم
if (empty($data['fname'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'الاسم مطلوب.']);
    exit;
}

// ✅ لازم واحد من الهاتف أو الإيميل
if (empty($data['phone']) && empty($data['email'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'يرجى إدخال رقم الهاتف أو البريد الإلكتروني.']);
    exit;
}

// ✅ تحقق من صيغة البريد إذا كان مكتوب
if (!empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'صيغة البريد الإلكتروني غير صحيحة.']);
    exit;
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'milakb943@gmail.com';   // بريد الإرسال
    $mail->Password = 'insleuqafwsejtmq';      // App Password من Gmail
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;
    $mail->CharSet = 'UTF-8';

    $mail->setFrom('milakb943@gmail.com', 'Website Services Form');
    $mail->addAddress('Info@milaknights.com', 'Milaknight');

    if (!empty($data['email'])) {
        $mail->addReplyTo($data['email'], $data['fname']);
    }

    $mail->isHTML(true);
    $mail->Subject = "طلب خدمة جديد من الموقع";
    $mail->Body = "
        <h1>طلب خدمة جديد</h1>
        <p><strong>الاسم:</strong> {$data['fname']}</p>
        <p><strong>رقم الهاتف:</strong> {$data['phone']}</p>
        <p><strong>البريد الإلكتروني:</strong> {$data['email']}</p>
        <p><strong>الخدمة المطلوبة:</strong> {$data['service']}</p>
    ";

    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'تم إرسال طلبك بنجاح.']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'فشل إرسال الطلب. حاول لاحقاً.']);
    error_log("Mailer Error: " . $e->getMessage());
}
