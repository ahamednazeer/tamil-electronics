import { DM_Sans } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import { ThemeProvider } from 'next-themes'
import ScrollToTop from '@/components/ScrollToTop'
import Aoscompo from '@/lib/aos'
import { Metadata, Viewport } from 'next'
import ParticlesBackground from '@/components/common/ParticlesBackground'
import { LanguageProvider } from '@/context/LanguageContext'
import { storeInfo } from '@/data/storeInfo'
import FloatingWhatsAppButton from '@/components/common/FloatingWhatsAppButton'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next'

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

const siteUrl = 'https://tamilelectricals.com'

// Default metadata for the site
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
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
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  return (
    <html lang='en' suppressHydrationWarning>
      <head>

        <link rel='sitemap' type='application/xml' href='/sitemap.xml' />
        {/* next/font/google self-hosts; no external font preconnects needed */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: storeInfo.name,
              description: storeInfo.description,
              url: 'https://tamilelectricals.com',
              telephone: storeInfo.phoneE164,
              image: 'https://tamilelectricals.com/images/hero/banner-image.webp',
              address: {
                '@type': 'PostalAddress',
                streetAddress: storeInfo.address.streetAddress,
                addressLocality: storeInfo.address.addressLocality,
                addressRegion: storeInfo.address.addressRegion,
                postalCode: storeInfo.address.postalCode,
                addressCountry: storeInfo.address.addressCountry,
              },
              openingHoursSpecification: storeInfo.hours
                .filter((hour) => !storeInfo.closedDays.includes(hour.day))
                .map((hour) => ({
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                  ][hour.day],
                  opens: hour.opens,
                  closes: hour.closes,
                })),
              sameAs: [storeInfo.googleMapsUrl],
            }),
          }}
        />
      </head>
      <body className={`${font.className}`}>
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy='afterInteractive'
            />
            <Script id='gtag-init' strategy='afterInteractive'>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
        <ThemeProvider
          attribute='data-theme'
          enableSystem={false}
          defaultTheme='light'
          storageKey='theme-v2'
          disableTransitionOnChange>
          <LanguageProvider>
            <Aoscompo>
              <Header />
              <ParticlesBackground />
              {children}
              <Footer />
            </Aoscompo>
            <FloatingWhatsAppButton />
            <ScrollToTop />
          </LanguageProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}

