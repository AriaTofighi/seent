/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "seent.s3.amazonaws.com",
      "seent.s3.us-west-1.amazonaws.com",
      "https://seent.s3.amazonaws.com/",
      "https://seent.s3.us-west-1.amazonaws.com/",
    ],
  },
};

module.exports = nextConfig;
