/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["seent.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
