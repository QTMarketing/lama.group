# WordPress CMS Setup Guide

## 🚀 Quick Start

### 1. Install Docker Desktop
- Download from: https://www.docker.com/products/docker-desktop/
- Install and start Docker Desktop
- Verify installation: `docker --version`

### 2. Start WordPress CMS
```bash
cd cms
docker compose up -d
```

### 3. Access WordPress
- **Frontend**: http://localhost:8080
- **Admin**: http://localhost:8080/wp-admin
- **GraphQL**: http://localhost:8080/graphql

### 4. Default Login
- **Username**: `admin`
- **Password**: `password`

## 📝 Creating Properties

### 1. Go to WordPress Admin
- Visit: http://localhost:8080/wp-admin
- Login with admin/password

### 2. Create a Property
- Go to **Properties** → **Add New**
- Fill in the title and content
- Set featured image

### 3. Configure Property Details
In the **Property Details** meta box:
- **Address**: Street address
- **City**: City name
- **State**: State abbreviation
- **ZIP**: ZIP code
- **Size (Acres)**: Property size in acres
- **Highlights**: One highlight per line

### 4. Set Pricing
In the **Pricing** meta box:
- **Price**: Property price (number)
- **Currency**: USD, EUR, etc.
- **Price Visibility**: Public or Login Required

### 5. Add Contact Info
In the **Contact Info** meta box:
- **Name**: Contact person name
- **Email**: Contact email
- **Phone**: Contact phone
- **Contact Visibility**: Public or Login Required

### 6. Set Taxonomies
- **Deal Types**: Select "For Sale" or "For Lease"
- **Regions**: Select region (DFW, Houston, Austin)

### 7. Add Images
- **Hero Image**: Main property image
- **Gallery Images**: Up to 3 additional images

### 8. Publish
- Click **Publish** to make the property live

## 🔧 GraphQL Testing

### Test in GraphiQL
1. Visit: http://localhost:8080/graphql
2. Try this query:
```graphql
query TestProperties {
  properties(first: 5) {
    nodes {
      id
      title
      slug
      dealTypes {
        nodes {
          name
          slug
        }
      }
      regions {
        nodes {
          name
          slug
        }
      }
      acf: propertyFields {
        address
        city
        state
        price
        priceVisibility
        heroimage {
          url
          alt
        }
      }
    }
  }
}
```

## 🐛 Troubleshooting

### WordPress Not Starting
```bash
# Check if containers are running
docker ps

# View logs
docker compose logs

# Restart containers
docker compose down
docker compose up -d
```

### GraphQL Errors
- Check if WPGraphQL plugin is active
- Verify mu-plugin is loaded: `lama-core.php`
- Check WordPress error logs

### Next.js Connection Issues
- Verify `.env.local` has correct `WP_GRAPHQL_URL`
- Check if WordPress is accessible at http://localhost:8080
- Restart Next.js dev server: `npm run dev`

## 📁 File Structure
```
cms/
├── docker-compose.yml          # WordPress + MySQL setup
├── wp-content/
│   ├── mu-plugins/
│   │   └── lama-core.php      # Custom Property CPT + GraphQL
│   ├── plugins/
│   │   ├── wp-graphql/        # GraphQL API
│   │   └── wp-graphql-jwt-authentication/  # JWT Auth
│   └── themes/
│       └── twentytwentyfive/  # Default theme
```

## 🔐 Authentication Setup

### Create WordPress User
1. Go to **Users** → **Add New**
2. Set username and password
3. Assign role: **Administrator**, **Editor**, or **Member**
4. All these roles have `read_price` capability

### Test Login
- Use the WordPress credentials in Next.js login
- Should redirect back to current page after login
- Price/contact info should become visible

## 🎯 Next Steps

1. **Create Test Properties**: Add 5-10 sample properties
2. **Test Filters**: Try all filter combinations
3. **Test Authentication**: Login/logout flow
4. **Customize Styling**: Adjust colors, fonts, layout
5. **Add More Fields**: Extend ACF Free fields as needed

## 📞 Support

If you encounter issues:
1. Check Docker Desktop is running
2. Verify WordPress is accessible at http://localhost:8080
3. Check browser console for errors
4. Review WordPress error logs in Docker
