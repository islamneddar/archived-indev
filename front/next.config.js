/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  redirects(){
    return [
      {
        source: '/',
        destination: '/blog',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
