/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development", // Disable PWA in development
  });
  
  const nextConfig = withPWA({
    reactStrictMode: true,
    swcMinify: true,
  });
  
  module.exports = nextConfig;
  