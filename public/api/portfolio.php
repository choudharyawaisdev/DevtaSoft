<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $result = $conn->query("SELECT * FROM portfolio ORDER BY created_at DESC");
    $portfolio = [];
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $portfolio[] = [
                "id" => $row['id'],
                "name" => $row['name'],
                "domain" => $row['domain'],
                "description" => $row['description'] ?? '',
                "image" => $row['image'],
                "category" => $row['category'] ?? '',
                "showOnLanding" => (bool)$row['show_on_landing'],
                "createdAt" => (int)$row['created_at']
            ];
        }
    }
    echo json_encode($portfolio);
} elseif ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || empty($input['id']) || empty($input['name'])) {
        http_response_code(400);
        echo json_encode(["error" => "Missing required fields"]);
        exit();
    }
    $stmt = $conn->prepare("INSERT INTO portfolio (id, name, domain, description, image, category, show_on_landing, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name), domain=VALUES(domain), description=VALUES(description), image=VALUES(image), category=VALUES(category), show_on_landing=VALUES(show_on_landing), created_at=VALUES(created_at)");
    $show = !empty($input['showOnLanding']) ? 1 : 0;
    $time = !empty($input['createdAt']) ? $input['createdAt'] : round(microtime(true) * 1000);
    $desc = $input['description'] ?? null;
    $cat = $input['category'] ?? null;
    $stmt->bind_param("ssssssii", $input['id'], $input['name'], $input['domain'], $desc, $input['image'], $cat, $show, $time);
    $stmt->execute();
    echo json_encode(["success" => true]);
} elseif ($method === 'DELETE') {
    $id = $_GET['id'] ?? '';
    if ($id) {
        $stmt = $conn->prepare("DELETE FROM portfolio WHERE id = ?");
        $stmt->bind_param("s", $id);
        $stmt->execute();
        echo json_encode(["success" => true]);
    }
}
?>
