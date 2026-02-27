'use client'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { useLanguage } from '@/context/LanguageContext'
import { storeInfo } from '@/data/storeInfo'

const Work = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  const orbitItems = [
    { type: 'image', value: '/images/perks/hammer.png', alt: 'Tools' },
    { type: 'image', value: '/images/perks/switch.png', alt: 'Switch' },
    { type: 'image', value: '/images/perks/bulb.png', alt: 'Bulb' },
    { type: 'image', value: '/images/perks/fan.png', alt: 'Fan' },
    { type: 'icon', value: 'mdi:pipe', alt: 'Pipes' },
    { type: 'icon', value: 'mdi:water-pump', alt: 'Pump' },
    { type: 'icon', value: 'mdi:power-plug', alt: 'Plug' },
    { type: 'icon', value: 'mdi:cable-data', alt: 'Cables' },
  ]

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    let lastY = window.scrollY
    let angle = 0
    let ticking = false
    const rotationSpeed = 0.12

    const update = () => {
      const section = sectionRef.current
      const orbit = orbitRef.current
      if (!section || !orbit) {
        ticking = false
        return
      }
      const rect = section.getBoundingClientRect()
      const viewportH = window.innerHeight
      const sectionTop = window.scrollY + rect.top
      const sectionBottom = sectionTop + rect.height
      const viewStart = sectionTop - viewportH
      const viewEnd = sectionBottom
      const scrollY = window.scrollY

      if (scrollY < viewStart || scrollY > viewEnd) {
        orbit.style.setProperty('--orbit-rotate', '0deg')
        orbit.style.setProperty('--orbit-rotate-neg', '0deg')
        angle = 0
        ticking = false
        return
      }

      const delta = scrollY - lastY
      lastY = scrollY
      angle = (angle - delta * rotationSpeed) % 360
      orbit.style.setProperty('--orbit-rotate', `${angle}deg`)
      orbit.style.setProperty('--orbit-rotate-neg', `${-angle}deg`)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} className='py-10 sm:py-12 lg:py-14 w-full overflow-hidden' id='products'>
      <div className='container px-4 sm:px-6 mx-auto'>
        <div className='grid grid-cols-12 items-center gap-8 lg:gap-12'>
          {/* Left Content */}
          <div className='lg:col-span-6 col-span-12'>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl text-theme font-bold leading-tight mb-6'>
              {t('work.title_start')}{' '}
              <span className='text-primary'>{t('work.title_highlight')}</span>{' '}
              {t('work.title_end')}
            </h2>
            <p className='text-muted text-base lg:text-lg mb-8 max-w-lg'>
              {t('work.description')}
            </p>

            {/* CTA Buttons - Exactly like reference */}
            <div className='flex flex-wrap items-center gap-4'>
              <a
                href={`tel:${storeInfo.phoneE164}`}
                className='btn btn-primary py-3 px-8'>
                {t('work.contact_us')}
              </a>
              <a
                href='#gallery'
                className='flex items-center gap-3 text-theme font-medium py-3 px-4 hover:text-primary transition-all'>
                <div className='w-12 h-12 rounded-full border-2 border-black/20 dark:border-white/30 flex items-center justify-center'>
                  <Icon icon='mdi:play' className='text-xl ml-0.5' />
                </div>
                {t('work.view_video')}
              </a>
            </div>
          </div>

          {/* Right Content - Circular Image with Floating Icons */}
          <div className='lg:col-span-6 col-span-12'>
            <div className='relative flex justify-center lg:justify-end items-center lg:pr-10'>
              {/* Container for circle and floating icons */}
              <div ref={circleRef} className='relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] will-change-transform'>
                {/* Main Circular Image */}
                <div className='absolute inset-0 rounded-full border-8 border-white shadow-2xl overflow-hidden'>
                  <Image
                    src='/images/work/img-work-with-us.png'
                    alt='Electrical Work'
                    fill
                    sizes='(max-width: 640px) 280px, 400px'
                    className='object-cover'
                  />
                </div>

                <div
                  ref={orbitRef}
                  className='absolute inset-0 orbit-ring'
                  style={
                    {
                      '--orbit-rotate': '0deg',
                      '--orbit-rotate-neg': '0deg',
                      '--orbit-radius': '208px',
                    } as React.CSSProperties
                  }
                >
                  {orbitItems.map((item, index) => {
                    const angle = `${(360 / orbitItems.length) * index}deg`
                    return (
                      <div
                        key={index}
                        className='orbit-item'
                        style={{ '--item-angle': angle } as React.CSSProperties}
                      >
                        {item.type === 'image' ? (
                          <Image
                            src={item.value}
                            alt={item.alt}
                            width={40}
                            height={40}
                            sizes='(max-width: 640px) 32px, 40px'
                            className='object-contain'
                            quality={70}
                          />
                        ) : (
                          <Icon icon={item.value} className='orbit-icon' />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .orbit-ring {
          transform: rotate(var(--orbit-rotate));
          transform-origin: center;
        }
        .orbit-item {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 68px;
          height: 68px;
          margin-left: -34px;
          margin-top: -34px;
          border-radius: 9999px;
          background: #ffffff;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          transform:
            rotate(var(--item-angle))
            translateX(var(--orbit-radius))
            rotate(calc(-1 * var(--item-angle)))
            rotate(var(--orbit-rotate-neg));
        }
        .orbit-icon {
          width: 32px;
          height: 32px;
          color: var(--theme-primary);
        }
        @media (max-width: 640px) {
          .orbit-item {
            width: 56px;
            height: 56px;
            margin-left: -28px;
            margin-top: -28px;
            transform:
              rotate(var(--item-angle))
              translateX(145px)
              rotate(calc(-1 * var(--item-angle)))
              rotate(var(--orbit-rotate-neg));
          }
          .orbit-icon {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>
    </section>
  )
}

export default Work
