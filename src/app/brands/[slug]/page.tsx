import { brandsData } from '@/data/brands'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import ContactSection from '@/components/Home/Contact'
import { storeInfo } from '@/data/storeInfo'
import { Icon } from '@iconify/react'

export function generateStaticParams() {
  return brandsData.map((brand) => ({
    slug: brand.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const brand = brandsData.find((b) => b.slug === resolvedParams.slug)
  if (!brand) return {}

  return {
    title: brand.seoTitle,
    description: brand.seoDescription,
    alternates: {
      canonical: `/brands/${brand.slug}`,
    },
  }
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const brand = brandsData.find((b) => b.slug === resolvedParams.slug)

  if (!brand) {
    notFound()
  }

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Products & Brands', href: '/products' },
    { label: brand.name, href: `/brands/${brand.slug}` },
  ]

  return (
    <main className="pt-24 sm:pt-26 min-h-screen">
      <div className="container px-4 sm:px-6 py-10 lg:py-16">
        <Breadcrumbs crumbs={crumbs} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[var(--theme-bg-card)] rounded-3xl p-6 sm:p-10 border border-[var(--theme-border)] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
          <div className="lg:col-span-5 flex justify-center items-center bg-white rounded-2xl p-8 h-64 sm:h-72 border border-gray-100 shadow-inner">
            <Image
              src={brand.logo}
              alt={`${brand.name} authorized dealer in Virudhachalam`}
              width={250}
              height={100}
              className="object-contain w-full h-full"
            />
          </div>
          
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="bg-primary/10 text-primary px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide flex items-center gap-1.5">
                <Icon icon="mdi:shield-check" className="text-base" /> Authorized Dealer
              </span>
              <span className="bg-[var(--theme-bg)] border border-[var(--theme-border)] text-muted px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1.5">
                <Icon icon="mdi:map-marker" className="text-base" /> Virudhachalam
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-theme mb-6 leading-[1.15]">
              Genuine <span className="text-primary">{brand.name}</span> Products in Virudhachalam
            </h1>
            
            <p className="text-muted/90 text-[1.05rem] sm:text-lg mb-8 leading-relaxed max-w-2xl">
              {brand.seoDescription} Visit Tamil Electricals to explore our extensive catalog of authentic {brand.name} electrical goods packed with complete manufacturer warranties.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full">
              <a 
                href={`https://wa.me/${storeInfo.whatsappNumber}?text=Hi, I am looking for ${brand.name} products in your shop.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary flex items-center justify-center gap-2 py-3.5 px-7 text-base sm:text-lg font-medium shadow-lg shadow-primary/25"
              >
                <Icon icon="mdi:whatsapp" className="text-xl" />
                Inquire on WhatsApp
              </a>
              <a 
                href={`tel:${storeInfo.phoneE164}`}
                className="btn btn-outline flex items-center justify-center gap-2 py-3.5 px-7 text-base sm:text-lg font-medium bg-[var(--theme-bg)]"
              >
                <Icon icon="mdi:phone" className="text-xl" />
                Call for Pricing
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-16 sm:mt-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-theme mb-8 inline-flex flex-col items-center">
            {brand.name} Categories We Supply
            <span className="h-1 w-16 bg-primary rounded-full mt-3"></span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {brand.categories.map((cat) => (
              <span key={cat} className="px-6 py-3 bg-[var(--theme-bg-card)] border border-[var(--theme-border)] rounded-xl text-theme font-medium shadow-sm hover:border-primary/50 hover:text-primary transition-colors cursor-default">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-12 bg-[var(--theme-bg-card)] border-t border-[var(--theme-border)]">
        <ContactSection />
      </div>
    </main>
  )
}
