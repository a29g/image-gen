/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["1000logos.net", "imggenerator4a48c9d.blob.core.windows.net"],
  },
};

module.exports = nextConfig;
