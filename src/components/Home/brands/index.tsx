'use client'

import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { brandsData } from '@/app/api/data'

const Brands = () => {
  const { t } = useLanguage()
  return (
    <section className='py-12 lg:py-16' id='brands'>
      <div className='container px-4 sm:px-6'>
        <div className='text-center'>
          <p className='text-muted text-lg sm:text-xl lg:text-28 mb-2'>
            {t('brands.subheading')}
          </p>
          <h2 className='text-theme text-2xl sm:text-3xl lg:text-4xl font-medium mb-3'>
            {t('brands.title')}
          </h2>
          <p className='text-muted/60 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto'>
            {t('brands.description')}
          </p>
        </div>
        <div className='mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center'>
          {brandsData.map((brand) => (
            <div
              key={brand.name}
              className='flex items-center justify-center p-2 sm:p-3'
            >
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={160}
                height={80}
                className='brand-logo h-10 w-auto object-contain'
                sizes='(max-width: 640px) 120px, (max-width: 1024px) 140px, 160px'
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Brands
