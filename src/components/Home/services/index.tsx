'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

const LocalServices = () => {
  const { t } = useLanguage()
  const bandRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.innerWidth < 768) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const maxShift = 18
    const speed = 0.12
    let rafId: number | null = null
    let target = 0
    let current = 0
    let active = true
    let lastScrollY = window.scrollY
    let isInView = false

    const inView = () => {
      const section = sectionRef.current
      if (!section) return false
      const rect = section.getBoundingClientRect()
      return rect.top < window.innerHeight && rect.bottom > 0
    }

    const animate = () => {
      if (!active) return
      current += (target - current) * 0.12
      if (Math.abs(target - current) < 0.1) {
        current = target
      }
      if (bandRef.current) {
        bandRef.current.style.transform = `translateX(${current}px)`
      }
      rafId = window.requestAnimationFrame(animate)
    }

    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const scrollY = window.scrollY
      const delta = scrollY - lastScrollY
      lastScrollY = scrollY

      if (!inView()) {
        if (isInView) {
          target = 0
          isInView = false
        }
        return
      }

      if (!isInView) {
        target = 0
        current = 0
        if (bandRef.current) {
          bandRef.current.style.transform = 'translateX(0px)'
        }
        isInView = true
        return
      }

      const clampedDelta = Math.max(-40, Math.min(40, delta))
      target = Math.max(-maxShift, Math.min(maxShift, target - clampedDelta * speed))
    }

    onScroll()
    animate()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      active = false
      if (rafId) window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const services = [
    {
      title: t('services.items.support.title'),
      description: t('services.items.support.description'),
      href: '#contact',
    },
    {
      title: t('services.items.lighting.title'),
      description: t('services.items.lighting.description'),
      href: '#products',
    },
    {
      title: t('services.items.pipes.title'),
      description: t('services.items.pipes.description'),
      href: '#products',
    },
    {
      title: t('services.items.pumps.title'),
      description: t('services.items.pumps.description'),
      href: '#products',
    },
    {
      title: t('services.items.wiring.title'),
      description: t('services.items.wiring.description'),
      href: '#products',
    },
  ]

  return (
    <section ref={sectionRef} className='py-6 sm:py-8 lg:py-10'>
      <div className='container px-4 sm:px-6'>
        <div className='text-center mb-4 sm:mb-6 lg:mb-7'>
          <p className='text-muted text-sm sm:text-base mb-2'>
            {t('services.subheading')}
          </p>
          <h2 className='text-theme text-2xl sm:text-3xl lg:text-4xl font-medium mb-3 sm:mb-4'>
            {t('services.title')}
          </h2>
          <p className='text-muted/60 text-sm sm:text-base lg:text-lg'>
            {t('services.description')}
          </p>
        </div>

        <div
          className='rounded-2xl border shadow-sm overflow-x-auto lg:overflow-hidden no-scrollbar'
          style={{
            backgroundColor: 'var(--services-strip-bg)',
            borderColor: 'var(--services-strip-border)',
            WebkitOverflowScrolling: 'touch',
          }}>
          <div
            ref={bandRef}
            className='flex items-center gap-3 sm:gap-6 px-3 sm:px-8 lg:px-10 py-3 sm:py-5 will-change-transform justify-start lg:justify-center'
          >
            {services.map((item, index) => (
              <div key={index} className='flex shrink-0 items-center gap-3 sm:gap-4 md:min-w-[200px]'>
                <Link
                  href={item.href}
                  className='flex items-center gap-3 whitespace-nowrap px-3 sm:px-4 py-2 rounded-full border border-transparent hover:border-primary/50 hover:bg-white/5 transition-colors'>
                  <p className='text-theme text-base sm:text-lg font-semibold'>
                    {item.title}
                  </p>
                </Link>
                {index < services.length - 1 && (
                  <div
                    className='hidden sm:block h-10 w-px ml-4'
                    style={{
                      backgroundColor:
                        'color-mix(in srgb, var(--theme-text) 18%, transparent)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LocalServices
