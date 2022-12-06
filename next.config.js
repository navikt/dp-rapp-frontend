/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  publicRuntimeConfig: {
    NAV_DEKORATOREN_ENV: process.env.NAV_DEKORATOREN_ENV || "prod",
  },
};

module.exports = nextConfig;
