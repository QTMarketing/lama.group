# LaMa Group - Next.js Application

A modern corporate website built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Clean, professional design with custom animations
- **Authentication**: Firebase-based user authentication system
- **Performance**: Optimized for speed and SEO
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase
- **Icons**: Lucide React
- **UI Components**: Radix UI
- **Carousel**: Embla Carousel
- **Animations**: GSAP, AOS

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
├── context/            # React context providers
├── lib/                # Utility functions and configurations
└── types/              # TypeScript type definitions
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Connect your GitHub repository to Vercel
2. **Environment Variables**: Set Firebase configuration in Vercel dashboard
3. **Build Command**: `npm run build`
4. **Output Directory**: `.next`
5. **Install Command**: `npm install`

### Environment Variables

Create a `.env.local` file with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 📱 Pages

- **Home** (`/`) - Landing page with hero section
- **Services** (`/services`) - Service offerings with interactive cards
- **Contact** (`/contact`) - Contact form and information
- **About** (`/who-we-are`) - Company information
- **Store Leasing** (`/store-leasing`) - Leasing services
- **Leasing Details** (`/leasing/[slug]`) - Individual property pages
- **Authentication** (`/login`, `/signup`) - User authentication

## 🎨 Customization

### Colors
- **Primary Orange**: `#FF4D00`
- **Text Dark**: `#111111`
- **Text Gray**: `#4B5563`

### Fonts
- **Primary**: Inter (system fallback)
- **Secondary**: Montserrat, Oldschool Grotesk, Roboto

## 🔧 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📊 Performance

- **First Load JS**: ~99.7 kB
- **Homepage**: 13.1 kB
- **Services Page**: 5.54 kB
- **Optimized Images**: Responsive and optimized
- **Lazy Loading**: Components load on demand

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

Private - LaMa Group
