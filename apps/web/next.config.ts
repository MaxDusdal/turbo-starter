import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/auth', '@repo/db']
}

export default nextConfig
