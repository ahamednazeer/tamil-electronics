'use client'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'

import { brandsData } from '@/data/brands'

// Map service keys to brand names
const serviceToBrands: Record<string, string[]> = {
  wiring: ['RR Kabel', 'Finolex', 'Kundan', 'Luker', 'Norwood'],
  switches: ['GM', 'Legrand', 'Fybros'],
  switchgear: ['Legrand', 'GM', 'Polycab', 'Havells'],
  lights: ['Philips', 'GM', 'Fybros', 'Luker', 'Sturlite', 'Surya'],
  conduits: ['Finolex', 'Ashirvad'],
  pipes: ['Ashirvad', 'Aquatech'],
  fittings: ['Parryware', 'Supreme'],
  pumps: ['V-Guard', 'Crompton', 'Suguna'],
  fans: ['Philips', 'Orient', 'Crompton', 'GM', 'V-Guard', 'CG', 'Fybros', 'Luker', 'Standard', 'Havells'],
  bldc: ['Philips', 'Atomberg', 'V-Guard', 'Luker', 'Standard', 'GM'],
  stabilizers: ['V-Guard'],
  cooler: ['V-Guard'],
  heater: ['V-Guard', 'Venus', 'Standard'],
}

const CardSlider = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastFilterTimeRef = useRef(0)
  const sliderRef = useRef<Slider>(null)
  const wheelThrottleRef = useRef(0)

  const clearFilter = useCallback(() => {
    setActiveFilter(null)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (activeFilter) {
      const matched = serviceToBrands[activeFilter]
      if (matched && matched.length > 5) {
        // More than 5 brands: let slider scroll
        setTimeout(() => sliderRef.current?.slickPlay(), 200)
      } else {
        sliderRef.current?.slickPause()
      }
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

      // Go to first slide after remount
      setTimeout(() => {
        sliderRef.current?.slickGoTo(0)
        // If more than 5 matched, start autoplay after going to slide 0
        const matched = serviceToBrands[detail.service]
        if (matched && matched.length > 5) {
          setTimeout(() => sliderRef.current?.slickPlay(), 300)
        }
      }, 100)
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

  const [slidesToShowUI, setSlidesToShowUI] = useState(5)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) setSlidesToShowUI(3)
      else if (window.innerWidth <= 1024) setSlidesToShowUI(4)
      else setSlidesToShowUI(5)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const matchedBrandNames = activeFilter && serviceToBrands[activeFilter]
    ? serviceToBrands[activeFilter]
    : null
  const displayBrands = useMemo(() => {
    if (!matchedBrandNames) return brandsData

    const matched = brandsData.filter((b) => matchedBrandNames.includes(b.name))
    const unmatched = brandsData.filter((b) => !matchedBrandNames.includes(b.name))

    if (matched.length > 0 && matched.length < slidesToShowUI) {
      const padCount = Math.floor((slidesToShowUI - matched.length) / 2)
      return [
        ...unmatched.slice(0, padCount), // Left padding (grayed out)
        ...matched, // Centered matched brands
        ...unmatched.slice(padCount), // Right padding (grayed out)
      ]
    }

    return [
      ...matched,
      ...unmatched,
    ]
  }, [matchedBrandNames, slidesToShowUI])

  const settings = {
    autoplay: !activeFilter || (matchedBrandNames !== null && matchedBrandNames.length > 5),
    dots: false,
    arrows: false,
    infinite: true,
    swipeToSlide: true,
    touchMove: true,
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

      <Slider key={activeFilter || 'all'} ref={sliderRef} {...settings} className="outline-none focus:outline-none">
        {displayBrands.map((item) => {
          const isMatch = !matchedBrandNames || matchedBrandNames.includes(item.name)
          const isDimmed = matchedBrandNames !== null && !matchedBrandNames.includes(item.name)
          return (
            <div key={item.name} className='px-1 sm:px-3 outline-none focus:outline-none'>
              <div
                className='flex items-center justify-center w-[80px] h-[40px] sm:w-[120px] sm:h-[50px] lg:w-[150px] lg:h-[60px] mx-auto'
                style={{
                  opacity: isDimmed ? 0.15 : 1,
                  transform: isDimmed ? 'scale(0.85)' : (isMatch && matchedBrandNames) ? 'scale(1.1)' : 'scale(1)',
                  filter: isDimmed ? 'grayscale(100%)' : 'none',
                }}
              >
                <Image
                  src={item.logo}
                  alt={`Authorized ${item.name} Dealer in Virudhachalam`}
                  width={150}
                  height={60}
                  sizes='(max-width: 640px) 80px, (max-width: 1024px) 120px, 150px'
                  className='object-contain w-full h-full pointer-events-none'
                  style={{
                    filter: (isMatch && matchedBrandNames) ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' : 'none',
                  }}
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
