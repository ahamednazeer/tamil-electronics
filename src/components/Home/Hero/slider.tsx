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
  switches: ['GM', 'Legrand', 'Fybros', 'Hi-Fi'],
  switchgear: ['Legrand', 'GM', 'Polycab', 'Havells'],
  lights: ['Philips', 'GM', 'Fybros', 'Luker', 'Sturlite', 'Surya', 'MAC 9'],
  conduits: ['Finolex', 'Ashirvad'],
  pipes: ['Ashirvad', 'Aquatech'],
  fittings: ['Parryware', 'Supreme', 'Watertech', 'Danis'],
  tanks: ['Ashirvad', 'Aquatech'],
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

  const clearFilter = useCallback(() => {
    setActiveFilter(null)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (activeFilter) {
      sliderRef.current?.slickPause()
    } else {
      // Resume autoplay when cleared
      sliderRef.current?.slickPlay()
    }
  }, [activeFilter])

  useEffect(() => {
    const handleServiceFilter = (e: Event) => {
      const detail = (e as CustomEvent<{ service: string, source?: string }>).detail
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

      // Scroll the brands section into view on both hover (desktop) and menu click (mobile)
      if (detail.source === 'hover' || detail.source === 'menu') {
        const target = containerRef.current
        if (target) {
          // Small delay to ensure the mobile menu drawer has started closing
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }, 100)
        }
      }

      // Go to first slide after remount
      setTimeout(() => {
        sliderRef.current?.slickGoTo(0)
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

  const matchedBrandNames = useMemo(
    () => (activeFilter && serviceToBrands[activeFilter] ? serviceToBrands[activeFilter] : null),
    [activeFilter],
  )

  const matchedBrands = useMemo(
    () => {
      if (!matchedBrandNames) return []

      return matchedBrandNames
        .map((brandName) => brandsData.find((brand) => brand.name === brandName))
        .filter((brand): brand is (typeof brandsData)[number] => Boolean(brand))
    },
    [matchedBrandNames],
  )

  const settings = {
    autoplay: true,
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
    <div
      id='trusted-brands'
      ref={containerRef}
      className='mt-6 sm:mt-10 lg:mt-12 pt-4 sm:pt-5 lg:pt-6 overflow-hidden scroll-mt-28'
    >
      <p className='text-muted text-center mb-3 sm:mb-4 lg:mb-5 text-xs sm:text-base lg:text-lg'>
        Trusted Brands We Carry
      </p>

      {matchedBrandNames ? (
        <div className='flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6 px-2'>
          {matchedBrands.map((brand) => (
            <div
              key={brand.name}
              className='flex items-center justify-center w-[80px] h-[40px] sm:w-[120px] sm:h-[50px] lg:w-[150px] lg:h-[60px]'
            >
              <Image
                src={brand.logo}
                alt={`Authorized ${brand.name} Dealer in Virudhachalam`}
                width={150}
                height={60}
                sizes='(max-width: 640px) 110px, (max-width: 1024px) 130px, 150px'
                className='object-contain w-full h-full pointer-events-none'
              />
            </div>
          ))}
        </div>
      ) : (
        <Slider key={activeFilter || 'all'} ref={sliderRef} {...settings} className="outline-none focus:outline-none">
          {brandsData.map((item) => {
            return (
              <div key={item.name} className='px-1 sm:px-3 outline-none focus:outline-none'>
                <div
                  className='flex items-center justify-center w-[80px] h-[40px] sm:w-[120px] sm:h-[50px] lg:w-[150px] lg:h-[60px] mx-auto'
                >
                  <Image
                    src={item.logo}
                    alt={`Authorized ${item.name} Dealer in Virudhachalam`}
                    width={150}
                    height={60}
                    sizes='(max-width: 640px) 80px, (max-width: 1024px) 120px, 150px'
                    className='object-contain w-full h-full pointer-events-none'
                  />
                </div>
              </div>
            )
          })}
        </Slider>
      )}

    </div>
  )
}

export default CardSlider
