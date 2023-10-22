// import('./env.d')
require('dotenv').config({
  path: './.env.local'
})

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
  experimental: {
    runtime: 'experimental-edge',
    optimizeCss: true,
    forceSwcTransforms: true,
  },
  compress: true,
  compiler: {
    emotion: {
      sourceMap: true
    }
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_S3_HOSTNAME]
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = withBundleAnalyzer(nextConfig)