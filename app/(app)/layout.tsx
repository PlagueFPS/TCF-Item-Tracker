import './globals.css'
import type { Metadata } from 'next'
import { Rajdhani } from 'next/font/google'
import { NavContextProvider } from '@/contexts/NavContext'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import ItemsListContextProvider from '@/contexts/ItemsListContext'
import { GLOBAL_OG_PROPS, SITE_DESCRIPTION, SITE_TITLE } from '@/utils/constants'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

interface RootLayoutProps {
  children: React.ReactNode
}

const font = Rajdhani({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_WEBSITE_URL}`),
  title: {
    template: `%s - ${SITE_TITLE}`,
    default: SITE_TITLE
  },
  description: SITE_DESCRIPTION,
  creator: 'Angel Pichardo',
  openGraph: {
    ...GLOBAL_OG_PROPS,
    title: {
      template: `%s - ${SITE_TITLE}`,
      default: SITE_TITLE
    },
    description: SITE_DESCRIPTION,
    url: '/'
  },
  twitter: {
    title: {
      template: `%s - ${SITE_TITLE}`,
      default: SITE_TITLE
    },
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: '/images/favicon.png',
    shortcut: '/images/favicon.png',
    apple: '/images/favicon.png'
  }
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={ `bg-primary-900 ${font.className}` }>
      <body>
        <NavContextProvider>
          <Navbar />
        </NavContextProvider>
        <main>
          <ItemsListContextProvider>
            { children }
          </ItemsListContextProvider>
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
