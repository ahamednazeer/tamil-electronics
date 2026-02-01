import { DM_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import { ThemeProvider } from 'next-themes'
import ScrollToTop from '@/components/ScrollToTop'
import Aoscompo from '@/utils/aos'
import { Metadata, Viewport } from 'next'

// Optimize font loading with display swap and preload
const font = DM_Sans({
  subsets: ['latin'],
  display: 'swap', // Faster text rendering - prevents FOIT
  preload: true,
  fallback: ['system-ui', 'arial'],
})

// Viewport configuration for better mobile performance
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000510' },
  ],
}

// Default metadata for the site
export const metadata: Metadata = {
  metadataBase: new URL('https://tamilelectricals.com'),
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Tamil Electricals',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        {/* Preload LCP image for faster rendering */}
        <link
          rel='preload'
          as='image'
          href='/images/hero/banner-image.png'
          fetchPriority='high'
        />
        {/* Preconnect to external resources for faster loading */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        {/* DNS prefetch for performance */}
        <link rel='dns-prefetch' href='https://fonts.googleapis.com' />
      </head>
      <body className={`${font.className}`}>
        <ThemeProvider
          attribute='class'
          enableSystem={true}
          defaultTheme='system'>
          <Aoscompo>
            <Header />
            {children}
            <Footer />
          </Aoscompo>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}

