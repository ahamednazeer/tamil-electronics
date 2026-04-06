'use client'

import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { brandsData } from '@/data/staticContent'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'

// Map each service key to the brand names it relates to
const brandMappings: Record<string, string[]> = {
  lights: ['Crompton', 'Havells', 'Orient', 'Polycab', 'Philips', 'Surya', 'Luker', 'Sturlite', 'CG'],
  fans: ['Crompton', 'Havells', 'Orient', 'Atomberg', 'Luker', 'CG'],
  pipes: ['Finolex', 'Ashirvad', 'Supreme', 'Aquatech'],
  fittings: ['Finolex', 'Ashirvad', 'Parryware', 'Supreme'],
  pumps: ['Crompton', 'Suguna', 'CG', 'Aquatech'],
  stabilizers: ['Havells', 'Crompton', 'V-Guard', 'Venus'],
  wiring: ['Finolex', 'Havells', 'Polycab', 'RR Kabel', 'Standard', 'V-Guard'],
  switches: ['Havells', 'Orient', 'Norwood', 'Standard'],
}

const Brands = () => {
  const { t } = useLanguage()
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const clearFilter = useCallback(() => {
    setActiveFilter(null)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    // Listen for the custom event dispatched by LocalServices
    const handleServiceFilter = (e: Event) => {
      const detail = (e as CustomEvent<{ service: string, source?: string }>).detail
      if (!detail?.service) return

      setActiveFilter(detail.service)

      // Clear any existing timer
      if (timerRef.current) clearTimeout(timerRef.current)

      // Auto-clear after 10 seconds
      timerRef.current = setTimeout(() => {
        setActiveFilter(null)
        timerRef.current = null
      }, 10000)

      // Scroll the brands section into view only if triggered via a direct click on the service strip
      // (source: 'click' as opposed to 'menu' or 'hover')
      if (detail.source === 'click') {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }

    // Outside click: clear filter when tapping anywhere outside the brands section
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Don't clear if clicking inside a service link (the event handler above will handle it)
      if (target.closest('[data-service-link]')) return
      // Don't clear if clicking inside the brands section itself
      if (sectionRef.current?.contains(target)) return

      // Clear
      clearFilter()
    }

    window.addEventListener('service-filter', handleServiceFilter)
    document.addEventListener('click', handleOutsideClick)

    return () => {
      window.removeEventListener('service-filter', handleServiceFilter)
      document.removeEventListener('click', handleOutsideClick)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [clearFilter])

  // Determine which brands to show
  const matchedBrands = activeFilter && brandMappings[activeFilter]
    ? brandsData.filter((b) => brandMappings[activeFilter]!.includes(b.name))
    : null

  const visibleBrands = matchedBrands && matchedBrands.length > 0 ? matchedBrands : brandsData
  const isFiltered = matchedBrands !== null && matchedBrands.length > 0

  return (
    <section ref={sectionRef} className='py-10 sm:py-14 lg:py-16' id='brands'>
      <div className='container px-4 sm:px-6'>
        <div className='text-center'>
          <p className='text-muted text-lg sm:text-xl lg:text-28 mb-2'>
            {t('brands.subheading')}
          </p>
          <h2 className='text-theme text-2xl sm:text-3xl lg:text-4xl font-medium mb-3'>
            {t('brands.title')}
          </h2>
          <p className='text-muted/60 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto'>
            {t('brands.description')}
          </p>
        </div>

        <div className='mt-8 flex flex-wrap justify-center gap-6 items-center min-h-[80px]'>
          <AnimatePresence mode='popLayout'>
            {visibleBrands.map((brand) => (
              <motion.div
                key={brand.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: isFiltered ? 1.1 : 1,
                  transition: { duration: 0.35 },
                }}
                exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.2 } }}
                className={`flex items-center justify-center p-3 sm:p-5 rounded-xl transition-shadow duration-300 ${
                  isFiltered
                    ? 'surface-card border-2 border-primary/40 shadow-lg shadow-primary/10'
                    : 'surface-card border'
                }`}
              >
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={160}
                  height={80}
                  className='brand-logo h-10 w-auto object-contain'
                  sizes='(max-width: 640px) 120px, (max-width: 1024px) 140px, 160px'
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default Brands

