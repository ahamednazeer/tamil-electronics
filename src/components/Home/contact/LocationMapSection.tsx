'use client'

import Link from 'next/link'
import MapTilerMap from '@/components/Home/Hero/MapTilerMap'
import { useLanguage } from '@/context/LanguageContext'
import { storeInfo } from '@/data/storeInfo'

const LocationMapSection = () => {
  const { t } = useLanguage()

  return (
    <section className='pt-4 sm:pt-6 lg:pt-8'>
      <div className='container px-4 sm:px-6'>
        <div className='mb-4 sm:mb-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2'>
          <div>
            <h3 className='text-theme text-lg sm:text-xl lg:text-2xl font-semibold'>
              {t('contact.map_title')}
            </h3>
            <p className='text-muted/70 text-sm sm:text-base'>
              {t('contact.map_subtitle')}
            </p>
          </div>
          <Link
            href={storeInfo.googleMapsUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='btn btn-outline text-sm sm:text-base px-4 py-2 whitespace-nowrap'>
            {t('contact.open_in_maps')}
          </Link>
        </div>
        <div className='hero-map-section'>
          <div className='hero-map-shell'>
            <div className='hero-map-body'>
              <div className='hero-map-frame-wrap'>
                <MapTilerMap />
                <Link
                  href={storeInfo.googleMapsUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={t('hero.open_map')}
                  className='hero-map-link-overlay'
                />
                <span className='hero-map-attrib'>
                  © MapTiler © OpenStreetMap contributors
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .hero-map-section {
          margin-top: 8px;
        }

        .hero-map-canvas {
          width: 100%;
          height: 100%;
        }

        .hero-map-shell {
          border-radius: 16px;
          padding: 10px;
          background: var(--theme-bg-card);
          border: 1px solid color-mix(in srgb, var(--theme-border) 90%, transparent);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
        }

        .hero-map-body {
          height: 240px;
        }

        .hero-map-frame-wrap {
          height: 100%;
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid color-mix(in srgb, var(--theme-border) 80%, transparent);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02);
          background: color-mix(in srgb, var(--theme-bg-card) 92%, transparent);
        }

        .hero-map-link-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          cursor: pointer;
        }

        .hero-map-marker {
          position: relative;
          width: 14px;
          height: 14px;
          background: var(--theme-primary);
          border-radius: 50%;
          box-shadow: 0 8px 18px color-mix(in srgb, var(--theme-primary) 40%, transparent);
        }

        .hero-map-marker::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 10px;
          width: 10px;
          height: 10px;
          background: var(--theme-primary);
          transform: translateX(-50%) rotate(45deg);
          border-radius: 2px;
        }

        .hero-map-marker::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 34px;
          height: 34px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--theme-primary) 20%, transparent);
          transform: translate(-50%, -50%);
        }

        .hero-map-attrib {
          position: absolute;
          right: 10px;
          bottom: 8px;
          z-index: 3;
          font-size: 0.65rem;
          color: var(--theme-text-muted);
          background: color-mix(in srgb, var(--theme-bg-card) 86%, transparent);
          padding: 4px 6px;
          border-radius: 6px;
        }

        .hero-map-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 12px;
          color: var(--theme-text-muted);
          font-size: 0.85rem;
          background: repeating-linear-gradient(
            135deg,
            color-mix(in srgb, var(--theme-bg-card) 92%, transparent),
            color-mix(in srgb, var(--theme-bg-card) 92%, transparent) 12px,
            color-mix(in srgb, var(--theme-bg-card) 86%, transparent) 12px,
            color-mix(in srgb, var(--theme-bg-card) 86%, transparent) 24px
          );
        }

        @media (min-width: 640px) {
          .hero-map-body {
            height: 260px;
          }
        }

        @media (min-width: 768px) {
          .hero-map-body {
            height: 280px;
          }
        }

        @media (min-width: 1024px) {
          .hero-map-section {
            margin-top: 12px;
          }
          .hero-map-body {
            height: 300px;
          }
        }

        @media (min-width: 1280px) {
          .hero-map-body {
            height: 320px;
          }
        }

        @media (min-width: 1536px) {
          .hero-map-body {
            height: 340px;
          }
        }
      `}</style>
    </section>
  )
}

export default LocationMapSection

