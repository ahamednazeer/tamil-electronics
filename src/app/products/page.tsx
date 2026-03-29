import Breadcrumbs from '@/components/common/Breadcrumbs'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { categoriesData } from '@/data/categories'
import { brandsData } from '@/data/brands'
import { Icon } from '@iconify/react'

export const metadata: Metadata = {
  title: 'Our Products & Brands | Tamil Electricals Virudhachalam',
  description:
    'Explore our massive catalog of electrical wires, modular switches, LED lighting, and plumbing pipes. Authorized dealer for Havells, GM, Finolex, and more.',
  alternates: {
    canonical: '/products',
  },
}

export default function ProductsPage() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Products & Brands', href: '/products' },
  ]

  return (
    <main className='pt-24 sm:pt-26 min-h-screen bg-[var(--theme-bg)] pb-20'>
      <h1 className="sr-only">Our Products | Tamil Electricals - Wires, LEDs, Fans & Switches</h1>
      
      <div className="container px-4 sm:px-6 pt-4">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="container px-4 sm:px-6 mt-8 sm:mt-12">
        <div className="text-center mb-12 sm:mb-16 fade-mask-soft">
          <p className="text-primary font-bold tracking-wider uppercase text-sm sm:text-base mb-3" data-aos="fade-up">
            Wholesale & Retail
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-theme mb-4" data-aos="fade-up" data-aos-delay="100">
            Our Product Categories
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Browse our extensive selection of premium electrical and plumbing supplies. Click any category to learn more about our stock and pricing.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-24">
          {categoriesData.map((category, idx) => (
            <Link 
              href={`/categories/${category.slug}`} 
              key={category.slug}
              className="group block bg-[var(--theme-bg-card)] rounded-3xl overflow-hidden border border-[var(--theme-border)] shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay={(idx % 4) * 50}
            >
              <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                <Image
                  src={category.heroImage}
                  alt={category.seoTitle}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-5 right-5 text-white font-bold text-xl drop-shadow-md">
                  {category.name}
                </h3>
              </div>
              <div className="p-5">
                <ul className="space-y-2 mb-4">
                  {category.keyFeatures.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[var(--theme-text-muted)]">
                      <Icon icon="mdi:check-circle-outline" className="text-primary shrink-0" />
                      <span className="truncate">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center text-primary font-medium text-sm group-hover:underline">
                  View Details <Icon icon="mdi:arrow-right" className="ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Brands Section */}
        <div className="text-center mb-10 sm:mb-14 pt-10 border-t border-[var(--theme-border)]/50 fade-mask-soft">
          <p className="text-primary font-bold tracking-wider uppercase text-sm sm:text-base mb-3" data-aos="fade-up">
            Official Partners
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-theme mb-4" data-aos="fade-up" data-aos-delay="100">
            Brands We Supply
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            We are authorized dealers for India&apos;s most trusted and reliable electrical and plumbing manufacturers.
          </p>
        </div>

        {/* Brands Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {brandsData.map((brand, idx) => (
            <Link
              href={`/brands/${brand.slug}`}
              key={brand.slug}
              className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group"
              data-aos="fade-up"
              data-aos-delay={(idx % 6) * 50}
            >
              <div className="relative w-full aspect-[4/3] mb-3">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-800 text-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 disabled">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
