import { locationsData } from '@/data/locations'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import ContactSection from '@/components/Home/Contact'
import { Icon } from '@iconify/react'
import LocationCtaButton from '@/components/locations/LocationCtaButton'
import { storeInfo } from '@/data/storeInfo'

export function generateStaticParams() {
  return locationsData.map((location) => ({
    slug: location.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const location = locationsData.find((l) => l.slug === resolvedParams.slug)
  if (!location) return {}

  return {
    title: location.seoTitle,
    description: location.seoDescription,
    alternates: {
      canonical: `/locations/${location.slug}`,
    },
  }
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const location = locationsData.find((l) => l.slug === resolvedParams.slug)

  if (!location) {
    notFound()
  }

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Locations', href: '/locations' },
    { label: location.name, href: `/locations/${location.slug}` },
  ]

  return (
    <main className="pt-24 sm:pt-26 min-h-screen">
      <div className="container px-4 sm:px-6 py-10 lg:py-16">
        <Breadcrumbs crumbs={crumbs} />
        
        <div className="bg-[var(--theme-bg-card)] rounded-3xl p-8 sm:p-12 border border-[var(--theme-border)] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 pointer-events-none">
            <Icon icon="mdi:map-marker-radius" className="w-64 h-64 text-theme" />
          </div>
          
          <div className="relative z-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold tracking-wide flex items-center gap-2">
                <Icon icon="mdi:truck-delivery" className="text-lg" /> Fast Supply Network
              </span>
              <span className="bg-[var(--theme-bg)] border border-[var(--theme-border)] text-muted px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                <Icon icon="mdi:ruler-square" className="text-lg" /> {location.distance}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-theme mb-6 leading-[1.15]">
              Electrical & Plumbing Supplier for <span className="text-primary">{location.name}</span>
            </h1>
            
            <p className="text-muted/90 text-[1.15rem] sm:text-lg mb-10 leading-relaxed">
              {location.seoDescription} We proudly stock 100% genuine products ranging from heavy-duty industrial cables to domestic plumbing PVC, all stored safely at our central warehouse.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {location.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-[var(--theme-bg)]/50 p-4 rounded-xl border border-[var(--theme-border)]">
                  <Icon icon="solar:check-circle-bold-duotone" className="text-primary text-2xl shrink-0" />
                  <span className="font-semibold text-theme/90">{highlight}</span>
                </div>
              ))}
            </div>
            
            <LocationCtaButton locationName={location.name} googleMapsUrl={storeInfo.googleMapsUrl} />
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-[var(--theme-bg-card)] border-t border-[var(--theme-border)]">
        <ContactSection />
      </div>
    </main>
  )
}
