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
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="fi init Oi Fi ft Ii Ai Ri capture calculateEventProperties Ni register register_once register_for_session unregister unregister_for_session Hi getFeatureFlag getFeatureFlagPayload getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync qi identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty zi Li createPersonProfile setInternalOrTestUser Bi $i Wi opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing Mi debug bt ji getPageViewId captureTraceFeedback captureTraceMetric Si".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init('${process.env.NEXT_PUBLIC_POSTHOG_KEY}', {
                api_host: '${process.env.NEXT_PUBLIC_POSTHOG_HOST}', // your managed reverse proxy domain
                ui_host: 'https://us.posthog.com', // necessary because you're using a proxy, this way links will point back to PostHog properly
                defaults: '2026-01-30',
                person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
            })`
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

