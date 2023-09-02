/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/blog/explore',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/blog/explore',
        permanent: true,
      },
      {
        source: '/blog/home',
        destination: '/blog/explore',
        permanent: true,
      },
      {
        source: '/ai_tool',
        destination: '/ai_tool/all',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
