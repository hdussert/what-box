import type { NextConfig } from 'next'

import './env'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      },
    ],
  },
  allowedDevOrigins: ['192.168.1.64'],
  experimental: {
    serverActions: {
      bodySizeLimit: '5MB',
    },
  },
}

export default nextConfig
