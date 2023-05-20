/** @type {import('next').NextConfig} */
const nextConfig = {
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
