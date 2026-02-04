'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
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

    onScroll()
    animate()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    viewportRef.current?.addEventListener('scroll', onUserScroll, { passive: true })
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      viewportRef.current?.removeEventListener('scroll', onUserScroll)
    }
  }, [])

  const productsData = [
    {
      image: '/images/products/led-lights.png',
      title: t('portfolio.items.led.title'),
      description: t('portfolio.items.led.description'),
    },
    {
      image: '/images/products/wires-cables.png',
      title: t('portfolio.items.wires.title'),
      description: t('portfolio.items.wires.description'),
    },
    {
      image: '/images/products/switch-boards.png',
      title: t('portfolio.items.switches.title'),
      description: t('portfolio.items.switches.description'),
    },
    {
      image: '/images/products/fans.png',
      title: t('portfolio.items.fans.title'),
      description: t('portfolio.items.fans.description'),
    },
    {
      image: '/images/products/mcb.png',
      title: t('portfolio.items.mcb.title'),
      description: t('portfolio.items.mcb.description'),
    },
    {
      image: '/images/products/pipes.png',
      title: t('portfolio.items.pipes.title'),
      description: t('portfolio.items.pipes.description'),
    },
  ]

  return (
    <section ref={sectionRef} className='lg:pt-8 md:pt-6 sm:pt-5 pt-5 min-h-0 overflow-hidden' id='brands'>
      <div className='container px-4 sm:px-6'>
        <motion.div
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className='text-center mb-4 sm:mb-6 lg:mb-8'>
          <p className='text-lg sm:text-xl lg:text-28 text-muted mb-2 sm:mb-4'>
            {t('portfolio.subheading_start')} <span className='text-primary'>{t('portfolio.subheading_highlight')}</span>
          </p>
          <h2 className='text-white text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 font-medium px-2'>
            {t('portfolio.title_start')}{' '}
            <span className='text-primary'>{t('portfolio.title_highlight')}</span>
          </h2>
          <p className='text-muted/60 text-sm sm:text-base lg:text-lg px-4'>
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
              className='flex items-stretch gap-4 sm:gap-6 lg:gap-8 pb-6 sm:pb-8 will-change-transform'
            >
              {productsData.map((item, index) => (
                <div key={index} className='flex-none w-[300px] sm:w-[380px] lg:w-[460px]'>
                  <div className='bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg h-full flex flex-col group'>
                    <div className='relative h-64 sm:h-80 w-full overflow-hidden'>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes='(max-width: 640px) 300px, (max-width: 1024px) 380px, 460px'
                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/60 to-transparent flex items-end p-4">
                        <span className="text-white/90 text-sm font-medium">@tamilelectricals</span>
                      </div>
                    </div>
                    <div className='p-4 sm:p-5 bg-white'>
                      <h4 className='text-charcoalGray text-lg sm:text-xl font-bold mb-2 sm:mb-3'>
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
