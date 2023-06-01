/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/blog-section/home',
        permanent: true,
      },
      {
        source: '/blog-section',
        destination: '/blog-section/home',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
