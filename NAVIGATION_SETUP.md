# Navigation System Setup

## Overview
This document explains how to use the new navigation system that has been implemented across all pages.

## Components

### 1. TopNavBar
- **File**: `src/components/navigation/TopNavBar.tsx`
- **Purpose**: Displays the black banner with "Join LaMa Group in Supporting Children's Miracle Network Hospitals"
- **Usage**: Automatically included in all pages

### 2. MainNavBar
- **File**: `src/components/navigation/MainNavBar.tsx`
- **Purpose**: Main navigation with LaMa logo, navigation links, and Call Us button
- **Features**:
  - LaMa Group logo (SVG)
  - Navigation links: Home, Who We Are, Services, Store Leasing, Contact
  - Call Us button with phone confirmation dialog
- **Usage**: Automatically included in all pages

### 3. Footer
- **File**: `src/components/navigation/Footer.tsx`
- **Purpose**: Comprehensive footer with company information and legal links
- **Features**:
  - Company, Franchising, Careers, Services, Need Help sections
  - Legal links (Terms, Privacy, Texas Privacy, etc.)
  - Social media placeholders
- **Usage**: Automatically included in all pages

### 4. PageTemplate
- **File**: `src/components/templates/PageTemplate.tsx`
- **Purpose**: Reusable template for new pages
- **Usage**: Wrap your page content with this component

## How to Use

### For Existing Pages
The navigation components are already integrated into:
- ✅ Homepage (`src/components/LaMaLanding.tsx`)
- ✅ Store Leasing (`src/app/store-leasing/page.tsx`)
- ✅ Property Detail Pages (`src/app/leasing/[slug]/page.tsx`)

### For New Pages
Use the PageTemplate component:

```tsx
'use client';

import { PageTemplate } from '@/components/templates/PageTemplate';

export default function NewPage() {
  return (
    <PageTemplate>
      {/* Your page content here */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1>New Page Title</h1>
        <p>Your content goes here...</p>
      </div>
    </PageTemplate>
  );
}
```

### Manual Integration
If you prefer to add navigation manually:

```tsx
import { TopNavBar } from '@/components/navigation/TopNavBar';
import { MainNavBar } from '@/components/navigation/MainNavBar';
import { Footer } from '@/components/navigation/Footer';

export default function CustomPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopNavBar />
      <MainNavBar />
      
      {/* Your content */}
      <main>
        <h1>Page Content</h1>
      </main>
      
      <Footer />
    </div>
  );
}
```

## Font Updates

### H2 Tags
All `h2` tags now use the **Roboto-Medium.ttf** font with:
- Font size: 48px
- Letter spacing: 3px
- Line height: 56.7px

### Font Files
- **Roboto-Medium.ttf** is located in `public/fonts/`
- Added to `src/app/globals.css` with utility class `.font-roboto-medium`

## Benefits

1. **Consistency**: All pages now have identical navigation and footer
2. **Maintainability**: Changes to navigation only need to be made in one place
3. **Reusability**: Easy to add navigation to new pages
4. **Branding**: Consistent LaMa Group branding across all pages
5. **User Experience**: Familiar navigation structure throughout the site

## Future Updates

When you need to modify navigation:
1. Edit the component files in `src/components/navigation/`
2. Changes automatically apply to all pages
3. No need to update individual page files

## Notes

- All navigation components are client-side components (`'use client'`)
- The Call Us button includes a confirmation dialog before dialing
- Navigation links are properly configured for the current site structure
- Footer includes all necessary legal links and company information 