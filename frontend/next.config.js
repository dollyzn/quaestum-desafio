/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["avatars.githubusercontent.com", "avatar.vercel.sh"],
  },
};

module.exports = nextConfig;
