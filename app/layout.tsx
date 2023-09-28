import './globals.css'
import type { Metadata } from 'next'
import { Rajdhani } from 'next/font/google'
import { NavContextProvider } from '@/contexts/NavContext'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import ItemsListContextProvider from '@/contexts/ItemsListContext'

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
  creator: 'Plague',
  icons: {
    icon: '/images/favicon.png',
    shortcut: '/images/favicon.png',
    apple: '/images/favicon.png'
  },
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}`,
    siteName: 'The Cycle: Frontier Items Tracker',
    type: 'website',
    images: [
      {
        url: '/images/favicon.png',
        width: 300,
        height: 300
      }
    ]
  },
  twitter: {
    card: 'summary',
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
      </body>
    </html>
  )
}
