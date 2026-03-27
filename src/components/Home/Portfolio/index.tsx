'use client'
import Image from 'next/image'
import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'

const Portfolio = () => {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const maxShiftRef = useRef(0)
  const isProgrammaticRef = useRef(false)

  useEffect(() => {
    const updateMaxShift = () => {
      const strip = stripRef.current
      const viewport = viewportRef.current
      if (!strip || !viewport) return
      const viewportWidth = viewport.clientWidth
      const maxShift = Math.max(0, strip.scrollWidth - viewportWidth)
      maxShiftRef.current = maxShift
    }
    updateMaxShift()
    const resizeTimer = window.setTimeout(updateMaxShift, 300)
    window.addEventListener('resize', updateMaxShift)
    window.addEventListener('load', updateMaxShift)
    return () => {
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', updateMaxShift)
      window.removeEventListener('load', updateMaxShift)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    let lastY = window.scrollY
    let target = 0
    let current = 0
    const speed = 0.7
    let isInView = false
    let rafId: number | null = null

    const inView = () => {
      const section = sectionRef.current
      if (!section) return false
      const rect = section.getBoundingClientRect()
      return rect.top < window.innerHeight && rect.bottom > 0
    }

    const animate = () => {
      const viewport = viewportRef.current
      if (!viewport) return
      current = target
      isProgrammaticRef.current = true
      viewport.scrollLeft = current
      isProgrammaticRef.current = false
      rafId = window.requestAnimationFrame(animate)
    }

    const onScroll = () => {
      const section = sectionRef.current
      const viewport = viewportRef.current
      if (!section || !viewport) return

      const scrollY = window.scrollY
      const delta = scrollY - lastY
      lastY = scrollY

      if (!inView()) {
        if (isInView) {
          target = 0
          current = 0
          viewport.scrollLeft = 0
          isInView = false
        }
        return
      }

      if (!isInView) {
        target = 0
        current = 0
        viewport.scrollLeft = 0
        isInView = true
        return
      }

      const maxShift = maxShiftRef.current
      if (maxShift <= 0) return
      const clampedDelta = Math.max(-120, Math.min(120, delta))
      target = Math.max(0, Math.min(maxShift, target + clampedDelta * speed))
    }

    const onUserScroll = () => {
      if (isProgrammaticRef.current) return
      const viewport = viewportRef.current
      if (!viewport) return
      target = viewport.scrollLeft
      current = target
    }

    const viewport = viewportRef.current

    onScroll()
    animate()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    viewport?.addEventListener('scroll', onUserScroll, { passive: true })
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      viewport?.removeEventListener('scroll', onUserScroll)
    }
  }, [])

  const productsData = [
    {
      image: '/images/products/led-lights.webp',
      video: '/images/products/led-lights.mp4',
      title: t('portfolio.items.led.title'),
      description: t('portfolio.items.led.description'),
    },
    {
      image: '/images/products/wires-cables.webp',
      video: '/images/products/wires-cables.mp4',
      title: t('portfolio.items.wires.title'),
      description: t('portfolio.items.wires.description'),
    },
    {
      image: '/images/products/switch-boards.webp',
      video: '/images/products/switch-boards.mp4',
      title: t('portfolio.items.switches.title'),
      description: t('portfolio.items.switches.description'),
    },
    {
      image: '/images/products/fans.webp',
      video: '/images/products/fans.mp4',
      title: t('portfolio.items.fans.title'),
      description: t('portfolio.items.fans.description'),
    },
    {
      image: '/images/products/mcb.webp',
      video: '/images/products/mcb.mp4',
      title: t('portfolio.items.mcb.title'),
      description: t('portfolio.items.mcb.description'),
    },
    {
      image: '/images/products/pvc-pipes.webp',
      video: '/images/products/pvc-pipes.mp4',
      title: t('portfolio.items.pipes.title'),
      description: t('portfolio.items.pipes.description'),
    },
    {
      image: '/images/products/bathroom-fittings.webp',
      video: '/images/products/bathroom-fittings.mp4',
      title: t('portfolio.items.fittings.title'),
      description: t('portfolio.items.fittings.description'),
    },
    {
      image: '/images/products/water-tanks.webp',
      video: '/images/products/water-tanks.mp4',
      title: t('portfolio.items.tanks.title'),
      description: t('portfolio.items.tanks.description'),
    },
    {
      image: '/images/products/agricultural-pumps.webp',
      video: '/images/products/agricultural-pumps.mp4',
      title: t('portfolio.items.agro_pumps.title'),
      description: t('portfolio.items.agro_pumps.description'),
    },
    {
      image: '/images/products/water-heaters.webp',
      video: '/images/products/water-heaters.mp4',
      title: t('portfolio.items.heaters.title'),
      description: t('portfolio.items.heaters.description'),
    },
  ]

  return (
    <section ref={sectionRef} className='py-10 sm:py-14 lg:py-16 min-h-0 overflow-hidden' id='brands'>
      <div className='container px-4 sm:px-6'>
        <motion.div
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className='text-center mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto'>
          <p className='text-primary text-sm sm:text-base font-semibold tracking-wider uppercase mb-2 sm:mb-3'>
            {t('portfolio.subheading_start')} {t('portfolio.subheading_highlight')}
          </p>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl text-theme font-bold tracking-tight mb-4 sm:mb-5 lg:mb-6 px-2'>
            {t('portfolio.title_start')}{' '}
            <span className='text-primary'>{t('portfolio.title_highlight')}</span>
          </h2>
          <p className='text-muted/80 text-base sm:text-lg lg:text-xl px-4'>
            {t('portfolio.description')}
          </p>
        </motion.div>

        <motion.div
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div ref={viewportRef} className='overflow-x-auto overflow-y-hidden no-scrollbar'>
            <div
              ref={stripRef}
              className='flex items-stretch gap-4 sm:gap-6 lg:gap-8 will-change-transform'
            >
              {productsData.map((item, index) => (
                <div key={index} className='flex-none w-[300px] sm:w-[380px] lg:w-[460px]'>
                  <div className='surface-card rounded-xl sm:rounded-2xl overflow-hidden h-full flex flex-col group'>
                    <div className='relative h-64 sm:h-80 w-full overflow-hidden'>
                      {item.video ? (
                        <video
                          src={item.video}
                          poster={item.image}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className='absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-300'
                        />
                      ) : (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          loading='lazy'
                          sizes='(max-width: 640px) 300px, (max-width: 1024px) 380px, 460px'
                          className='object-cover group-hover:scale-105 transition-transform duration-300'
                        />
                      )}
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/40 to-transparent flex items-end p-4">
                        <span className="text-white/90 text-sm font-medium">@tamilelectricals</span>
                      </div>
                    </div>
                    <div className='p-4 sm:p-5'>
                      <h4 className='text-theme text-lg sm:text-xl font-bold mb-2 sm:mb-3 whitespace-normal break-words'>
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Portfolio
