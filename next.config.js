/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media-cldnry.s-nbcnews.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "logos-world.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "ciudaddecorrientes.gov.ar",
      },
      {
        protocol: "https",
        hostname: "canal12misiones.com",
      },
    ],
  },
};

module.exports = nextConfig;
