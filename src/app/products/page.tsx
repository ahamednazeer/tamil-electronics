import Breadcrumbs from '@/components/common/Breadcrumbs'
import { Metadata } from 'next'
import { categoriesData } from '@/data/categories'
import { brandsData } from '@/data/brands'
import TrackedCategoryCard from '@/components/common/TrackedCategoryCard'
import TrackedBrandCard from '@/components/common/TrackedBrandCard'

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
            <TrackedCategoryCard key={category.slug} category={category} idx={idx} />
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
            <TrackedBrandCard key={brand.slug} brand={brand} idx={idx} />
          ))}
        </div>
      </div>
    </main>
  )
}
