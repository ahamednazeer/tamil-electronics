'use client'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'

const brandsData = [
  { name: 'Finolex', logo: '/images/brands/Finolex_logo_header.svg' },
  { name: 'Havells', logo: '/images/brands/Havells_Logo.svg' },
  { name: 'Orient', logo: '/images/brands/Orient_Logo_2x_906fb550-c200-42e5-b9e7-f6375c0bcdab.avif' },
  { name: 'Crompton', logo: '/images/brands/crompton-greaves-logo.webp' },
  { name: 'Polycab', logo: '/images/brands/logo-gradient-trans.webp' },
]

// Map service keys to brand names
const serviceToBrands: Record<string, string[]> = {
  lights: ['Crompton', 'Havells', 'Orient', 'Polycab'],
  fans: ['Crompton', 'Havells', 'Orient'],
  pipes: ['Finolex'],
  fittings: ['Finolex'],
  pumps: ['Crompton'],
  stabilizers: ['Havells', 'Crompton'],
  wiring: ['Finolex', 'Havells', 'Polycab'],
  switches: ['Havells', 'Orient'],
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

      // The dynamic sorting will center the matched items. We just need to ensure
      // the slider resets its position so the center is visible.
      setTimeout(() => {
        if (window.innerWidth >= 1024) {
          sliderRef.current?.slickGoTo(0)
        } else if (window.innerWidth >= 640) {
          sliderRef.current?.slickGoTo(0)
        } else {
          // On small mobile (3 items), shifting by 1 helps center the middle items
          sliderRef.current?.slickGoTo(1)
        }
      }, 50)
    }

    // Outside click: clear when tapping anywhere outside the brands strip
    const handleOutsideClick = (e: MouseEvent) => {
      // Ignore clicks within 300ms of the filter event (same click)
      if (Date.now() - lastFilterTimeRef.current < 300) return

      const target = e.target as HTMLElement
      if (target.closest('[data-service-link]')) return
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

  // Determine which brands match
  const matchedBrandNames = activeFilter && serviceToBrands[activeFilter]
    ? serviceToBrands[activeFilter]
    : null

  // Dynamically reorder brands so highlighted ones are grouped in the center
  const displayBrands = useMemo(() => {
    if (!matchedBrandNames) return brandsData

    const matched = brandsData.filter((b) => matchedBrandNames.includes(b.name))
    const unmatched = brandsData.filter((b) => !matchedBrandNames.includes(b.name))

    // Place unmatched on both sides, matched in the middle
    const halfUnmatched = Math.floor(unmatched.length / 2)
    return [
      ...unmatched.slice(0, halfUnmatched),
      ...matched,
      ...unmatched.slice(halfUnmatched),
    ]
  }, [matchedBrandNames])

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

  return (
    <div ref={containerRef} className='mt-6 sm:mt-10 lg:mt-12 pt-4 sm:pt-5 lg:pt-6 overflow-hidden'>
      <p className='text-muted text-center mb-3 sm:mb-4 lg:mb-5 text-xs sm:text-base lg:text-lg'>
        Trusted Brands We Carry
      </p>
      <Slider ref={sliderRef} {...settings} className="outline-none focus:outline-none">
        {displayBrands.map((item) => {
          const isMatch = matchedBrandNames === null || matchedBrandNames.includes(item.name)
          const isDimmed = matchedBrandNames !== null && !matchedBrandNames.includes(item.name)

          // We use item.name as key because the array order changes
          return (
            <div key={item.name} className='px-1 sm:px-3 outline-none focus:outline-none'>
              <div
                className={`px-2 sm:px-4 lg:px-6 py-2 sm:py-4 lg:py-5 flex items-center justify-center h-12 sm:h-20 lg:h-24 transition-all duration-500 rounded-lg outline-none focus:outline-none ${
                  isDimmed ? 'opacity-[0.15] scale-90 grayscale' : ''
                } ${
                  matchedBrandNames !== null && isMatch
                    ? 'opacity-100 scale-110 drop-shadow-md'
                    : ''
                }`}
              >
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={120}
                  height={50}
                  sizes='(max-width: 640px) 80px, (max-width: 1024px) 110px, 120px'
                  className='object-contain max-h-6 sm:max-h-10 lg:max-h-14 w-auto pointer-events-none'
                />
              </div>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}

export default CardSlider
