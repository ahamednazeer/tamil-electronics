'use client'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { useLanguage } from '@/context/LanguageContext'

const Work = () => {
  const ref = useRef(null)
  const sectionRef = useRef<HTMLElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const { t } = useLanguage()

  const fadeInLeft = {
    initial: { x: -50, opacity: 0 },
    animate: inView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 },
    transition: { duration: 0.6, delay: 0.2 },
  }

  const fadeInRight = {
    initial: { x: 50, opacity: 0 },
    animate: inView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 },
    transition: { duration: 0.6, delay: 0.4 },
  }

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
    <section ref={sectionRef} className='py-16 lg:py-24 w-full overflow-hidden' id='products'>
      <div className='container px-4 sm:px-6 mx-auto'>
        <div ref={ref} className='grid grid-cols-12 items-center gap-8 lg:gap-12'>
          {/* Left Content */}
          <motion.div
            {...fadeInLeft}
            className='lg:col-span-6 col-span-12'>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl text-white font-bold leading-tight mb-6'>
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
                href='tel:+919363897989'
                className='bg-primary text-white font-semibold py-3 px-8 rounded-lg hover:bg-primary-dark transition-all'>
                {t('work.contact_us')}
              </a>
              <a
                href='#about'
                className='flex items-center gap-3 text-white font-medium py-3 px-4 hover:text-primary transition-all'>
                <div className='w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center'>
                  <Icon icon='mdi:play' className='text-xl ml-0.5' />
                </div>
                {t('work.view_video')}
              </a>
            </div>
          </motion.div>

          {/* Right Content - Circular Image with Floating Icons */}
          <motion.div {...fadeInRight} className='lg:col-span-6 col-span-12'>
            <div className='relative flex justify-center lg:justify-end items-center lg:pr-10'>
              {/* Container for circle and floating icons */}
              <div ref={circleRef} className='relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] will-change-transform'>
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
                            width={32}
                            height={32}
                            sizes='(max-width: 640px) 24px, 32px'
                            className='object-contain'
                            quality={60}
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
          </motion.div>
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
          width: 56px;
          height: 56px;
          margin-left: -28px;
          margin-top: -28px;
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
          width: 28px;
          height: 28px;
          color: var(--theme-primary);
        }
        @media (max-width: 640px) {
          .orbit-item {
            width: 46px;
            height: 46px;
            margin-left: -23px;
            margin-top: -23px;
            transform:
              rotate(var(--item-angle))
              translateX(145px)
              rotate(calc(-1 * var(--item-angle)))
              rotate(var(--orbit-rotate-neg));
          }
          .orbit-icon {
            width: 24px;
            height: 24px;
          }
        }
      `}</style>
    </section>
  )
}

export default Work
