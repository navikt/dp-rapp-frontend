/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  i18n: {
    locales: ['no', 'en'],
    defaultLocale: 'no',
    localeDetection: false
  },
};

module.exports = nextConfig;
