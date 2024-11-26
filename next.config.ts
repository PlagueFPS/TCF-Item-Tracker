import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import './env'

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    }
  },
  experimental: {
    ppr: true,
    serverComponentsHmrCache: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        pathname: `/a/${process.env.UPLOADTHING_APP_ID}/*`

      }
    ],
    localPatterns: [
      {
        pathname: '/images/**',
        search: ''
      },
      {
        pathname: '/api/media/file/*',
      }
    ]
  }
}

export default withPayload(nextConfig)
