<?php
/**
 * Import properties into WordPress
 * Run this file via wp-cli: wp eval-file import-properties.php
 */

// Properties data
$properties = [
    // For Lease
    [
        'title' => '2606 Victory Dr., Marshall, TX 75672',
        'address' => '2606 Victory Dr.',
        'city' => 'Marshall',
        'state' => 'TX',
        'zip' => '75672',
        'deal_type' => 'for-lease',
        'size_sq_ft' => 1392,
        'price' => 1275,
        'currency' => 'USD',
        'contact_name' => 'Susanna',
        'contact_phone' => '817.618.0424',
        'contact_email' => 'susanna@quicktrackinc.com',
        'region' => 'dfw'
    ],
    [
        'title' => '6806 Sanger Ave, Waco TX 76710',
        'address' => '6806 Sanger Ave',
        'city' => 'Waco',
        'state' => 'TX',
        'zip' => '76710',
        'deal_type' => 'for-lease',
        'size_sq_ft' => 1800,
        'price' => 1650,
        'currency' => 'USD',
        'contact_name' => 'Susanna',
        'contact_phone' => '817.618.0424',
        'contact_email' => 'susanna@quicktrackinc.com',
        'region' => 'dfw'
    ],
    [
        'title' => '6808 Sanger Ave, Waco TX 76710',
        'address' => '6808 Sanger Ave',
        'city' => 'Waco',
        'state' => 'TX',
        'zip' => '76710',
        'deal_type' => 'for-lease',
        'size_sq_ft' => 960,
        'price' => 880,
        'currency' => 'USD',
        'contact_name' => 'Susanna',
        'contact_phone' => '817.618.0424',
        'contact_email' => 'susanna@quicktrackinc.com',
        'region' => 'dfw'
    ],
    [
        'title' => '6816 Sanger Ave, Waco TX 76710',
        'address' => '6816 Sanger Ave',
        'city' => 'Waco',
        'state' => 'TX',
        'zip' => '76710',
        'deal_type' => 'for-lease',
        'size_sq_ft' => 1200,
        'price' => 1100,
        'currency' => 'USD',
        'contact_name' => 'Susanna',
        'contact_phone' => '817.618.0424',
        'contact_email' => 'susanna@quicktrackinc.com',
        'region' => 'dfw'
    ],
    [
        'title' => '6828 Sanger Ave, Waco TX 76710',
        'address' => '6828 Sanger Ave',
        'city' => 'Waco',
        'state' => 'TX',
        'zip' => '76710',
        'deal_type' => 'for-lease',
        'size_sq_ft' => 1400,
        'price' => 1285,
        'currency' => 'USD',
        'contact_name' => 'Susanna',
        'contact_phone' => '817.618.0424',
        'contact_email' => 'susanna@quicktrackinc.com',
        'region' => 'dfw'
    ],
    [
        'title' => '8533 Camp Bowie W, Fort Worth, TX 76116',
        'address' => '8533 Camp Bowie W',
        'city' => 'Fort Worth',
        'state' => 'TX',
        'zip' => '76116',
        'deal_type' => 'for-lease',
        'size_sq_ft' => 1300,
        'price' => 1195,
        'currency' => 'USD',
        'contact_name' => 'Susanna',
        'contact_phone' => '817.618.0424',
        'contact_email' => 'susanna@quicktrackinc.com',
        'region' => 'dfw'
    ],
    [
        'title' => '8545 Camp Bowie W, Fort Worth, TX 76116',
        'address' => '8545 Camp Bowie W',
        'city' => 'Fort Worth',
        'state' => 'TX',
        'zip' => '76116',
        'deal_type' => 'for-lease',
        'size_sq_ft' => 800,
        'price' => 1000,
        'currency' => 'USD',
        'contact_name' => 'Susanna',
        'contact_phone' => '817.618.0424',
        'contact_email' => 'susanna@quicktrackinc.com',
        'region' => 'dfw'
    ],
    [
        'title' => '3421 Cimarron Trail Suite 105, Fort Worth, TX 76116',
        'address' => '3421 Cimarron Trail Suite 105',
        'city' => 'Fort Worth',
        'state' => 'TX',
        'zip' => '76116',
        'deal_type' => 'for-lease',
        'size_sq_ft' => 2000,
        'price' => 1850,
        'currency' => 'USD',
        'contact_name' => 'Susanna',
        'contact_phone' => '817.618.0424',
        'contact_email' => 'susanna@quicktrackinc.com',
        'region' => 'dfw'
    ],
    [
        'title' => '3421 Cimmaron Trail Suite 117, Fort Worth, TX 76116',
        'address' => '3421 Cimmaron Trail Suite 117',
        'city' => 'Fort Worth',
        'state' => 'TX',
        'zip' => '76116',
        'deal_type' => 'for-lease',
        'size_sq_ft' => 3300,
        'price' => 3025,
        'currency' => 'USD',
        'contact_name' => 'Susanna',
        'contact_phone' => '817.618.0424',
        'contact_email' => 'susanna@quicktrackinc.com',
        'region' => 'dfw'
    ],
    // For Sale
    [
        'title' => '1001 S. Morgan St Granbury, TX 76048',
        'address' => '1001 S. Morgan St',
        'city' => 'Granbury',
        'state' => 'TX',
        'zip' => '76048',
        'deal_type' => 'for-sale',
        'sizeAcres' => 0.31,
        'price' => 650000,
        'currency' => 'USD',
        'contact_name' => 'Susanna',
        'contact_phone' => '817.618.0424',
        'contact_email' => 'susanna@quicktrackinc.com',
        'region' => 'dfw'
    ],
    [
        'title' => '403 S Greer Blvd, Pitsburg, TX 75686',
        'address' => '403 S Greer Blvd',
        'city' => 'Pitsburg',
        'state' => 'TX',
        'zip' => '75686',
        'deal_type' => 'for-sale',
        'sizeAcres' => 0.50,
        'price' => 800000,
        'currency' => 'USD',
        'contact_name' => 'Susanna',
        'contact_phone' => '817.618.0424',
        'contact_email' => 'susanna@quicktrackinc.com',
        'region' => 'dfw'
    ],
    [
        'title' => '4113 Mansfield Hwy, Fort Worth, TX 76119 (Zoned E Commercial)',
        'address' => '4113 Mansfield Hwy',
        'city' => 'Fort Worth',
        'state' => 'TX',
        'zip' => '76119',
        'deal_type' => 'for-sale',
        'sizeAcres' => 1.30,
        'price' => 700000,
        'currency' => 'USD',
        'contact_name' => 'Susanna',
        'contact_phone' => '817.618.0424',
        'contact_email' => 'susanna@quicktrackinc.com',
        'region' => 'dfw',
        'content' => 'Zoned E Commercial'
    ],
    [
        'title' => '704 Bonham St., Paris, TX 75460',
        'address' => '704 Bonham St.',
        'city' => 'Paris',
        'state' => 'TX',
        'zip' => '75460',
        'deal_type' => 'for-sale',
        'sizeAcres' => 0.28,
        'price' => 400000,
        'currency' => 'USD',
        'contact_name' => 'Susanna',
        'contact_phone' => '817.618.0424',
        'contact_email' => 'susanna@quicktrackinc.com',
        'region' => 'dfw'
    ],
    [
        'title' => '3105 - 3145 Lackland Rd., Fort Worth, TX 76116',
        'address' => '3105 - 3145 Lackland Rd.',
        'city' => 'Fort Worth',
        'state' => 'TX',
        'zip' => '76116',
        'deal_type' => 'for-sale',
        'sizeAcres' => 2.04,
        'price' => 2100000,
        'currency' => 'USD',
        'contact_name' => 'Susanna',
        'contact_phone' => '817.618.0424',
        'contact_email' => 'susanna@quicktrackinc.com',
        'region' => 'dfw'
    ]
];

