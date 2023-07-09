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
    ];
  },
};

module.exports = nextConfig;
