<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
    exit;
}

// استلام البيانات من الفورم
$name = isset($_POST['fname']) ? trim($_POST['fname']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$package = isset($_POST['selected_package']) ? trim($_POST['selected_package']) : 'غير محدد';

// تحقق من الإدخالات
if (empty($name)) {
    echo json_encode(['status' => 'error', 'message' => 'الاسم مطلوب.']);
    exit;
}

if (empty($phone) && empty($email)) {
    echo json_encode(['status' => 'error', 'message' => 'يرجى إدخال رقم الهاتف أو البريد الإلكتروني.']);
    exit;
}

$mail = new PHPMailer(true);

try {
    // إعداد SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'milakb943@gmail.com';  // ✨ بريدك
    $mail->Password = 'insleuqafwsejtmq';    // ✨ App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;
    $mail->CharSet = 'UTF-8';

    // معلومات الإيميل
    $mail->setFrom('milakb943@gmail.com', 'Milaknight Website');
    $mail->addAddress('Info@milaknights.com', 'Milaknight');

    if (!empty($email)) {
        $mail->addReplyTo($email, $name);
    }

    $mail->isHTML(true);
    $mail->Subject = "طلب عرض أسعار جديد";
    $mail->Body = "
        <h2>تفاصيل الطلب</h2>
        <p><strong>الاسم:</strong> {$name}</p>
        <p><strong>الهاتف:</strong> " . (!empty($phone) ? $phone : 'غير مدخل') . "</p>
        <p><strong>البريد الإلكتروني:</strong> " . (!empty($email) ? $email : 'غير مدخل') . "</p>
        <p><strong>الخدمة المطلوبة:</strong> {$package}</p>
    ";

    $mail->send();

    echo json_encode(['status' => 'success', 'message' => 'تم إرسال طلبك بنجاح.']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'حدث خطأ أثناء إرسال الطلب.']);
    error_log("Mailer Error: " . $mail->ErrorInfo);
}
