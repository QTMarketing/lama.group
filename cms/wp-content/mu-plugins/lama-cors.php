<?php
/*
Plugin Name: LaMa REST CORS
Description: Adds CORS headers for headless REST access from Next.js (localhost:3000 by default).
Author: LaMa
Version: 1.0.0
*/

// Adjust this to your frontend origin for stricter security in production
$lama_allowed_origin = getenv('LAMA_FRONTEND_ORIGIN');
if (!$lama_allowed_origin) {
    $lama_allowed_origin = 'http://localhost:3000';
}

add_action('rest_api_init', function () use ($lama_allowed_origin) {
    // Allow preflight for all routes
    add_filter('rest_pre_serve_request', function ($served, $result, $request, $server) use ($lama_allowed_origin) {
        header('Access-Control-Allow-Origin: ' . $lama_allowed_origin);
        header('Vary: Origin');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, x-api-key');

        if ('OPTIONS' === $_SERVER['REQUEST_METHOD']) {
            // End preflight early
            status_header(200);
            return true;
        }
        return $served;
    }, 10, 4);
});


