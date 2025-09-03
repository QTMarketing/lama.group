<?php
/**
 * Plugin Name: LaMa Partnership Dealer Form API
 * Description: Registers a CPT and REST endpoint to store Partnership_Dealer Opportunities Form submissions.
 * Author: LaMa
 */

if ( ! defined( 'ABSPATH' ) ) {
  exit;
}

// Register custom post type to store submissions
add_action('init', function() {
  register_post_type('partner_form', [
    'label' => 'Partner Forms',
    'public' => false,
    'show_ui' => true,
    'show_in_menu' => true,
    'supports' => ['title', 'editor', 'custom-fields'],
  ]);
});

// Register REST endpoint
add_action('rest_api_init', function() {
  register_rest_route('lama/v1', '/partner-form', [
    'methods'  => 'POST',
    'callback' => function( WP_REST_Request $request ) {
      $data = $request->get_json_params();

      if (!is_array($data)) {
        return new WP_REST_Response(['error' => 'Invalid payload'], 400);
      }

      $name = sanitize_text_field($data['name'] ?? '');
      if ($name === '') {
        return new WP_REST_Response(['error' => 'Name is required'], 400);
      }

      $title = 'Partner Form — ' . $name . ' — ' . current_time('mysql');
      $content = wp_kses_post(json_encode($data, JSON_PRETTY_PRINT));

      $post_id = wp_insert_post([
        'post_type'   => 'partner_form',
        'post_status' => 'publish',
        'post_title'  => $title,
        'post_content'=> $content,
      ], true);

      if (is_wp_error($post_id)) {
        return new WP_REST_Response(['error' => $post_id->get_error_message()], 500);
      }

      // Also save raw fields as post meta for convenience
      foreach ($data as $key => $value) {
        if (is_scalar($value)) {
          update_post_meta($post_id, sanitize_key($key), sanitize_text_field((string)$value));
        } else {
          update_post_meta($post_id, sanitize_key($key), wp_json_encode($value));
        }
      }

      return new WP_REST_Response(['ok' => true, 'id' => $post_id], 201);
    },
    'permission_callback' => '__return_true', // NOTE: consider adding auth later
  ]);
});


