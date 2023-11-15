/** @type {import('next').NextConfig} */
const nextConfig = {
  productionSourceMaps: true,
  devtool: 'source-map',
  experimental: {
    serverActions: true,
  },
}

const withNextIntl = require('next-intl/plugin')(
    // This is the default (also the `src` folder is supported out of the box)
    './i18n.js'
  );
module.exports = withNextIntl({
    nextConfig,
  });
  const path = require('path');
  