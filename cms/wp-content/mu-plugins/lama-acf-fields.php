<?php /**
Plugin Name: LaMa Property Fields (ACF Free)
*/
add_action("acf/init", function () {
if (!function_exists("acf_add_local_field_group")) return;
acf_add_local_field_group([
"key" => "group_property_fields",
"title" => "Property Fields",
"show_in_graphql" => 1,
"graphql_field_name" => "propertyFields",
"location" => [[["param"=>"post_type","operator"=>"==","value"=>"property"]]],
"fields" => [
["key"=>"field_address","label"=>"Address","name"=>"address","type"=>"text"],
["key"=>"field_city","label"=>"City","name"=>"city","type"=>"text"],
["key"=>"field_state","label"=>"State","name"=>"state","type"=>"text"],
["key"=>"field_zip","label"=>"Zip","name"=>"zip","type"=>"text"],
["key"=>"field_sizeacres","label"=>"Size (acres)","name"=>"sizeAcres","type"=>"number","step"=>0.01],
["key"=>"field_sizesqft","label"=>"Size (sq ft)","name"=>"sizeSqft","type"=>"number"],
["key"=>"field_price","label"=>"Price","name"=>"price","type"=>"number"],
["key"=>"field_price_visibility","label"=>"Price Visibility","name"=>"priceVisibility","type"=>"select","choices"=>["public"=>"Public","login"=>"Login"],"default_value"=>"login","return_format"=>"value"],

["key"=>"field_contact_name","label"=>"Contact Name","name"=>"contactName","type"=>"text"],
["key"=>"field_contact_phone","label"=>"Contact Phone","name"=>"contactPhone","type"=>"text"],
["key"=>"field_contact_email","label"=>"Contact Email","name"=>"contactEmail","type"=>"email"],
["key"=>"field_contact_visibility","label"=>"Contact Visibility","name"=>"contactVisibility","type"=>"select","choices"=>["public"=>"Public","login"=>"Login"],"default_value"=>"login","return_format"=>"value"],

["key"=>"field_heroimage","label"=>"Hero Image","name"=>"heroimage","type"=>"image","return_format"=>"array","preview_size"=>"medium"],
["key"=>"field_galleryimage1","label"=>"Gallery Image 1","name"=>"galleryimage1","type"=>"image","return_format"=>"array"],
["key"=>"field_galleryimage2","label"=>"Gallery Image 2","name"=>"galleryimage2","type"=>"image","return_format"=>"array"],
["key"=>"field_galleryimage3","label"=>"Gallery Image 3","name"=>"galleryimage3","type"=>"image","return_format"=>"array"],

["key"=>"field_highlights_text","label"=>"Highlights (one per line)","name"=>"highlightsText","type"=>"textarea"],
["key"=>"field_amenities_text","label"=>"Amenities (one per line)","name"=>"amenitiesText","type"=>"textarea"],

["key"=>"field_property_type","label"=>"Property Type","name"=>"propertyType","type"=>"text"],
["key"=>"field_zoning","label"=>"Zoning","name"=>"zoning","type"=>"text"],
["key"=>"field_status","label"=>"Status","name"=>"status","type"=>"text"],

["key"=>"field_map_address","label"=>"Map Address","name"=>"mapAddress","type"=>"text"],
["key"=>"field_map_lat","label"=>"Map Latitude","name"=>"mapLat","type"=>"text"],
["key"=>"field_map_lng","label"=>"Map Longitude","name"=>"mapLng","type"=>"text"],
["key"=>"field_map_embed_url","label"=>"Map Embed URL","name"=>"mapEmbedUrl","type"=>"text"],
],
]);
});
?>