foreach ($properties as $property) {
    // Create the post
    $post_id = wp_insert_post([
        'post_title' => $property['title'],
        'post_content' => $property['content'] ?? '',
        'post_status' => 'publish',
        'post_type' => 'property'
    ]);
    
    if (!is_wp_error($post_id)) {
        // Set deal type taxonomy
        wp_set_object_terms($post_id, $property['deal_type'], 'dealtype');
        
        // Set region taxonomy  
        wp_set_object_terms($post_id, $property['region'], 'region');
        
        // Set meta fields
        update_post_meta($post_id, 'address', $property['address']);
        update_post_meta($post_id, 'city', $property['city']);
        update_post_meta($post_id, 'state', $property['state']);
        update_post_meta($post_id, 'zip', $property['zip']);
        update_post_meta($post_id, 'price', $property['price']);
        update_post_meta($post_id, 'currency', $property['currency']);
        update_post_meta($post_id, 'contact_name', $property['contact_name']);
        update_post_meta($post_id, 'contact_phone', $property['contact_phone']);
        update_post_meta($post_id, 'contact_email', $property['contact_email']);
        update_post_meta($post_id, 'priceVisibility', 'public');
        update_post_meta($post_id, 'contactVisibility', 'public');
        
        // Set size based on property type
        if (isset($property['size_sq_ft'])) {
            // Convert sq ft to acres for consistency (1 acre = 43,560 sq ft)
            $acres = $property['size_sq_ft'] / 43560;
            update_post_meta($post_id, 'sizeAcres', $acres);
        } elseif (isset($property['sizeAcres'])) {
            update_post_meta($post_id, 'sizeAcres', $property['sizeAcres']);
        }
        
        echo "Created property: {$property['title']} (ID: $post_id)\n";
    } else {
        echo "Error creating property: {$property['title']}\n";
    }
}

echo "Import complete!\n";
?>