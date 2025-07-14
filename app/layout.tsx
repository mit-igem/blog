import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { ResponsiveNavbar } from './components/resnav'

export const metadata: Metadata = {
  metadataBase: new URL("https://mit-igem.github.io/blog"),
  title: {
    default: 'MIT iGEM',
    template: '%s | MIT iGEM'
  },
  description: 'MIT iGEM is a student run synthetic biology research team.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-4xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <ResponsiveNavbar />
          <div className="mx-4">
            {children}
            <Footer />
          </div>
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
