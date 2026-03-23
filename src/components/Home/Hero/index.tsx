'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Icon } from '@iconify/react'
import { LayoutTextFlip } from '@/components/ui/layout-text-flip'
import { useLanguage } from '@/context/LanguageContext'
import { storeInfo } from '@/data/storeInfo'

// Dynamically import slider to reduce initial JS bundle size
const CardSlider = dynamic(() => import('./slider'), {
  ssr: false,
  loading: () => <div className="h-24 w-full bg-transparent"></div>
})

const Hero = () => {
  const { t, language } = useLanguage()
  const headlineReady = true

  const renderTownText = () => {
    const townText = t('hero.all_materials')
    if (language !== 'en') {
      return townText
    }
    const target = 'Town'
    const index = townText.indexOf(target)
    if (index === -1) {
      return townText
    }
    const before = townText.slice(0, index)
    const after = townText.slice(index + target.length)
    return (
      <>
        {before}T<span className='hero-letter-pop'>o</span>wn{after}
      </>
    )
  }

  return (
    <section
      className='relative pt-32 sm:pt-36 lg:pt-48 pb-12 lg:pb-20 overflow-hidden z-[1]'
      id='main-banner'>
      <div className='hero-surface' aria-hidden='true'>
        <span className='hero-orb hero-orb-left'></span>
        <span className='hero-orb hero-orb-right'></span>
      </div>
      <div className='container max-w-[84rem] px-4 sm:px-5 overflow-x-hidden relative z-1'>
        <div className='grid grid-cols-12 gap-5 lg:gap-7 items-stretch'>
          {/* Left content */}
          <div className='md:col-span-5 lg:col-span-5 col-span-12 animate-fade-in'>
            <div className='flex justify-center md:justify-start mb-2 sm:mb-3'>
              <div className='hero-tagline'>
                <Icon icon='mdi:check-decagram' className='hero-tagline-icon' />
                <span>{t('hero.trusted_local')}</span>
              </div>
            </div>
            <h1
              className={`md:text-start text-center mb-3 sm:mb-4 leading-tight max-w-[800px] mx-auto md:mx-0 hero-headline ${headlineReady ? 'hero-headline-ready' : 'hero-headline-prepare'}`}>
              <span className='hero-line hero-line-kicker block text-muted/80 text-xs sm:text-sm lg:text-base font-semibold tracking-wide uppercase'>
                {renderTownText()}
              </span>
              {language === 'en' ? (
                <span className='hero-line hero-line-main block font-extrabold text-[2.3rem] sm:text-[2.85rem] md:text-[3.2rem] lg:text-[3.6rem] leading-[1.06]'>
                  <span className='text-primary'>Electricals &amp;</span>{' '}
                  <LayoutTextFlip
                    simple
                    words={['Electronics', 'Plumbing']}
                    duration={3000}
                    className='text-primary'
                  />{' '}
                  <span className='text-theme'>Hub</span>
                </span>
              ) : (
                <span
                  className={`hero-line hero-line-main block font-extrabold ${language === 'ta'
                    ? 'text-[2rem] sm:text-[2.45rem] md:text-[2.85rem] lg:text-[3.1rem] leading-[1.12]'
                    : 'text-[2.3rem] sm:text-[2.85rem] md:text-[3.2rem] lg:text-[3.6rem] leading-[1.06]'
                    }`}>
                  <span className='text-primary'>{t('hero.electrical')}</span>{' '}
                  <span className='text-theme'>{t('hero.materials')}</span>
                </span>
              )}
              <span className='hero-line hero-line-sub block text-sm sm:text-base text-muted mt-2'>
                {t('hero.available')} {t('hero.here')}{' '}
                {language === 'en' ? 'in' : ''} {t('hero.now_open')}
              </span>
            </h1>
            <p className='text-muted/80 text-sm sm:text-base lg:text-lg md:text-start text-center mb-4 sm:mb-6 lg:mb-7 px-2 sm:px-0 max-w-[520px] mx-auto md:mx-0'>
              {t('hero.items_list')}
            </p>
            <div className='flex flex-col sm:flex-row items-center md:justify-start justify-center gap-4 sm:gap-6 lg:gap-6'>
              <a
                href={`tel:${storeInfo.phoneE164}`}
                className='btn btn-primary w-full sm:w-auto sm:min-w-[230px] lg:min-w-[250px] text-base sm:text-lg lg:text-xl py-2.5 sm:py-3 px-6 sm:px-7 z-50 text-center whitespace-nowrap'>
                <Icon icon='mdi:phone' className='text-xl' />
                {t('hero.call_now')}
              </a>
              <a
                href={`https://wa.me/${storeInfo.whatsappNumber}`}
                target='_blank'
                rel='noopener noreferrer'
                className='btn btn-outline w-full sm:w-auto sm:min-w-[230px] lg:min-w-[250px] text-base sm:text-lg lg:text-xl py-2.5 sm:py-3 px-6 sm:px-7 text-center whitespace-nowrap'>
                <Icon icon='mdi:whatsapp' className='text-xl' />
                {t('hero.whatsapp_us')}
              </a>
            </div>
            <p className='hero-trustline mt-5 sm:mt-6 text-center md:text-left'>
              {t('hero.grand_opening')} • {t('hero.brands_count')} {t('hero.brands')} • {t('hero.quality_pct')} {t('hero.quality')}
            </p>
          </div>

          {/* Right content */}
          <div className='col-span-12 md:col-span-7 lg:col-span-7 block animate-fade-in mt-8 md:mt-0 lg:mt-0 md:flex md:flex-col md:justify-end'>
            <div className='hero-bold'>
              <div className='hero-bold-photo hero-float-soft'>
                <Image
                  src='/images/hero/banner-image.webp'
                  alt='Tamil Electricals Shop'
                  fill
                  priority
                  fetchPriority='high'
                  sizes='(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 50vw'
                  className='hero-bold-image object-cover'
                />
              </div>
            </div>
          </div>
        </div>
        <CardSlider />
      </div>

      <style jsx global>{`
        .hero-surface {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .hero-orb {
          position: absolute;
          border-radius: 999px;
          opacity: 0.45;
          filter: blur(20px);
        }

        .hero-orb-left {
          width: 420px;
          height: 420px;
          left: -160px;
          top: 28%;
          background: radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--theme-primary) 20%, transparent) 0%, transparent 75%);
        }

        .hero-orb-right {
          width: 520px;
          height: 520px;
          right: -200px;
          top: -180px;
          background: radial-gradient(circle at 40% 40%, color-mix(in srgb, var(--theme-accent) 25%, transparent) 0%, transparent 75%);
        }

        .hero-tagline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--theme-bg-card) 95%, transparent);
          border: 1px solid color-mix(in srgb, var(--theme-border) 90%, transparent);
          color: var(--theme-text-muted);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .hero-tagline-icon {
          font-size: 1rem;
          color: var(--theme-primary);
        }

        .hero-headline-prepare .hero-line {
          opacity: 0;
          transform: translateY(8px);
        }

        .hero-headline-prepare .hero-line-main {
          transform: translateY(10px) scale(0.98);
        }

        .hero-headline-ready .hero-line {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .hero-headline-ready .hero-line-kicker {
          transition-delay: 0.05s;
        }

        .hero-headline-ready .hero-line-main {
          transition-delay: 0.18s;
        }

        .hero-headline-ready .hero-line-sub {
          transition-delay: 0.32s;
        }

        .hero-letter-pop {
          display: inline-block;
          opacity: 0;
          transform: scale(0.6);
          transition: opacity 0.45s ease, transform 0.45s ease;
          transition-delay: 0.1s;
        }

        .hero-headline-ready .hero-letter-pop {
          opacity: 1;
          transform: scale(1);
        }

        .hero-trustline {
          color: var(--theme-text-muted);
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          text-align: center;
        }

        @media (min-width: 768px) {
          .hero-trustline {
            text-align: left;
          }
        }

        .hero-bold {
          position: relative;
        }

        .hero-bold-photo {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background: var(--theme-bg-card);
          border: 1px solid var(--theme-border);
          box-shadow: 0 22px 45px rgba(0, 0, 0, 0.16);
          height: 230px;
        }

        .hero-bold-image {
          filter: saturate(1.04);
        }

        .hero-float {
          animation: heroFloat 7s ease-in-out infinite;
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .hero-float-soft {
          animation: heroFloatSoft 9s ease-in-out infinite;
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        @keyframes heroFloat {
          0% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -6px, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes heroFloatSoft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -4px, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-float,
          .hero-float-soft {
            animation: none;
          }

          .hero-headline-prepare .hero-line,
          .hero-headline-ready .hero-line {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .hero-letter-pop {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        @media (min-width: 640px) {
          .hero-bold-photo {
            height: 280px;
          }
        }

        @media (min-width: 768px) {
          .hero-bold-photo {
            height: 340px;
          }
        }

        @media (min-width: 1024px) {
          .hero-bold-photo {
            height: 380px;
          }
        }

        @media (min-width: 1280px) {
          .hero-bold-photo {
            height: 430px;
          }
        }

        @media (min-width: 1536px) {
          .hero-bold-photo {
            height: 470px;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero
