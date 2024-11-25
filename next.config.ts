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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        pathname: `/a/${process.env.UPLOADTHING_APP_ID}/*`

      }
    ]
  }
}

export default withPayload(nextConfig)
