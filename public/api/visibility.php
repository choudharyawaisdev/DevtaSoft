<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $result = $conn->query("SELECT settings FROM visibility WHERE id = 'settings'");
    if ($result && $row = $result->fetch_assoc()) {
        echo $row['settings'];
    } else {
        echo json_encode(null);
    }
} elseif ($method === 'POST') {
    $raw = file_get_contents('php://input');
    if ($raw) {
        $stmt = $conn->prepare("INSERT INTO visibility (id, settings) VALUES ('settings', ?) ON DUPLICATE KEY UPDATE settings = VALUES(settings)");
        $stmt->bind_param("s", $raw);
        $stmt->execute();
        echo json_encode(["success" => true]);
    }
}
?>
