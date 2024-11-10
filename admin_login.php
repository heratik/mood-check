<?php
session_start();

// Define the admin password
$admin_password = 'Tical187'; // Set your desired password here

// Check if the form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the submitted password
    $password = $_POST['password'];

    // Verify the password
    if ($password === $admin_password) {
        // Set a session variable to indicate the user is logged in
        $_SESSION['logged_in'] = true;
        
        // Redirect to the admin area
        header("Location: admin.php");
        exit();
    } else {
        // If the password is incorrect, show an error
        echo "<p>Incorrect password. Please try again.</p>";
    }
} else {
    // Redirect to login page if accessed directly
    header("Location: admin_login.html");
    exit();
}
?>
