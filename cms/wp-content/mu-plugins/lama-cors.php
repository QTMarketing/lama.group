<?php
/*
Plugin Name: LaMa REST CORS
Description: Adds CORS headers for headless REST access from Next.js with multiple origin support.
Author: LaMa
Version: 2.0.0
*/

// phpcs:disable WordPress.Functions.DontExtract

// Handle CORS for all requests, not just REST API
add_action( 'init', function() {
    $allowed_origins = [
        'https://lama-group-website.vercel.app',
        'http://localhost:3000', // keep for local dev
    ];
    
    if ( isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins) ) {
        header( 'Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN'] );
        header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
        header( 'Access-Control-Allow-Credentials: true' );
        header( 'Access-Control-Allow-Headers: Authorization, Content-Type' );
        
        // Handle preflight OPTIONS requests
        if ( $_SERVER['REQUEST_METHOD'] === 'OPTIONS' ) {
            status_header( 200 );
            exit();
        }
    }
});

// Also handle REST API specifically
add_action( 'rest_api_init', function() {
    remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
    add_filter( 'rest_pre_serve_request', function( $value ) {
        $allowed_origins = [
            'https://lama-group-website.vercel.app',
            'http://localhost:3000', // keep for local dev
        ];
        if ( isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins) ) {
            header( 'Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN'] );
            header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
            header( 'Access-Control-Allow-Credentials: true' );
            header( 'Access-Control-Allow-Headers: Authorization, Content-Type' );
            
            // Handle preflight OPTIONS requests
            if ( $_SERVER['REQUEST_METHOD'] === 'OPTIONS' ) {
                status_header( 200 );
                exit();
            }
        }
        return $value;
    });
}, 15 );


