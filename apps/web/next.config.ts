import type { NextConfig } from 'next'

import './env'

const nextConfig: NextConfig = {
  /* config options here */
  // Next only runs its compiler over app source by default, not node_modules
  // (workspace packages are symlinked there) - this opts @what-box/shared in
  // so its .ts source gets transpiled instead of imported as-is.
  transpilePackages: ['@what-box/shared'],
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
