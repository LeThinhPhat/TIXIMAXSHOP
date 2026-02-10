/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.tgdd.vn",
      },
      {
        protocol: "https",
        hostname: "image.uniqlo.com",
      },
      {
        protocol: "https",
        hostname: "static.nike.com",
      },
    ],
  },
};

module.exports = nextConfig;
