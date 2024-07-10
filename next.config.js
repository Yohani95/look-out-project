/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  //productionSourceMaps: true,
  //devtool: 'source-map',
};

const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./i18n.js"
);
module.exports = withNextIntl({
  // Configuración específica de Next.js incluyendo serverActions y límite de tamaño del cuerpo
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Ajusta el límite de tamaño del cuerpo según sea necesario
    },
    serverActions: true, // Habilita serverActions
  },
});
const path = require("path");
