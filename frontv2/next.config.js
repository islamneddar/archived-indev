/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {runtime: 'edge'},
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/blog/home',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/blog/home',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
