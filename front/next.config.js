/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  optimizeFonts: false,
  swcMinify: true,
  env: {
    APP_URL: process.env.REACT_APP_URL,
    APP_ENV: process.env.REACT_APP_ENV,
    APP_SERVER_URL: process.env.REACT_APP_SERVER_URL
  },
  rewrites(){
    return [
      {
        source: '/api/:path*',
        destination: `/api/:path*`
      },
      {
        source: '/uploads/:path*',
        destination: `/uploads/:path*`
      },
    ]
  }
}

module.exports = nextConfig
