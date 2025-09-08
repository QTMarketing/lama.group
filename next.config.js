/** @type {import('next').NextConfig} */
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
