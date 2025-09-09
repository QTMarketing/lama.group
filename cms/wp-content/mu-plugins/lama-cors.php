<?php
/*
Plugin Name: LaMa REST CORS
Description: Adds CORS headers for headless REST access from Next.js with multiple origin support.
Author: LaMa
Version: 2.1.0
*/

// phpcs:disable WordPress.Functions.DontExtract

// Debug: Log that the plugin is loading
error_log('LAMA CORS Plugin: Loading...');

// Handle CORS for all requests - use send_headers for early execution
add_action( 'send_headers', function() {
    $allowed_origins = [
        'https://www.lama.group',
        'https://lama-group-website.vercel.app',
        'http://localhost:3000', // keep for local dev
    ];
    
    error_log('LAMA CORS: Checking origin: ' . ($_SERVER['HTTP_ORIGIN'] ?? 'none'));
    
    if ( isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins) ) {
        error_log('LAMA CORS: Origin allowed, setting headers');
        header( 'Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN'] );
        header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
        header( 'Access-Control-Allow-Credentials: true' );
        header( 'Access-Control-Allow-Headers: Authorization, Content-Type, x-api-key, X-API-KEY, x-lama-api-key, X-LAMA-API-KEY, X-Requested-With' );
        
        // Handle preflight OPTIONS requests
        if ( $_SERVER['REQUEST_METHOD'] === 'OPTIONS' ) {
            error_log('LAMA CORS: Handling OPTIONS request');
            status_header( 200 );
            exit();
        }
    } else {
        error_log('LAMA CORS: Origin not allowed or not set');
    }
});

// Also handle REST API specifically
add_action( 'rest_api_init', function() {
    error_log('LAMA CORS: REST API init hook triggered');
    remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
    add_filter( 'rest_pre_serve_request', function( $value ) {
        $allowed_origins = [
            'https://www.lama.group',
            'https://lama-group-website.vercel.app',
            'http://localhost:3000', // keep for local dev
        ];
        
        error_log('LAMA CORS REST: Checking origin: ' . ($_SERVER['HTTP_ORIGIN'] ?? 'none'));
        
        if ( isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins) ) {
            error_log('LAMA CORS REST: Origin allowed, setting headers');
            header( 'Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN'] );
            header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
            header( 'Access-Control-Allow-Credentials: true' );
            header( 'Access-Control-Allow-Headers: Authorization, Content-Type, x-api-key, X-API-KEY, x-lama-api-key, X-LAMA-API-KEY, X-Requested-With' );
            
            // Handle preflight OPTIONS requests
            if ( $_SERVER['REQUEST_METHOD'] === 'OPTIONS' ) {
                error_log('LAMA CORS REST: Handling OPTIONS request');
                status_header( 200 );
                exit();
            }
        } else {
            error_log('LAMA CORS REST: Origin not allowed or not set');
        }
        return $value;
    });
}, 15 );

