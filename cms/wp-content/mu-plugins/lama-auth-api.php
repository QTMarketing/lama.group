<?php
/**
 * Plugin Name: LaMa Custom Auth API
 * Description: Custom authentication endpoints for headless WordPress
 * Version: 1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class LamaAuthAPI {
    
    public function __construct() {
        add_action('rest_api_init', [$this, 'register_routes']);
        add_action('init', [$this, 'create_otp_table']);
    }
    
    public function register_routes() {
        $namespace = 'lama/v1/auth';
        
        // Password login
        register_rest_route($namespace, '/password-login', [
            'methods'  => 'POST',
            'callback' => [$this, 'password_login'],
            'permission_callback' => '__return_true',
        ]);
        
        // OTP request
        register_rest_route($namespace, '/request-otp', [
            'methods'  => 'POST',
            'callback' => [$this, 'request_otp'],
            'permission_callback' => '__return_true',
        ]);
        
        // OTP verify
        register_rest_route($namespace, '/verify-otp', [
            'methods'  => 'POST',
            'callback' => [$this, 'verify_otp'],
            'permission_callback' => '__return_true',
        ]);
        
        // User upsert
        register_rest_route($namespace, '/upsert', [
            'methods'  => 'POST',
            'callback' => [$this, 'upsert_user'],
            'permission_callback' => '__return_true',
        ]);
        
        // Forgot password
        register_rest_route($namespace, '/forgot', [
            'methods'  => 'POST',
            'callback' => [$this, 'forgot_password'],
            'permission_callback' => '__return_true',
        ]);
        
        // Reset password
        register_rest_route($namespace, '/reset', [
            'methods'  => 'POST',
            'callback' => [$this, 'reset_password'],
            'permission_callback' => '__return_true',
        ]);
    }
    
    public function create_otp_table() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'lama_otp_codes';
        
        $charset_collate = $wpdb->get_charset_collate();
        
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            email varchar(100) NOT NULL,
            code varchar(10) NOT NULL,
            expires_at datetime NOT NULL,
            used tinyint(1) DEFAULT 0,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY email (email),
            KEY expires_at (expires_at)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
    
    public function password_login(WP_REST_Request $request) {
        // Verify API key for security
        if (function_exists('lama_verify_api_key')) {
            lama_verify_api_key();
        }
        
        $data = $request->get_json_params();
        
        $login = sanitize_text_field($data['login'] ?? '');
        $password = $data['password'] ?? '';
        
        if (!$login || !$password) {
            return new WP_REST_Response([
                'success' => false,
                'code' => 'missing_credentials',
                'message' => 'Login and password are required'
            ], 400);
        }
        
        // Try to find user by username first, then email
        $user = get_user_by('login', $login) ?: get_user_by('email', $login);
        
        if (!$user) {
            return new WP_REST_Response([
                'success' => false,
                'code' => 'invalid_credentials',
                'message' => 'Invalid username or password'
            ], 401);
        }
        
        // Verify password using WordPress function
        if (!wp_check_password($password, $user->user_pass)) {
            return new WP_REST_Response([
                'success' => false,
                'code' => 'invalid_credentials',
                'message' => 'Invalid username or password'
            ], 401);
        }
        
        return new WP_REST_Response([
            'success' => true,
            'user' => [
                'id' => $user->ID,
                'email' => $user->user_email,
                'username' => $user->user_login,
                'name' => $user->display_name
            ]
        ], 200);
    }
    
    public function request_otp(WP_REST_Request $request) {
        $data = $request->get_json_params();
        $email = sanitize_email($data['email'] ?? '');
        
        if (!$email) {
            return new WP_REST_Response(['error' => 'Email is required'], 400);
        }
        
        // Generate 6-digit OTP
        $otp = sprintf('%06d', mt_rand(100000, 999999));
        
        // Store OTP in database (expires in 10 minutes)
        global $wpdb;
        $table_name = $wpdb->prefix . 'lama_otp_codes';
        
        $wpdb->insert($table_name, [
            'email' => $email,
            'code' => $otp,
            'expires_at' => date('Y-m-d H:i:s', time() + 600) // 10 minutes
        ]);
        
        // Send email (using WordPress wp_mail)
        $subject = 'Your Login Code';
        $message = "Your login code is: $otp\n\nThis code expires in 10 minutes.";
        
        $sent = wp_mail($email, $subject, $message);
        
        if (!$sent) {
            return new WP_REST_Response(['error' => 'Failed to send OTP email'], 500);
        }
        
        return new WP_REST_Response([
            'success' => true,
            'message' => 'OTP sent to your email'
        ], 200);
    }
    
    public function verify_otp(WP_REST_Request $request) {
        $data = $request->get_json_params();
        $email = sanitize_email($data['email'] ?? '');
        $code = sanitize_text_field($data['code'] ?? '');
        
        if (!$email || !$code) {
            return new WP_REST_Response(['error' => 'Email and code are required'], 400);
        }
        
        global $wpdb;
        $table_name = $wpdb->prefix . 'lama_otp_codes';
        
        // Find valid OTP
        $otp_record = $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table_name WHERE email = %s AND code = %s AND used = 0 AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1",
            $email, $code
        ));
        
        if (!$otp_record) {
            return new WP_REST_Response(['error' => 'Invalid or expired OTP'], 401);
        }
        
        // Mark OTP as used
        $wpdb->update($table_name, ['used' => 1], ['id' => $otp_record->id]);
        
        // Find or create user
        $user = get_user_by('email', $email);
        if (!$user) {
            $user_id = wp_create_user($email, wp_generate_password(), $email);
            if (is_wp_error($user_id)) {
                return new WP_REST_Response(['error' => 'Failed to create user'], 500);
            }
            $user = get_user_by('ID', $user_id);
        }
        
        $token = $this->generate_jwt_token($user);
        
        return new WP_REST_Response([
            'success' => true,
            'token' => $token,
            'user' => [
                'id' => $user->ID,
                'email' => $user->user_email,
                'name' => $user->display_name,
                'roles' => $user->roles
            ]
        ], 200);
    }
    
    public function upsert_user(WP_REST_Request $request) {
        $data = $request->get_json_params();
        $email = sanitize_email($data['email'] ?? '');
        $name = sanitize_text_field($data['name'] ?? '');
        $phone = sanitize_text_field($data['phone'] ?? '');
        
        if (!$email) {
            return new WP_REST_Response(['error' => 'Email is required'], 400);
        }
        
        $user = get_user_by('email', $email);
        
        if ($user) {
            // Update existing user
            $user_data = ['ID' => $user->ID];
            if ($name) $user_data['display_name'] = $name;
            
            $result = wp_update_user($user_data);
            if (is_wp_error($result)) {
                return new WP_REST_Response(['error' => $result->get_error_message()], 500);
            }
            
            if ($phone) update_user_meta($user->ID, 'phone', $phone);
            
        } else {
            // Create new user
            $user_id = wp_create_user($email, wp_generate_password(), $email);
            if (is_wp_error($user_id)) {
                return new WP_REST_Response(['error' => $user_id->get_error_message()], 500);
            }
            
            if ($name) wp_update_user(['ID' => $user_id, 'display_name' => $name]);
            if ($phone) update_user_meta($user_id, 'phone', $phone);
            
            $user = get_user_by('ID', $user_id);
        }
        
        $token = $this->generate_jwt_token($user);
        
        return new WP_REST_Response([
            'success' => true,
            'token' => $token,
            'user' => [
                'id' => $user->ID,
                'email' => $user->user_email,
                'name' => $user->display_name,
                'phone' => get_user_meta($user->ID, 'phone', true),
                'roles' => $user->roles
            ]
        ], 200);
    }
    
    public function forgot_password(WP_REST_Request $request) {
        $data = $request->get_json_params();
        $email = sanitize_email($data['email'] ?? '');
        
        if (!$email) {
            return new WP_REST_Response(['error' => 'Email is required'], 400);
        }
        
        $user = get_user_by('email', $email);
        if (!$user) {
            return new WP_REST_Response(['error' => 'User not found'], 404);
        }
        
        // Generate reset key
        $reset_key = get_password_reset_key($user);
        if (is_wp_error($reset_key)) {
            return new WP_REST_Response(['error' => 'Failed to generate reset key'], 500);
        }
        
        // Send reset email
        $reset_url = network_site_url("wp-login.php?action=rp&key=$reset_key&login=" . rawurlencode($user->user_login), 'login');
        
        $subject = 'Password Reset Request';
        $message = "Someone has requested a password reset for your account.\n\n";
        $message .= "If this was you, click the link below to reset your password:\n";
        $message .= "$reset_url\n\n";
        $message .= "If you didn't request this, please ignore this email.";
        
        $sent = wp_mail($email, $subject, $message);
        
        if (!$sent) {
            return new WP_REST_Response(['error' => 'Failed to send reset email'], 500);
        }
        
        return new WP_REST_Response([
            'success' => true,
            'message' => 'Password reset email sent'
        ], 200);
    }
    
    public function reset_password(WP_REST_Request $request) {
        $data = $request->get_json_params();
        $email = sanitize_email($data['email'] ?? '');
        $key = sanitize_text_field($data['key'] ?? '');
        $password = $data['password'] ?? '';
        
        if (!$email || !$key || !$password) {
            return new WP_REST_Response(['error' => 'Email, key, and password are required'], 400);
        }
        
        $user = get_user_by('email', $email);
        if (!$user) {
            return new WP_REST_Response(['error' => 'User not found'], 404);
        }
        
        // Verify reset key
        $check = check_password_reset_key($key, $user->user_login);
        if (is_wp_error($check)) {
            return new WP_REST_Response(['error' => 'Invalid or expired reset key'], 401);
        }
        
        // Reset password
        wp_set_password($password, $user->ID);
        
        // Generate new auth token
        $token = $this->generate_jwt_token($user);
        
        return new WP_REST_Response([
            'success' => true,
            'message' => 'Password reset successfully',
            'token' => $token,
            'user' => [
                'id' => $user->ID,
                'email' => $user->user_email,
                'name' => $user->display_name,
                'roles' => $user->roles
            ]
        ], 200);
    }
    
    private function generate_jwt_token($user) {
        // Use the same JWT structure as WPGraphQL
        $secret_key = defined('GRAPHQL_JWT_AUTH_SECRET_KEY') ? GRAPHQL_JWT_AUTH_SECRET_KEY : 'your-secret-key';
        
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload = json_encode([
            'iss' => get_site_url(),
            'iat' => time(),
            'nbf' => time(),
            'exp' => time() + (7 * 24 * 60 * 60), // 7 days
            'data' => [
                'user' => [
                    'id' => (string) $user->ID
                ]
            ]
        ]);
        
        $header_encoded = $this->base64url_encode($header);
        $payload_encoded = $this->base64url_encode($payload);
        
        $signature = hash_hmac('sha256', $header_encoded . '.' . $payload_encoded, $secret_key, true);
        $signature_encoded = $this->base64url_encode($signature);
        
        return $header_encoded . '.' . $payload_encoded . '.' . $signature_encoded;
    }
    
    private function base64url_encode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }
    
    private function send_otp_email($email, $otp) {
        $subject = 'Your Login Code';
        $message = "Your login code is: $otp\n\nThis code expires in 10 minutes.";
        return wp_mail($email, $subject, $message);
    }
}

// Initialize the auth API
new LamaAuthAPI();
?>