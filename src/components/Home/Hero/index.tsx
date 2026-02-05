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
  const { t, language } = useLanguage()



  return (
    <section
      className='relative md:pt-16 lg:pt-20 md:pb-8 lg:pb-10 pt-24 sm:pt-16 pb-6 overflow-hidden z-1'
      id='main-banner'>
      <div className='container px-4 sm:px-6 overflow-x-hidden'>
        <div className='grid grid-cols-12 gap-4 lg:gap-8 items-start'>
          {/* Left content - Original Text Style */}
          <div className='md:col-span-6 lg:col-span-5 col-span-12 animate-fade-in'>
            <h1 className='font-medium md:text-start text-center text-white mb-3 sm:mb-4 leading-tight lg:mt-16 max-w-[720px] mx-auto md:mx-0'>
              <span className='sr-only'>
                {t('hero.all_materials')} {t('hero.electrical')} {t('hero.materials')} {t('hero.available')} {t('hero.here')}
              </span>
              <span className='relative block w-full max-w-[720px] h-[180px] sm:h-[210px] md:h-[240px] lg:h-[270px] xl:h-[300px] mx-auto md:mx-0'>
                <Image
                  src={
                    language === 'ta'
                      ? '/images/hero/hero-wire-title-v6-tamil.png'
                      : '/images/hero/hero-wire-title-v6.png'
                  }
                  alt={`${t('hero.all_materials')} ${t('hero.electrical')} ${t('hero.materials')} ${t('hero.available')} ${t('hero.here')}`}
                  fill
                  priority
                  fetchPriority='high'
                  sizes='(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 720px'
                  className='object-contain'
                  style={{
                    transform:
                      language === 'ta'
                        ? 'scale(1.2) translateX(-8%)'
                        : language === 'en'
                          ? 'scale(1.1) translateX(-5%)'
                          : 'scale(1)',
                    transformOrigin:
                      language === 'ta' || language === 'en' ? 'left center' : 'center',
                    filter:
                      language === 'ta'
                        ? 'brightness(1.18) contrast(1.06) saturate(1.08) drop-shadow(0 1px 1px rgba(0,0,0,0.7))'
                        : 'brightness(1.18) contrast(1.06) saturate(1.08) drop-shadow(0 1px 1px rgba(0,0,0,0.9))',
                  }}
                />
              </span>
            </h1>
            <p className='text-muted/80 text-sm sm:text-base lg:text-lg md:text-start text-center mb-4 sm:mb-6 lg:mb-8 px-2 sm:px-0 max-w-[560px] mx-auto md:mx-0'>
              {t('hero.items_list')}
            </p>
            <div className='flex flex-col sm:flex-row items-center md:justify-start justify-center gap-3 sm:gap-6 lg:gap-8'>
              <a
                href='tel:+919363897989'
                className='w-full sm:w-auto bg-primary border border-primary rounded-lg text-base sm:text-lg lg:text-xl font-medium hover:bg-transparent hover:text-primary text-darkmode py-2.5 sm:py-3 px-6 sm:px-7 z-50 text-center transition-all'>
                {t('hero.call_now')}
              </a>
              <a
                href='https://wa.me/919363897989'
                target='_blank'
                rel='noopener noreferrer'
                className='w-full sm:w-auto bg-transparent border border-primary rounded-lg text-base sm:text-lg lg:text-xl font-medium hover:bg-primary hover:text-darkmode text-primary py-2.5 sm:py-3 px-6 sm:px-7 text-center transition-all'>
                {t('hero.whatsapp_us')}
              </a>
            </div>
            <div className='grid grid-cols-3 gap-3 sm:gap-8 lg:gap-12 mt-6 sm:mt-12 lg:mt-12 justify-items-center md:justify-items-start'>
              <div className='text-center md:text-left group'>
                <div className='flex justify-center sm:justify-start mb-2'>
                  <Icon icon='mdi:sparkles' className='text-primary text-2xl sm:text-3xl lg:text-4xl group-hover:scale-110 transition-transform duration-300' />
                </div>
                <p className='text-muted text-xs sm:text-sm font-medium'>{t('hero.grand_opening')}</p>
              </div>
              <div className='text-center md:text-left group'>
                <div className='flex justify-center sm:justify-start mb-2'>
                  <Icon icon='mdi:tag-multiple' className='text-primary text-2xl sm:text-3xl lg:text-4xl group-hover:scale-110 transition-transform duration-300' />
                </div>
                <div className='flex items-center justify-center sm:justify-start gap-1'>
                  <span className='text-white font-bold text-lg sm:text-xl'>{t('hero.brands_count')}</span>
                  <p className='text-muted text-xs sm:text-sm font-medium'>{t('hero.brands')}</p>
                </div>
              </div>
              <div className='text-center md:text-left group'>
                <div className='flex justify-center sm:justify-start mb-2'>
                  <Icon icon='mdi:shield-check' className='text-primary text-2xl sm:text-3xl lg:text-4xl group-hover:scale-110 transition-transform duration-300' />
                </div>
                <div className='flex items-center justify-center sm:justify-start gap-1'>
                  <span className='text-white font-bold text-lg sm:text-xl'>{t('hero.quality_pct')}</span>
                  <p className='text-muted text-xs sm:text-sm font-medium'>{t('hero.quality')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className='col-span-12 md:col-span-6 lg:col-span-7 block animate-fade-in mt-8 md:mt-8 lg:mt-12'>
            <div className='hidden lg:flex justify-center mb-4 sm:mb-6'>
              <div className='inline-flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-gray-100/50 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-sm'>
                <Icon icon='mdi:shield-check' className='text-primary text-2xl' />
                <p className='text-gray-900 dark:text-white text-sm sm:text-lg lg:text-xl font-medium whitespace-normal sm:whitespace-nowrap'>
                  {t('hero.your_trusted')} <span className='text-primary font-bold'>{t('hero.electrical')}</span> {t('hero.partner')}
                </p>
              </div>
            </div>
            <div className='bento-hero'>
              {/* Card 1: Main Shop Image - Large */}
              <div className='bento-main bento-card bento-float-soft bento-float-4 overflow-hidden'>
                <Image
                  src='/images/hero/banner-image.webp'
                  alt='Tamil Electricals Shop'
                  fill
                  priority
                  fetchPriority='high'
                  sizes='(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 50vw'
                  className='object-cover'
                />
              </div>

              {/* Card 2: Primary CTA Card */}
              <div className='bento-cta bento-card bento-float bento-float-1 bg-primary p-5 flex flex-col justify-center items-center text-center'>
                <Icon icon='mdi:storefront' className='text-white text-3xl mb-2' />
                <p className='text-white text-sm font-semibold'>{t('hero.newly_started')}</p>
                <p className='text-white/80 text-xs'>{t('hero.shop')}</p>
              </div>

              {/* Card 3: Product Image */}
              <div className='bento-img1 bento-card bento-float bento-float-2 overflow-hidden'>
                <Image
                  src='/images/portfolio/image1.jpeg'
                  alt='Electrical Products'
                  fill
                  sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw'
                  className='object-cover'
                />
              </div>

              {/* Card 4: Google Map - Spans 2 columns */}
              <div className='bento-map bento-card overflow-hidden'>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d476.9153092930677!2d79.3236843607538!3d11.521112888557493!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bab4b2bc8d39e8d%3A0x84de949adf490e30!2sTamil%20Electricals!5e1!3m2!1sen!2sus!4v1770064556705!5m2!1sen!2sus"
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
              <div className='bento-stats bento-card-themed bento-float bento-float-3 p-4 flex flex-col items-center justify-center text-center'>
                <p className='text-primary text-xl sm:text-2xl lg:text-3xl font-bold leading-tight'>{t('hero.now_open')}</p>
                <p className='bento-text-secondary text-xs'>{t('hero.visit_us')}</p>
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
          grid-template-rows: repeat(4, 110px);
          gap: 8px;
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

        /* Subtle floating animation for right-side cards */
        .bento-float {
          animation: bentoFloat 7s ease-in-out infinite;
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .bento-float-soft {
          animation: bentoFloatSoft 8s ease-in-out infinite;
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .bento-float-1 { animation-duration: 6.5s; }
        .bento-float-2 { animation-duration: 7.5s; animation-delay: 0.6s; }
        .bento-float-3 { animation-duration: 6.8s; animation-delay: 1s; }
        .bento-float-4 { animation-duration: 8.8s; animation-delay: 0.3s; }
        .bento-float-5 { animation-duration: 9.4s; animation-delay: 0.9s; }

        @keyframes bentoFloat {
          0%   { transform: translate3d(0, 0, 0); }
          50%  { transform: translate3d(0, -8px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes bentoFloatSoft {
          0%   { transform: translate3d(0, 0, 0); }
          50%  { transform: translate3d(0, -5px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        .bento-map iframe {
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        @media (prefers-reduced-motion: reduce) {
          .bento-float { animation: none; }
          .bento-float-soft { animation: none; }
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
