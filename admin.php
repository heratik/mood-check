<?php
session_start();
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header("Location: admin_login.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Area - Manage Moods</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <div class="container">
        <h1>Admin Area - Manage Moods</h1>
        <div id="admin-overview"></div>
        <p><a href="logout.php">Log Out</a></p>
        <p><a href="index.html">Overview</a></p>
    </div>

    <script src="admin.js"></script>

</body>
</html>
