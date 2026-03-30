import { DM_Sans } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import { ThemeProvider } from 'next-themes'
import ScrollToTop from '@/components/ScrollToTop'
import Aoscompo from '@/lib/aos'
import { Metadata, Viewport } from 'next'
import ParticlesBackgroundWrapper from '@/components/common/ParticlesBackgroundWrapper'
import { LanguageProvider } from '@/context/LanguageContext'
import { storeInfo } from '@/data/storeInfo'
import FloatingWhatsAppButton from '@/components/common/FloatingWhatsAppButton'
import { GoogleAnalytics } from '@next/third-parties/google'
import { LenisProvider } from '@/components/common/ReactLenis'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'


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
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        {/* DNS prefetch for third-party domains */}
        <link rel='dns-prefetch' href='https://www.googletagmanager.com' />
        <link rel='dns-prefetch' href='https://www.google-analytics.com' />

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
              areaServed: [
                { '@type': 'City', name: 'Virudhachalam' },
                { '@type': 'City', name: 'Kallakurichi' },
                { '@type': 'City', name: 'Ulundurpet' },
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: storeInfo.rating.ratingValue,
                reviewCount: storeInfo.rating.reviewCount,
              },
              sameAs: [storeInfo.googleMapsUrl],
            }),
          }}
        />
      </head>
      <body className={`${font.className}`}>
        {gaId && <GoogleAnalytics gaId={gaId} />}
        {clarityId && (
          <Script id="clarity-script" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `}
          </Script>
        )}
        <ThemeProvider
          attribute='data-theme'
          enableSystem={false}
          defaultTheme='light'
          storageKey='theme-v2'
          disableTransitionOnChange>
          <LenisProvider>
            <LanguageProvider>
              <Aoscompo>
                <Header />
                <ParticlesBackgroundWrapper />
                {children}
                <Footer />
              </Aoscompo>
              <FloatingWhatsAppButton />
              <ScrollToTop />
              <Analytics />
            </LanguageProvider>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

