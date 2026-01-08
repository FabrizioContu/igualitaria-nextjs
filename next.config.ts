/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      root: __dirname,
    },
  },
    cacheComponents: true
};

export default nextConfig;
