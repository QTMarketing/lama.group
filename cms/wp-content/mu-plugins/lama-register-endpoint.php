<?php
/*
Plugin Name: LaMa Register Endpoint
Description: Provides a protected REST endpoint to register users from Next.js.
Author: LaMa
Version: 1.0.0
*/

if (!function_exists('lama_register_user')) {
    function lama_register_user(\WP_REST_Request $request) {
        if (function_exists('lama_verify_api_key')) {
            lama_verify_api_key();
        }

        $username = sanitize_user($request->get_param('username'));
        $email    = sanitize_email($request->get_param('email'));
        $password = $request->get_param('password');

        if (empty($username) || empty($email) || empty($password)) {
            return new \WP_Error('invalid_params', 'Missing required fields', ['status' => 400]);
        }

        if (username_exists($username) || email_exists($email)) {
            return new \WP_REST_Response([
                'success' => false,
                'code' => 'account_exists',
                'message' => 'Account already exists'
            ], 400);
        }

        $user_id = wp_insert_user([
            'user_login' => $username,
            'user_email' => $email,
            'user_pass'  => $password,
        ]);

        if (is_wp_error($user_id)) {
            return $user_id;
        }

        return [
            'success' => true,
            'user_id' => $user_id,
        ];
    }
}

add_action('rest_api_init', function () {
    register_rest_route('lama/v1', '/register', [
        'methods'  => 'POST',
        'callback' => 'lama_register_user',
        'permission_callback' => '__return_true',
    ]);
});


