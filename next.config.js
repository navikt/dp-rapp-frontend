/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  i18n: {
    locales: ['nb', 'en'],
    defaultLocale: 'nb',
    localeDetection: false
  },
};

module.exports = nextConfig;
