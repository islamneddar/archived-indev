/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/blog/hommmie',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/blog/hommmie',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
