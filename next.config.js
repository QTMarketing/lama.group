/** @type {import('next').NextConfig} */
const nextConfig = {
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
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "8080" },
      { protocol: "https", hostname: "localhost", port: "8080" },
      { protocol: "https", hostname: "*.ngrok-free.app" },
      { protocol: "https", hostname: "*.ngrok.io" },
      { protocol: "https", hostname: "lamagroup.com" },
      { protocol: "https", hostname: "www.lamagroup.com" },
      { protocol: "https", hostname: "secure.gravatar.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

module.exports = nextConfig;
