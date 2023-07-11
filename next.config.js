/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false, // build indicator on bottom-right corner
  },
  async redirects() {
    return [
      {
        source: '/_error',
        destination: '/people',
        permanent: true,
      },
      {
        source: '/',
        destination: '/people',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
