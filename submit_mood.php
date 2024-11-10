<?php
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents("php://input");
    $newMood = json_decode($input, true);

    if ($newMood) {
        $filePath = 'moods.json';
        $moods = file_exists($filePath) ? json_decode(file_get_contents($filePath), true) : [];
        $moods[] = $newMood;
        file_put_contents($filePath, json_encode($moods, JSON_PRETTY_PRINT));
        echo json_encode(["status" => "success", "message" => "Mood saved successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid mood data"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
