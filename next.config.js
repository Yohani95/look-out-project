/** @type {import('next').NextConfig} */
const nextConfig = {
  productionSourceMaps: true,
  devtool: 'source-map',
}

const withNextIntl = require('next-intl/plugin')(
    // This is the default (also the `src` folder is supported out of the box)
    './i18n.js'
  );
module.exports = withNextIntl({
    nextConfig,
  });
