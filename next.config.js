/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  serverRuntimeConfig: {
    navDekoratorenEnv: process.env.NAV_DEKORATOREN_ENV,
  }
};

module.exports = nextConfig;
