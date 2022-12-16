/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  env: {
    navDekoratorenEnv: process.env.NAV_DEKORATOREN_ENV,
  }
};

module.exports = nextConfig;
