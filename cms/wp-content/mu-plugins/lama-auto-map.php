<?php
/**
 * Plugin Name: LaMa Auto Map (Google Geocoding)
 * Description: On saving a Property, geocode the address and fill mapLat/mapLng/mapEmbedUrl automatically.
 */

add_action("acf/save_post", function ($post_id) {
  // Only for "property" post type.
  if (get_post_type($post_id) !== "property") return;

  // Compose address: use mapAddress if set; else combine address+city+state+zip.
  $mapAddress = get_field("mapAddress", $post_id);
  if (!$mapAddress) {
    $parts = array_filter([
      get_field("address", $post_id),
      get_field("city", $post_id),
      get_field("state", $post_id),
      get_field("zip", $post_id),
    ]);
    $mapAddress = implode(", ", $parts);
  }
  if (!$mapAddress) return;

  // API key from constant or env.
  $key = defined("LAMA_GOOGLE_MAPS_API_KEY") ? LAMA_GOOGLE_MAPS_API_KEY : getenv("GOOGLE_MAPS_API_KEY");
  if (!$key) return;

  // Avoid repeated lookups if nothing changed.
  $prev = get_post_meta($post_id, "_lama_prev_geocode_address", true);
  if ($prev === $mapAddress) return;

  $url = add_query_arg([
    "address" => $mapAddress,
    "key"     => $key,
  ], "https://maps.googleapis.com/maps/api/geocode/json");

  $res = wp_remote_get($url, ["timeout" => 8]);
  if (is_wp_error($res)) return;

  $code = wp_remote_retrieve_response_code($res);
  $body = json_decode(wp_remote_retrieve_body($res), true);
  if ($code !== 200 || empty($body["results"][0]["geometry"]["location"])) return;

  $loc = $body["results"][0]["geometry"]["location"];
  $lat = $loc["lat"];
  $lng = $loc["lng"];

  // Save fields.
  update_field("mapLat", $lat, $post_id);
  update_field("mapLng", $lng, $post_id);

  // Build Embed URL (Place by address).
  $embed = "https://www.google.com/maps/embed/v1/place?key=" . rawurlencode($key) . "&q=" . rawurlencode($mapAddress);
  update_field("mapEmbedUrl", $embed, $post_id);

  // Memoize address used.
  update_post_meta($post_id, "_lama_prev_geocode_address", $mapAddress);
}, 20);
