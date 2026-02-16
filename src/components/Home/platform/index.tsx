'use client'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { storeInfo } from '@/data/storeInfo'

const Platform = () => {
  const { t } = useLanguage()
  return (
    <section className='lg:pt-12 md:pt-10 sm:pt-8 pt-6 relative z-1' id='contact'>
      <div className='container px-4 sm:px-6'>
        <div className="bg-section/10 px-4 sm:px-8 lg:px-16 py-8 sm:py-10 lg:py-14 rounded-2xl sm:rounded-3xl border-2 border-section/20 grid grid-cols-12 items-center gap-4 before:content-[''] before:absolute relative before:w-96 before:h-64 before:bg-start before:bg-no-repeat before:-bottom-11 overflow-hidden lg:before:right-48 before:-z-1 before:opacity-10 ">
          <div className='lg:col-span-8 col-span-12 text-center lg:text-left'>
            <h2 className='text-white text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 lg:mb-6'>
              {t('platform.title_start')} <span className='text-primary'>{t('platform.title_highlight')}</span>{' '}
              {t('platform.title_end')}
            </h2>
            <p className='text-muted/60 text-sm sm:text-base lg:text-lg'>
              {t('platform.description_start')}
              <span className='hidden sm:inline'><br /></span> {t('platform.description_end')}
            </p>
          </div>
          <div className='lg:col-span-4 col-span-12'>
            <div className='flex lg:justify-end mt-4 lg:mt-0 justify-center gap-3 sm:gap-4'>
              <Link
                href={`tel:${storeInfo.phoneE164}`}
                className='text-darkmode bg-primary border border-primary py-2 sm:py-3 px-4 sm:px-5 rounded-lg text-base sm:text-lg lg:text-xl font-medium hover:bg-transparent hover:text-primary transition-colors'>
                {t('platform.call_now')}
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Platform
