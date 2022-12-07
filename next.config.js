/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  publicRuntimeConfig: {
    NAV_DEKORATOREN_ENV: process.env.NAV_DEKORATOREN_ENV,
  },
  serverRuntimeConfig: {
    DP_RAPP_API_URL: process.env.DP_RAPP_API_URL,
  },
};

module.exports = nextConfig;
