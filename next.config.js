/** @type {import('next').NextConfig} */

// Debug environment variables
console.log('ENV ↓');
console.log('NEXT_PUBLIC_CMS_URL:', process.env.NEXT_PUBLIC_CMS_URL);
console.log('NEXT_PUBLIC_WP_API:', process.env.NEXT_PUBLIC_WP_API);
console.log('WP_GRAPHQL_URL:', process.env.WP_GRAPHQL_URL);
console.log('NEXT_PUBLIC_WP_HEADLESS_API_KEY:', process.env.NEXT_PUBLIC_WP_HEADLESS_API_KEY ? '***SET***' : 'UNDEFINED');

const nextConfig = {
  reactStrictMode: true,

  // Remote images:
  images: {
    remotePatterns: [
      // local dev
      { protocol: 'http',  hostname: 'localhost', port: '8080', pathname: '/**' },
      // production CMS
      { protocol: 'https', hostname: 'cms.lama.group',   pathname: '/**' },
      // if you ever use your Vercel domain for images
      { protocol: 'https', hostname: 'lama-group-website.vercel.app', pathname: '/**' },
      // common external sources
      { protocol: 'https', hostname: 'secure.gravatar.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ]
  },

  // Your existing redirects
  async redirects() {
    return [
      {
        source: '/about-us',
        destination: '/who-we-are',
        permanent: true,
      },
      {
        source: "/auth",
        has: [{ type: "query", key: "mode", value: "login" }],
        destination: "/login",
        permanent: false,
      },
      {
        source: "/auth",
        has: [{ type: "query", key: "mode", value: "signup" }],
        destination: "/signup",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
