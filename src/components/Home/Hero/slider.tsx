'use client'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'
import { useState, useEffect, useRef, useCallback } from 'react'

const brandsData = [
  { name: 'Finolex', logo: '/images/brands/finolex.webp' },
  { name: 'Havells', logo: '/images/brands/havells.webp' },
  { name: 'Orient', logo: '/images/brands/orient.webp' },
  { name: 'Crompton', logo: '/images/brands/crompton.webp' },
  { name: 'Polycab', logo: '/images/brands/polycab.webp' },
  { name: 'RR Kabel', logo: '/images/brands/rr-kabel.webp' },
  { name: 'Luker', logo: '/images/brands/luker.webp' },
  { name: 'Norwood', logo: '/images/brands/norwood.webp' },
  { name: 'Philips', logo: '/images/brands/philips.webp' },
  { name: 'Surya', logo: '/images/brands/surya.webp' },
  { name: 'Sturlite', logo: '/images/brands/sturlite.webp' },
  { name: 'Ashirvad', logo: '/images/brands/ashirvad.webp' },
  { name: 'Aquatech', logo: '/images/brands/aquatech.webp' },
  { name: 'Parryware', logo: '/images/brands/parryware.webp' },
  { name: 'Supreme', logo: '/images/brands/supreme.webp' },
  { name: 'V-Guard', logo: '/images/brands/v-guard.webp' },
  { name: 'Atomberg', logo: '/images/brands/atomberg.webp' },
  { name: 'Venus', logo: '/images/brands/venus.webp' },
  { name: 'Standard', logo: '/images/brands/standard.webp' },
  { name: 'Suguna', logo: '/images/brands/suguna.webp' },
  { name: 'CG', logo: '/images/brands/cg.webp' }
]

// Map service keys to brand names
const serviceToBrands: Record<string, string[]> = {
  lights: ['Crompton', 'Havells', 'Orient', 'Polycab', 'Philips', 'Surya', 'Luker', 'Sturlite', 'CG'],
  fans: ['Crompton', 'Havells', 'Orient', 'Atomberg', 'Luker', 'CG'],
  pipes: ['Finolex', 'Ashirvad', 'Supreme', 'Aquatech'],
  fittings: ['Finolex', 'Ashirvad', 'Parryware', 'Supreme'],
  pumps: ['Crompton', 'Suguna', 'CG', 'Aquatech'],
  stabilizers: ['Havells', 'Crompton', 'V-Guard', 'Venus'],
  wiring: ['Finolex', 'Havells', 'Polycab', 'RR Kabel', 'Standard', 'V-Guard'],
  switches: ['Havells', 'Orient', 'Norwood', 'Standard'],
}

const CardSlider = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastFilterTimeRef = useRef(0)
  const sliderRef = useRef<Slider>(null)

  const clearFilter = useCallback(() => {
    setActiveFilter(null)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (activeFilter) {
      // Pause autoplay when filtering
      sliderRef.current?.slickPause()
    } else {
      // Resume autoplay when cleared
      sliderRef.current?.slickPlay()
    }
  }, [activeFilter])

  useEffect(() => {
    const handleServiceFilter = (e: Event) => {
      const detail = (e as CustomEvent<{ service: string }>).detail
      if (!detail?.service) return

      lastFilterTimeRef.current = Date.now()
      setActiveFilter(detail.service)

      // Clear any existing timer
      if (timerRef.current) clearTimeout(timerRef.current)

      // Auto-clear after 10 seconds
      timerRef.current = setTimeout(() => {
        setActiveFilter(null)
        timerRef.current = null
      }, 10000)

      // Scroll the brands section into view
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })

      setTimeout(() => {
        if (window.innerWidth >= 1024) {
          sliderRef.current?.slickGoTo(0)
        } else if (window.innerWidth >= 640) {
          sliderRef.current?.slickGoTo(0)
        } else {
          sliderRef.current?.slickGoTo(1)
        }
      }, 50)
    }

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-service-link]')) return
      if (Date.now() - lastFilterTimeRef.current < 500) return
      if (containerRef.current?.contains(target)) return
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

  const matchedBrandNames = activeFilter && serviceToBrands[activeFilter]
    ? serviceToBrands[activeFilter]
    : null

  const settings = {
    autoplay: !activeFilter, // Pause autoplay when filtering
    dots: false,
    arrows: false,
    infinite: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    cssEase: 'ease-in-out',
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  }

  // When filtered, only show the matched brands
  const filteredBrands = matchedBrandNames
    ? brandsData.filter((b) => matchedBrandNames.includes(b.name))
    : null

  return (
    <div ref={containerRef} className='mt-6 sm:mt-10 lg:mt-12 pt-4 sm:pt-5 lg:pt-6 overflow-hidden'>
      <p className='text-muted text-center mb-3 sm:mb-4 lg:mb-5 text-xs sm:text-base lg:text-lg'>
        Trusted Brands We Carry
      </p>

      {/* When filtered: show a plain flex grid (bypasses react-slick cloning) */}
      {filteredBrands ? (
        <div className='flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 py-2'>
          {filteredBrands.map((item) => (
            <div
              key={item.name}
              className='px-3 sm:px-5 lg:px-6 py-3 sm:py-4 lg:py-5 flex items-center justify-center h-14 sm:h-20 lg:h-24'
              style={{
                animation: 'brandPopIn 0.4s ease forwards',
              }}
            >
              <Image
                src={item.logo}
                alt={item.name}
                width={160}
                height={80}
                sizes='(max-width: 640px) 100px, (max-width: 1024px) 140px, 160px'
                className='object-contain max-h-10 sm:max-h-14 lg:max-h-16 w-auto'
                style={{
                  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))',
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        /* When no filter: normal auto-scrolling slider */
        <Slider ref={sliderRef} {...settings} className="outline-none focus:outline-none">
          {brandsData.map((item) => (
            <div key={item.name} className='px-1 sm:px-3 outline-none focus:outline-none'>
              <div className='px-2 sm:px-4 lg:px-6 py-2 sm:py-4 lg:py-5 flex items-center justify-center h-12 sm:h-20 lg:h-24'>
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={160}
                  height={80}
                  sizes='(max-width: 640px) 100px, (max-width: 1024px) 140px, 160px'
                  className='object-contain max-h-8 sm:max-h-12 lg:max-h-16 w-auto pointer-events-none'
                />
              </div>
            </div>
          ))}
        </Slider>
      )}

      <style jsx>{`
        @keyframes brandPopIn {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}

export default CardSlider
