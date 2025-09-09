<?php
/*
Plugin Name: Lama CORS Allow
Description: Adds CORS headers for Next.js frontend.
Version: 1.0
*/
add_action('init', function() {
    // Allow only our front-end origin
    header('Access-Control-Allow-Origin: https://www.lama.group');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: x-api-key, Content-Type, Authorization');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        exit;
    }
});
