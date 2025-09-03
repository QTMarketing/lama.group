<?php
/*
Plugin Name: LaMa Headless Auth Helper
Description: Defines shared API key and helper to verify x-api-key on custom REST routes.
Author: LaMa
Version: 1.0.0
*/

// Define the shared secret used between Next.js and WordPress.
// Prefer env var if available; otherwise hardcode fallback.
if (!defined('LAMA_HEADLESS_API_KEY')) {
    $env_key = getenv('LAMA_HEADLESS_API_KEY');
    if ($env_key && is_string($env_key)) {
        define('LAMA_HEADLESS_API_KEY', $env_key);
    } else {
        // Fallback to the key from your Next.js .env.local
        define('LAMA_HEADLESS_API_KEY', 'xJCigrQ3LjD26j3vM+xJtOCSCzl3BxUGoxyKS4/Fd9U=');
    }
}

if (!function_exists('lama_verify_api_key')) {
    function lama_verify_api_key() {
        // getallheaders is available on Apache; add fallback for CGI/FPM if needed
        if (!function_exists('getallheaders')) {
            $headers = [];
            foreach ($_SERVER as $name => $value) {
                if (substr($name, 0, 5) == 'HTTP_') {
                    $header = str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))));
                    $headers[$header] = $value;
                }
            }
        } else {
            $headers = getallheaders();
        }

        $provided = null;
        if (isset($headers['x-api-key'])) {
            $provided = $headers['x-api-key'];
        } elseif (isset($headers['X-Api-Key'])) {
            $provided = $headers['X-Api-Key'];
        } elseif (isset($headers['X-API-KEY'])) {
            $provided = $headers['X-API-KEY'];
        }

        if (!$provided || $provided !== LAMA_HEADLESS_API_KEY) {
            wp_send_json_error(['message' => 'Unauthorized'], 401);
            exit;
        }
    }
}


