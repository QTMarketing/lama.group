<?php /**
Plugin Name: LaMa Property Types
*/
add_action("init", function () {
register_post_type("property", [
"labels" => ["name"=>"Properties","singular_name"=>"Property"],
"public" => true,
"has_archive" => true,
"rewrite" => ["slug"=>"store-leasing","with_front"=>false],
"supports" => ["title","editor","thumbnail","excerpt","custom-fields"],
"show_in_rest" => true,
"show_in_graphql" => true,
"graphql_single_name" => "property",
"graphql_plural_name" => "properties",
]);
register_taxonomy("dealType", ["property"], [
"labels" => ["name"=>"Deal Types","singular_name"=>"Deal Type"],
"public" => true,
"rewrite" => ["slug"=>"deal-type","with_front"=>false],
"show_in_rest" => true,
"show_in_graphql" => true,
"graphql_single_name" => "dealType",
"graphql_plural_name" => "dealTypes",
]);

register_taxonomy("region", ["property"], [
"labels" => ["name"=>"Regions","singular_name"=>"Region"],
"public" => true,
"rewrite" => ["slug"=>"region","with_front"=>false],
"show_in_rest" => true,
"show_in_graphql" => true,
"graphql_single_name" => "region",
"graphql_plural_name" => "regions",
]);
});

// Add protected GraphQL fields for price and contact info
add_action('graphql_register_types', function () {
  register_graphql_field('Property', 'price', [
    'type' => 'Float',
    'description' => 'Property price (login required)',
    'resolve' => function ($post) {
      $post_id = is_object($post) && isset($post->databaseId) ? $post->databaseId : (isset($post->ID) ? $post->ID : 0);
      if ($post_id <= 0) return null;
      
      $visibility = get_post_meta($post_id, 'priceVisibility', true) ?: 'public';
      if ($visibility === 'login' && !current_user_can('read')) return null;
      
      return (float) get_post_meta($post_id, 'price', true);
    }
  ]);

  register_graphql_field('Property', 'priceVisibility', [
    'type' => 'String',
    'resolve' => function ($post) {
      $post_id = is_object($post) && isset($post->databaseId) ? $post->databaseId : (isset($post->ID) ? $post->ID : 0);
      return get_post_meta($post_id, 'priceVisibility', true) ?: 'public';
    }
  ]);

  register_graphql_field('Property', 'contactName', [
    'type' => 'String',
    'resolve' => function ($post) {
      $post_id = is_object($post) && isset($post->databaseId) ? $post->databaseId : (isset($post->ID) ? $post->ID : 0);
      if ($post_id <= 0) return null;
      
      $visibility = get_post_meta($post_id, 'contactVisibility', true) ?: 'public';
      if ($visibility === 'login' && !current_user_can('read')) return null;
      
      return get_post_meta($post_id, 'contactName', true);
    }
  ]);

  register_graphql_field('Property', 'contactPhone', [
    'type' => 'String',
    'resolve' => function ($post) {
      $post_id = is_object($post) && isset($post->databaseId) ? $post->databaseId : (isset($post->ID) ? $post->ID : 0);
      if ($post_id <= 0) return null;
      
      $visibility = get_post_meta($post_id, 'contactVisibility', true) ?: 'public';
      if ($visibility === 'login' && !current_user_can('read')) return null;
      
      return get_post_meta($post_id, 'contactPhone', true);
    }
  ]);

  register_graphql_field('Property', 'contactEmail', [
    'type' => 'String',
    'resolve' => function ($post) {
      $post_id = is_object($post) && isset($post->databaseId) ? $post->databaseId : (isset($post->ID) ? $post->ID : 0);
      if ($post_id <= 0) return null;
      
      $visibility = get_post_meta($post_id, 'contactVisibility', true) ?: 'public';
      if ($visibility === 'login' && !current_user_can('read')) return null;
      
      return get_post_meta($post_id, 'contactEmail', true);
    }
  ]);

  register_graphql_field('Property', 'contactVisibility', [
    'type' => 'String',
    'resolve' => function ($post) {
      $post_id = is_object($post) && isset($post->databaseId) ? $post->databaseId : (isset($post->ID) ? $post->ID : 0);
      return get_post_meta($post_id, 'contactVisibility', true) ?: 'public';
    }
  ]);
});
