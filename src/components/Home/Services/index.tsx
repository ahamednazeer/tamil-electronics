'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

const LocalServices = () => {
  const { t } = useLanguage()
  const bandRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [hasDragged, setHasDragged] = useState(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const velXRef = useRef(0)
  const lastXRef = useRef(0)
  const lastTimeRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setHasDragged(false)
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft
    lastXRef.current = e.pageX
    lastTimeRef.current = performance.now()
    velXRef.current = 0
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }

  const momentumLoop = () => {
    if (!scrollContainerRef.current) return
    if (Math.abs(velXRef.current) > 0.5) {
      scrollContainerRef.current.scrollLeft -= velXRef.current
      velXRef.current *= 0.92 // friction
      rafRef.current = requestAnimationFrame(momentumLoop)
    }
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
      momentumLoop()
    }
  }

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false)
      momentumLoop()
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    e.preventDefault()

    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const dx = e.pageX - lastXRef.current
    const dt = performance.now() - lastTimeRef.current

    if (dt > 0) {
      // Calculate velocity as pixels per frame roughly
      velXRef.current = (dx / dt) * 16 
    }
    
    if (Math.abs(e.pageX - scrollContainerRef.current.offsetLeft - startXRef.current) > 5) {
      setHasDragged(true)
    }

    lastXRef.current = e.pageX
    lastTimeRef.current = performance.now()

    const walk = (x - startXRef.current) // 1:1 tracking
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk
  }

  const handleContainerClickCapture = (e: React.MouseEvent) => {
    if (hasDragged) {
      e.stopPropagation()
      e.preventDefault()
    }
  }

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
    { title: t('services.items.support.title'), href: '#contact' },
    { title: t('services.items.wiring.title'), serviceKey: 'wiring' },
    { title: t('services.items.switches.title'), serviceKey: 'switches' },
    { title: t('services.items.switchgear.title'), serviceKey: 'switchgear' },
    { title: t('services.items.lights.title'), serviceKey: 'lights' },
    { title: t('services.items.conduits.title'), serviceKey: 'conduits' },
    { title: t('services.items.pipes.title'), serviceKey: 'pipes' },
    { title: t('services.items.fittings.title'), serviceKey: 'fittings' },
    { title: t('services.items.tanks.title'), serviceKey: 'tanks' },
    { title: t('services.items.pumps.title'), serviceKey: 'pumps' },
    { title: t('services.items.fans.title'), serviceKey: 'fans' },
    { title: t('services.items.bldc.title'), serviceKey: 'bldc' },
    { title: t('services.items.stabilizers.title'), serviceKey: 'stabilizers' },
    { title: t('services.items.cooler.title'), serviceKey: 'cooler' },
    { title: t('services.items.heater.title'), serviceKey: 'heater' },
  ]

  const handleServiceClick = (serviceKey: string) => {
    window.dispatchEvent(
      new CustomEvent('service-filter', { detail: { service: serviceKey, source: 'click' } })
    )
  }

  return (
    <section ref={sectionRef} className='pt-8 sm:pt-10 lg:pt-12 pb-10 sm:pb-14 lg:pb-16'>
      <div className='container px-4 sm:px-6'>
        <div className='text-center mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto'>
          <p className='text-primary text-sm sm:text-base font-semibold tracking-wider uppercase mb-2 sm:mb-3'>
            {t('services.subheading')}
          </p>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl text-theme font-bold tracking-tight mb-4 sm:mb-5 lg:mb-6'>
            {t('services.title')}
          </h2>
          <p className='text-muted/80 text-base sm:text-lg lg:text-xl'>
            {t('services.description')}
          </p>
        </div>

        <div
          className='rounded-2xl border shadow-sm relative overflow-hidden'
          style={{
            backgroundColor: 'var(--services-strip-bg)',
            borderColor: 'var(--services-strip-border)',
          }}>
          <div
            ref={scrollContainerRef}
            className={`overflow-x-auto no-scrollbar w-full relative select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onClickCapture={handleContainerClickCapture}
            style={{
              WebkitOverflowScrolling: 'touch',
              maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            }}
          >
            <div
              ref={bandRef}
              className='flex items-center gap-3 sm:gap-6 px-3 sm:px-8 lg:px-10 py-3 sm:py-5 will-change-transform justify-start flex-nowrap'
            >
              {services.map((item, index) => (
                <div key={index} className='flex shrink-0 items-center gap-3 sm:gap-4'>
                {item.href ? (
                  <Link
                    href={item.href}
                    className='flex items-center gap-3 whitespace-nowrap px-3 sm:px-4 py-2 rounded-full border border-transparent hover:border-primary/50 hover:bg-white/5 transition-colors'>
                    <p className='text-theme text-base sm:text-lg font-semibold'>
                      {item.title}
                    </p>
                  </Link>
                ) : (
                  <button
                    data-service-link
                    onClick={() => item.serviceKey && handleServiceClick(item.serviceKey)}
                    className='flex items-center gap-3 whitespace-nowrap px-3 sm:px-4 py-2 rounded-full border border-transparent hover:border-primary/50 hover:bg-white/5 transition-colors cursor-pointer'>
                    <p className='text-theme text-base sm:text-lg font-semibold'>
                      {item.title}
                    </p>
                  </button>
                )}
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
      </div>
    </section>
  )
}

export default LocalServices
