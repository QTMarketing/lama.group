<?php
// --- Public user registration endpoint for headless signup ---
add_action('rest_api_init', function () {
  register_rest_route('lama/v1', '/register', [
    'methods'  => 'POST',
    'callback' => function (\WP_REST_Request $req) {
      // Verify API key first
      lama_verify_api_key();
      
      // Try to get parameters from both JSON body and form params
      $json_params = $req->get_json_params();
      $form_params = $req->get_params();
      
      $params = !empty($json_params) ? $json_params : $form_params;
      
      if (empty($params)) {
        return new \WP_REST_Response(['success' => false, 'error' => 'No data provided'], 400);
      }
      
      $email     = sanitize_email($params['email'] ?? '');
      $password  = (string) ($params['password'] ?? '');
      $username  = sanitize_user($params['username'] ?? '');

      if (!$email || !is_email($email)) {
        return new \WP_REST_Response(['success' => false, 'error' => 'Invalid email'], 400);
      }
      if (strlen($password) < 8) {
        return new \WP_REST_Response(['success' => false, 'error' => 'Password must be at least 8 characters'], 400);
      }

      if (email_exists($email)) {
        return new \WP_REST_Response(['success' => false, 'error' => 'Email already registered'], 400);
      }

      // Derive username from email if not provided
      if (!$username) {
        $base = sanitize_user(current(explode('@', $email)));
        $u = $base; $i = 1;
        while (username_exists($u)) { $u = $base . $i; $i++; }
        $username = $u;
      } else {
        if (username_exists($username)) {
          return new \WP_REST_Response(['success' => false, 'error' => 'Username already exists'], 400);
        }
      }

      $user_data = [
        'user_login' => $username,
        'user_email' => $email,
        'user_pass'  => $password, // WordPress will hash this automatically
        'role'       => 'member'
      ];

      $user_id = wp_insert_user($user_data);
      if (is_wp_error($user_id)) {
        return new \WP_REST_Response(['success' => false, 'error' => $user_id->get_error_message()], 400);
      }

      return new \WP_REST_Response(['success' => true, 'user_id' => $user_id], 201);
    },
    'permission_callback' => '__return_true',
    'args' => [
      'email' => [
        'required' => true,
        'type' => 'string',
        'format' => 'email'
      ],
      'password' => [
        'required' => true,
        'type' => 'string'
      ],
      'username' => [
        'required' => false,
        'type' => 'string'
      ]
    ]
  ]);
});

// --- OAuth sync endpoint: upsert Member user + set password (for Google SSO) ---
add_action('rest_api_init', function () {
  register_rest_route('lama/v1', '/oauth-sync', [
    'methods'  => 'POST',
    'callback' => function (\WP_REST_Request $req) {
      $secret = defined('LAMA_SSO_SECRET') ? constant('LAMA_SSO_SECRET') : null;
      if (!$secret) return new \WP_REST_Response(['ok'=>false,'error'=>'SSO secret not configured'], 500);

      $raw = $req->get_body();
      $sig = $req->get_header('x-lama-signature');
      $calc = base64_encode(hash_hmac('sha256', $raw, $secret, true));
      if (!hash_equals($calc, (string)$sig)) {
        return new \WP_REST_Response(['ok'=>false,'error'=>'Invalid signature'], 401);
      }

      $data = json_decode($raw, true);
      $email     = sanitize_email($data['email'] ?? '');
      $first     = sanitize_text_field($data['firstName'] ?? '');
      $last      = sanitize_text_field($data['lastName'] ?? '');
      $username  = sanitize_user($data['username'] ?? '');
      $password  = (string)($data['derivedPassword'] ?? '');

      if (!$email || !is_email($email) || !$password) {
        return new \WP_REST_Response(['ok'=>false,'error'=>'Missing/invalid fields'], 400);
      }

      $user_id = email_exists($email);
      if (!$user_id) {
        if (!$username) {
          $base = sanitize_user(current(explode('@', $email)));
          $username = $base; $i=1; while (username_exists($username)) { $username = $base.$i; $i++; }
        }
        $user_id = wp_create_user($username, $password, $email);
        if (is_wp_error($user_id)) {
          return new \WP_REST_Response(['ok'=>false,'error'=>$user_id->get_error_message()], 400);
        }
        $user = new \WP_User($user_id);
        $user->set_role('member');
      } else {
        $user = new \WP_User($user_id);
        if (!$user->has_cap('read_price')) { $user->add_role('member'); }
        wp_set_password($password, $user_id);
      }

      if ($first) update_user_meta($user_id, 'first_name', $first);
      if ($last)  update_user_meta($user_id, 'last_name', $last);

      return new \WP_REST_Response(['ok'=>true,'username'=>$user->user_login], 200);
    },
    'permission_callback' => '__return_true',
  ]);
});


