<?php
/**
 * Plugin Name: Lama Core
 * Description: Property CPT + gated price via WPGraphQL
 */

// Create a "member" role and a capability for viewing price.
add_action('init', function () {
  if (!get_role('member')) {
    add_role('member', 'Member', ['read' => true]);
  }
  foreach (['administrator','editor','member'] as $r) {
    if ($role = get_role($r)) $role->add_cap('read_price');
  }
});

// Register Property post type.
add_action('init', function () {
  register_post_type('property', [
    'label' => 'Properties',
    'public' => true,
    'supports' => ['title','editor','thumbnail'],
    'has_archive' => true,
    'show_in_rest' => true,
    'show_in_graphql' => true,
    'graphql_single_name' => 'Property',
    'graphql_plural_name' => 'Properties',
  ]);
});

// Meta for price/currency + simple meta box.
add_action('init', function () {
  register_post_meta('property', 'price', [
    'type' => 'number',
    'single' => true,
    'show_in_rest' => true,
    'sanitize_callback' => function($v){ return is_numeric($v) ? $v : null; },
  ]);
  register_post_meta('property', 'currency', [
    'type' => 'string',
    'single' => true,
    'show_in_rest' => true,
    'sanitize_callback' => 'sanitize_text_field',
  ]);
});

add_action('add_meta_boxes', function () {
  add_meta_box('property_pricing', 'Pricing', function($post){
    $price = get_post_meta($post->ID, 'price', true);
    $currency = get_post_meta($post->ID, 'currency', true) ?: 'EUR';
    ?>
      <p>
        <label>Price</label><br/>
        <input type="number" step="0.01" name="lama_price" value="<?php echo esc_attr($price); ?>" />
      </p>
      <p>
        <label>Currency</label><br/>
        <input type="text" name="lama_currency" value="<?php echo esc_attr($currency); ?>" />
      </p>
    <?php
  }, 'property', 'side', 'high');
});

add_action('save_post_property', function ($post_id) {
  if (array_key_exists('lama_price', $_POST)) {
    update_post_meta($post_id, 'price', $_POST['lama_price']);
  }
  if (array_key_exists('lama_currency', $_POST)) {
    update_post_meta($post_id, 'currency', sanitize_text_field($_POST['lama_currency']));
  }
});

// Protected GraphQL fields (null unless user can read_price).
add_action('graphql_register_types', function () {
  register_graphql_field('Property', 'price', [
    'type' => 'Float',
    'description' => 'Visible only to users with read_price capability.',
    'resolve' => function ($post) {
      $post_id = 0;
      if (is_object($post) && isset($post->ID)) {
        $post_id = (int) $post->ID;
      } elseif (is_object($post) && isset($post->databaseId)) {
        $post_id = (int) $post->databaseId;
      } elseif (is_array($post) && isset($post['ID'])) {
        $post_id = (int) $post['ID'];
      }
      if ($post_id <= 0) {
        return null;
      }
      return current_user_can('read_price') ? (float) get_post_meta($post_id, 'price', true) : null;
    }
  ]);

  register_graphql_field('Property', 'currency', [
    'type' => 'String',
    'resolve' => function ($post) {
      $post_id = 0;
      if (is_object($post) && isset($post->ID)) {
        $post_id = (int) $post->ID;
      } elseif (is_object($post) && isset($post->databaseId)) {
        $post_id = (int) $post->databaseId;
      } elseif (is_array($post) && isset($post['ID'])) {
        $post_id = (int) $post['ID'];
      }
      if ($post_id <= 0) {
        return null;
      }
      return current_user_can('read_price') ? (string) get_post_meta($post_id, 'currency', true) : null;
    }
  ]);
});


