<?php
if (function_exists('acf_get_field_groups')) {
  $groups = acf_get_field_groups();
  foreach($groups as $group) {
    echo $group['title'] . "\n";
    $fields = acf_get_fields($group);
    foreach($fields as $field) {
      if (strpos($field['name'], 'map') !== false) {
        echo "  " . $field['name'] . " - " . $field['label'] . "\n";
      }
    }
  }
} else {
  echo "ACF not loaded\n";
}
?>