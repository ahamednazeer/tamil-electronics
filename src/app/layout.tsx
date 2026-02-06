import { DM_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import { ThemeProvider } from 'next-themes'
import ScrollToTop from '@/components/ScrollToTop'
import Aoscompo from '@/utils/aos'
import { Metadata, Viewport } from 'next'
import ParticlesBackground from '@/components/ParticlesBackground'
import { LanguageProvider } from '@/context/LanguageContext'

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
          href='/images/hero/banner-image.webp'
          fetchPriority='high'
        />
        {/* next/font/google self-hosts; no external font preconnects needed */}
        {/* Prevent theme flash AND intro flash - set before any render */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme') || 'light';
                document.documentElement.setAttribute('data-theme', theme);
                // Check if intro should show (not seen before)
                var introSeen = false;
                try { introSeen = sessionStorage.getItem('intro_seen') === '1'; } catch(e) {}
                if (!introSeen) {
                  document.documentElement.classList.add('intro-loading');
                }
              })();
            `,
          }}
        />
        {/* Critical CSS to prevent intro flash - hide everything until CSS loads */}
        <style dangerouslySetInnerHTML={{ __html: `html.intro-loading header, html.intro-loading .site-layer, html.intro-loading footer, html.intro-loading .intro-layer { visibility: hidden !important; } html.intro-loading { background: #fff; }` }} />
      </head>
      <body className={`${font.className}`}>
        <ThemeProvider
          attribute='data-theme'
          enableSystem={false}
          defaultTheme='light'>
          <LanguageProvider>
            <Aoscompo>
              <Header />
              <ParticlesBackground />
              {children}
              <Footer />
            </Aoscompo>
            <ScrollToTop />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

