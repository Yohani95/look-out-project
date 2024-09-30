/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Solo mantén esta configuración si es necesaria
      serverActions: false,
    },
  },
};

// Configuración de next-intl para la internacionalización
const withNextIntl = require('next-intl/plugin')('./i18n.js');

module.exports = withNextIntl(nextConfig);
