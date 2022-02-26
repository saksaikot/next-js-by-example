const withPWA = require("next-pwa");
// const runtimeCaching = require("next-pwa/cache");
// const withOffline = require("next-offline");

const headers = async () => {
  return [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
      ],
    },
  ];
};
const config = {
  reactStrictMode: true,
  images: {
    deviceSizes: [320, 600, 750, 1080],
    domains: ["localhost", "127.0.0.1", "next-js-blog-backend.herokuapp.com"],
  },
  // pageExtensions: ["page.js", "page.jsx"],
  pwa: {
    dest: "public",
    // runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
    // swSrc: "service-worker.js",
    disable: process.env.NODE_ENV === "development",
  },
  headers,
  // experimental: {
  //   optimizeCss: true,
  // },

  // reactStrictMode: true,
};

module.exports = withPWA(config);
