'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Icon } from '@iconify/react'
import { useLanguage } from '@/context/LanguageContext'

// Dynamically import slider to reduce initial JS bundle size
const CardSlider = dynamic(() => import('./slider'), {
  ssr: false,
  loading: () => <div className="h-24 w-full bg-transparent"></div>
})

const Hero = () => {
  const { t } = useLanguage()
  return (
    <section
      className='relative md:pt-16 lg:pt-20 md:pb-8 lg:pb-10 pt-12 pb-6 overflow-hidden z-1'
      id='main-banner'>
      <div className='container px-4 sm:px-6 overflow-x-hidden'>
        <div className='grid grid-cols-12 gap-4 lg:gap-8 items-center'>
          {/* Left content - Original Text Style */}
          <div className='lg:col-span-5 col-span-12 animate-fade-in'>
            <div className='flex gap-3 sm:gap-6 items-center lg:justify-end justify-center mb-3 sm:mb-4 mt-4 sm:mt-0.5 lg:mt-0.5 lg:hidden'>
              <p className='text-white text-base sm:text-xl lg:text-28 mb-0 text-right'>
                {t('hero.your_trusted')} <span className='text-primary'>{t('hero.electrical')}</span> {t('hero.partner')}
              </p>
            </div>
            <h1 className='font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl lg:text-start text-center text-white mb-3 sm:mb-4 leading-tight lg:mt-16'>
              {t('hero.all_materials')} <span className='text-primary'>{t('hero.electrical')}</span> {t('hero.materials')}{' '}
              <span className='text-primary'>{t('hero.available')}</span> {t('hero.here')}
            </h1>
            <p className='text-muted/80 text-sm sm:text-base lg:text-lg lg:text-start text-center mb-4 sm:mb-6 lg:mb-8 px-2 sm:px-0'>
              {t('hero.items_list')}
            </p>
            <div className='flex flex-col sm:flex-row items-center md:justify-start justify-center gap-4 sm:gap-6 lg:gap-8'>
              <a
                href='tel:+91XXXXXXXXXX'
                className='w-full sm:w-auto bg-primary border border-primary rounded-lg text-base sm:text-lg lg:text-xl font-medium hover:bg-transparent hover:text-primary text-darkmode py-3 sm:py-2 px-6 sm:px-7 z-50 text-center transition-all'>
                {t('hero.call_now')}
              </a>
              <a
                href='https://wa.me/91XXXXXXXXXX'
                target='_blank'
                rel='noopener noreferrer'
                className='w-full sm:w-auto bg-transparent border border-primary rounded-lg text-base sm:text-lg lg:text-xl font-medium hover:bg-primary hover:text-darkmode text-primary py-3 sm:py-2 px-6 sm:px-7 text-center transition-all'>
                {t('hero.whatsapp_us')}
              </a>
            </div>
            <div className='grid grid-cols-3 gap-4 sm:gap-8 lg:gap-12 mt-8 sm:mt-12 lg:mt-12 md:justify-start justify-start'>
              <div className='text-left group'>
                <div className='flex justify-start mb-2'>
                  <Icon icon='mdi:sparkles' className='text-primary text-2xl sm:text-3xl lg:text-4xl group-hover:scale-110 transition-transform duration-300' />
                </div>
                <p className='text-muted text-xs sm:text-sm font-medium'>{t('hero.grand_opening')}</p>
              </div>
              <div className='text-left group'>
                <div className='flex justify-start mb-2'>
                  <Icon icon='mdi:tag-multiple' className='text-primary text-2xl sm:text-3xl lg:text-4xl group-hover:scale-110 transition-transform duration-300' />
                </div>
                <div className='flex items-center justify-start gap-1'>
                  <span className='text-white font-bold text-lg sm:text-xl'>{t('hero.brands_count')}</span>
                  <p className='text-muted text-xs sm:text-sm font-medium'>{t('hero.brands')}</p>
                </div>
              </div>
              <div className='text-left group'>
                <div className='flex justify-start mb-2'>
                  <Icon icon='mdi:shield-check' className='text-primary text-2xl sm:text-3xl lg:text-4xl group-hover:scale-110 transition-transform duration-300' />
                </div>
                <div className='flex items-center justify-start gap-1'>
                  <span className='text-white font-bold text-lg sm:text-xl'>{t('hero.quality_pct')}</span>
                  <p className='text-muted text-xs sm:text-sm font-medium'>{t('hero.quality')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className='col-span-12 lg:col-span-7 block animate-fade-in mt-8 lg:mt-0'>
            <div className='flex justify-center mb-6'>
              <div className='inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gray-100/50 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-sm'>
                <Icon icon='mdi:shield-check' className='text-primary text-2xl' />
                <p className='text-gray-900 dark:text-white text-lg lg:text-xl font-medium whitespace-nowrap'>
                  {t('hero.your_trusted')} <span className='text-primary font-bold'>{t('hero.electrical')}</span> {t('hero.partner')}
                </p>
              </div>
            </div>
            <div className='bento-hero'>
              {/* Card 1: Main Shop Image - Large */}
              <div className='bento-main bento-card overflow-hidden group'>
                <Image
                  src='/images/hero/banner-image.webp'
                  alt='Tamil Electricals Shop'
                  fill
                  priority
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
              </div>

              {/* Card 2: Primary CTA Card */}
              <div className='bento-cta bento-card bg-primary p-5 flex flex-col justify-center items-center text-center'>
                <Icon icon='mdi:lightning-bolt' className='text-white text-3xl mb-2' />
                <p className='text-white text-sm font-semibold'>{t('hero.quality')}</p>
                <p className='text-white/80 text-xs'>{t('hero.guaranteed')}</p>
              </div>

              {/* Card 3: Product Image */}
              <div className='bento-img1 bento-card overflow-hidden group'>
                <Image
                  src='/images/portfolio/image1.jpeg'
                  alt='Electrical Products'
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                />
              </div>

              {/* Card 4: Google Map - Spans 2 columns */}
              <div className='bento-map bento-card overflow-hidden'>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.5974!2d80.2707!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA0JzU3LjciTiA4MMKwMTYnMTQuNSJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '20px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Tamil Electricals Location"
                ></iframe>
              </div>

              {/* Card 6: Stats Card */}
              <div className='bento-stats bento-card-themed p-4 flex flex-col items-center justify-center text-center'>
                <p className='text-primary text-3xl xl:text-4xl font-bold'>{t('hero.brands_count')}</p>
                <p className='bento-text-secondary text-xs'>{t('hero.brands')}</p>
              </div>
            </div>
          </div>
        </div>
        <CardSlider />
      </div>

      {/* Bento Grid Styles - Theme Aware */}
      <style jsx global>{`
        /* Bento Grid Styles - Theme Aware */
        .bento-hero {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(4, 120px);
          gap: 10px;
        }
        
        /* Base card styles */
        .bento-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
        }
        
        /* Theme-aware card background */
        .bento-card-themed {
          position: relative;
          border-radius: 20px;
          background: var(--theme-bg-card);
          border: 1px solid var(--theme-border);
        }
        
        /* Icon button styling */
        .bento-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: var(--theme-bg-secondary);
          color: var(--theme-text-muted);
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }
        
        .bento-icon-btn:hover {
          background: var(--theme-primary);
          color: white;
          border-color: var(--theme-primary);
        }
        
        /* Secondary text */
        .bento-text-secondary {
          color: var(--theme-text-muted);
        }
        
        /* Grid positions for Mobile (2 columns) */
        .bento-main {
          grid-column: 1 / 3;
          grid-row: 1 / 3;
        }
        
        .bento-cta {
          grid-column: 1 / 2;
          grid-row: 3 / 4;
        }
        
        .bento-img1 {
          grid-column: 2 / 3;
          grid-row: 3 / 4;
        }
        
        .bento-map {
          grid-column: 1 / 2;
          grid-row: 4 / 5;
        }
        
        .bento-stats {
          grid-column: 2 / 3;
          grid-row: 4 / 5;
        }
        
        /* Desktop (lg) overrides - Restore Original 3-column Grid */
        @media (min-width: 1024px) {
          .bento-hero {
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 110px);
            gap: 14px;
          }
          
          .bento-main {
            grid-column: 1 / 3;
            grid-row: 1 / 3;
          }
          
          .bento-cta {
            grid-column: 3 / 4;
            grid-row: 1 / 2;
          }
          
          .bento-img1 {
            grid-column: 3 / 4;
            grid-row: 2 / 3;
          }
          
          .bento-map {
            grid-column: 1 / 3;
            grid-row: 3 / 4;
          }
          
          .bento-stats {
            grid-column: 3 / 4;
            grid-row: 3 / 4;
          }
        }
        
        /* Light theme specific overrides */
        [data-theme="light"] .bento-card-themed {
          background: #FFFFFF;
          border-color: #E5E7EB;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        }
        
        [data-theme="light"] .bento-icon-btn {
          background: #F3F4F6;
          color: #6B7280;
        }
        
        [data-theme="light"] .bento-icon-btn:hover {
          background: var(--theme-primary);
          color: white;
        }
        
        [data-theme="light"] .bento-text-secondary {
          color: #6B7280;
        }
        
        @media (min-width: 1280px) {
          .bento-hero {
            grid-template-rows: repeat(3, 130px);
            gap: 16px;
          }
        }
        
        @media (min-width: 1536px) {
          .bento-hero {
            grid-template-rows: repeat(3, 145px);
            gap: 18px;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero
