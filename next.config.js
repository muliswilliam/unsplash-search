/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  env: {
    UNSPLASH_KEY: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  },
}

module.exports = nextConfig
