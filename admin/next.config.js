/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/admin/home',
        permanent: true,
      },
      {
        source: '/admin',
        destination: '/admin/home',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
