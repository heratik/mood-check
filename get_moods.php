<?php
header("Content-Type: application/json");
$filePath = 'moods.json';

if (file_exists($filePath)) {
    echo file_get_contents($filePath);
} else {
    echo json_encode([]);
}
?>
