<?php
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    if (isset($data['index']) && isset($data['name']) && isset($data['message']) && isset($data['gifUrl'])) {
        $filePath = 'moods.json';
        $moods = json_decode(file_get_contents($filePath), true);
        
        $index = $data['index'];
        if (isset($moods[$index])) {
            $moods[$index] = [
                "name" => $data['name'],
                "message" => $data['message'],
                "gifUrl" => $data['gifUrl']
            ];
            file_put_contents($filePath, json_encode($moods, JSON_PRETTY_PRINT));
            echo json_encode(["status" => "success", "message" => "Mood updated successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Mood not found"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid mood data"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
