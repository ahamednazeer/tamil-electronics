import { categoriesData } from '@/data/categories'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import ContactSection from '@/components/Home/Contact'
import { storeInfo } from '@/data/storeInfo'
import { Icon } from '@iconify/react'

export function generateStaticParams() {
  return categoriesData.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const category = categoriesData.find((c) => c.slug === resolvedParams.slug)
  if (!category) return {}

  return {
    title: category.seoTitle,
    description: category.seoDescription,
    alternates: {
      canonical: `/categories/${category.slug}`,
    },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const category = categoriesData.find((c) => c.slug === resolvedParams.slug)

  if (!category) {
    notFound()
  }

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/products' },
    { label: category.name, href: `/categories/${category.slug}` },
  ]

  return (
    <main className="pt-24 sm:pt-26 min-h-screen">
      <div className="container px-4 sm:px-6 py-10 lg:py-16">
        <Breadcrumbs crumbs={crumbs} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[var(--theme-bg-card)] rounded-3xl p-6 sm:p-10 border border-[var(--theme-border)] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
          <div className="lg:col-span-6 flex justify-center items-center rounded-2xl overflow-hidden h-64 sm:h-80 shadow-md">
            <Image
              src={category.heroImage}
              alt={category.seoTitle}
              width={600}
              height={400}
              className="object-cover w-full h-full hover:scale-[1.03] transition-transform duration-500"
            />
          </div>
          
          <div className="lg:col-span-6">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="bg-primary/10 text-primary px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide flex items-center gap-1.5">
                <Icon icon="mdi:lightning-bolt" className="text-base" /> Top Quality electricals
              </span>
              <span className="bg-[var(--theme-bg)] border border-[var(--theme-border)] text-muted px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1.5">
                <Icon icon="mdi:map-marker" className="text-base" /> Virudhachalam
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-theme mb-6 leading-[1.15]">
              {category.name} <span className="text-primary italic font-serif text-[1.1em]">Specialists</span>
            </h1>
            
            <p className="text-muted/90 text-[1.05rem] sm:text-lg mb-8 leading-relaxed max-w-2xl">
              {category.seoDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full">
              <a 
                href={`https://wa.me/${storeInfo.whatsappNumber}?text=Hi, I am inquiring about ${category.name} in your store.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary flex items-center justify-center gap-2 py-3.5 px-7 text-base sm:text-lg font-medium shadow-lg shadow-primary/25"
              >
                <Icon icon="mdi:whatsapp" className="text-xl" />
                Inquire Rates
              </a>
              <a 
                href={`tel:${storeInfo.phoneE164}`}
                className="btn btn-outline flex items-center justify-center gap-2 py-3.5 px-7 text-base sm:text-lg font-medium bg-[var(--theme-bg)]"
              >
                <Icon icon="mdi:phone" className="text-xl" />
                Call Expert
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          <div className="bg-[var(--theme-bg)]/50 rounded-3xl p-8 sm:p-10 border border-[var(--theme-border)]">
            <h2 className="text-2xl sm:text-3xl font-bold text-theme mb-8 inline-flex items-center gap-3">
              <Icon icon="solar:shield-check-bold-duotone" className="text-primary text-4xl" /> Quality Features
            </h2>
            <ul className="space-y-4">
              {category.keyFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Icon icon="mdi:check-circle" className="text-green-500 text-xl mt-1 shrink-0" />
                  <span className="text-lg text-theme/90 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-[var(--theme-bg)]/50 rounded-3xl p-8 sm:p-10 border border-[var(--theme-border)]">
            <h2 className="text-2xl sm:text-3xl font-bold text-theme mb-8 inline-flex items-center gap-3">
              <Icon icon="solar:box-bold-duotone" className="text-primary text-4xl" /> Trusted Brands
            </h2>
            <div className="flex flex-wrap gap-4">
              {category.brands.map((b) => (
                <span key={b} className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-[var(--theme-border)] rounded-full text-theme font-semibold shadow-sm text-lg block">
                  {b}
                </span>
              ))}
            </div>
            <p className="mt-8 text-muted italic">
              * Visit our store to verify live inventory availability and browse through physical vendor catalogs.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-12 bg-[var(--theme-bg-card)] border-t border-[var(--theme-border)]">
        <ContactSection />
      </div>
    </main>
  )
}
