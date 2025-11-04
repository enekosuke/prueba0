/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['images.unsplash.com', 'cdn.sanity.io'],
  },
  experimental: {
    optimizeCss: true
  }
};

module.exports = nextConfig;
