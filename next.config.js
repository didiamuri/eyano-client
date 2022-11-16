/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");
const { i18n } = require('./next-i18next.config');

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: process.env.NODE_ENV === "development",
})

module.exports = withPWA({
  reactStrictMode: true,
  i18n,
  images: {
    domains: ['api.umojafunding.com', 'beta.umojafunding.com'],
  }
});
