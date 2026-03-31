'use client'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { useLanguage } from '@/context/LanguageContext'
import { storeInfo } from '@/data/storeInfo'

const Work = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  const orbitItems = [
    { type: 'image', value: '/images/perks/hammer.webp', alt: 'Tools' },
    { type: 'image', value: '/images/perks/switch.webp', alt: 'Switch' },
    { type: 'image', value: '/images/perks/bulb.webp', alt: 'Bulb' },
    { type: 'image', value: '/images/perks/fan.webp', alt: 'Fan' },
    { type: 'image', value: '/images/perks/pipe.webp', alt: 'Pipes' },
    { type: 'image', value: '/images/perks/pump.webp', alt: 'Pump' },
    { type: 'image', value: '/images/perks/plug.webp', alt: 'Plug' },
    { type: 'image', value: '/images/perks/cable.webp', alt: 'Cables' },
  ]

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    let angle = 0
    let lastY = window.scrollY
    let ticking = false
    const rotationSpeed = 0.12

    let isDragging = false
    let startAngleRad = 0
    let cx = 0
    let cy = 0
    let angularVelocity = 0
    let lastTime = 0
    let inertiaFrameId: number

    const orbit = orbitRef.current
    const circle = circleRef.current
    const section = sectionRef.current
    if (!orbit || !circle || !section) return

    // Helper to get angle from center
    const getAngle = (clientX: number, clientY: number) => {
      return Math.atan2(clientY - cy, clientX - cx)
    }

    const updateRotationUI = (newAngle: number) => {
      orbit.style.setProperty('--orbit-rotate', `${newAngle}deg`)
      orbit.style.setProperty('--orbit-rotate-neg', `${-newAngle}deg`)
    }

    // === SCROLL LOGIC ===
    const onScrollUpdate = () => {
      const scrollY = window.scrollY
      if (!isDragging) {
        // Only let scroll drive if momentum is basically stopped
        if (Math.abs(angularVelocity) < 0.05) {
          const deltaScroll = scrollY - lastY
          angle = (angle - deltaScroll * rotationSpeed) % 360
          updateRotationUI(angle)
        }
      }
      lastY = scrollY
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(onScrollUpdate)
        ticking = true
      }
    }

    // === INERTIA (MOMENTUM) LOOP ===
    const applyInertia = () => {
      if (!isDragging && Math.abs(angularVelocity) > 0.005) {
        angle = (angle + angularVelocity * 16) % 360 // 16ms approx base frame
        angularVelocity *= 0.988 // Lower friction for highly sustained lottery momentum
        updateRotationUI(angle)
        inertiaFrameId = requestAnimationFrame(applyInertia)
      } else {
        angularVelocity = 0
      }
    }

    // === DRAG LOGIC ===
    const onPointerDown = (e: PointerEvent) => {
      isDragging = true
      cancelAnimationFrame(inertiaFrameId)
      angularVelocity = 0
      
      const rect = circle.getBoundingClientRect()
      cx = rect.left + rect.width / 2
      cy = rect.top + rect.height / 2
      
      startAngleRad = getAngle(e.clientX, e.clientY)
      lastTime = performance.now()
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return
      e.preventDefault() // Prevent page scroll on touch 
      
      const currentAngleRad = getAngle(e.clientX, e.clientY)
      let deltaRad = currentAngleRad - startAngleRad
      
      // Handle wrapping at 180 / -180 degrees
      if (deltaRad > Math.PI) deltaRad -= 2 * Math.PI
      if (deltaRad < -Math.PI) deltaRad += 2 * Math.PI
      
      const deltaDeg = deltaRad * (180 / Math.PI)
      angle = (angle + deltaDeg) % 360
      updateRotationUI(angle)
      
      const now = performance.now()
      const dt = now - lastTime
      if (dt > 0) {
        angularVelocity = deltaDeg / dt // Degrees per millisecond
      }
      
      startAngleRad = currentAngleRad
      lastTime = now
    }

    const onPointerUp = () => {
      if (!isDragging) return
      isDragging = false
      lastY = window.scrollY // Sync scroll to prevent jitter
      applyInertia()
    }

    circle.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove, { passive: false })
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      circle.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(inertiaFrameId)
    }
  }, [])

  return (
    <section ref={sectionRef} className='py-10 sm:py-14 lg:py-16 w-full overflow-hidden' id='work'>
      <div className='container px-4 sm:px-6 mx-auto'>
        <div className='grid grid-cols-12 items-center gap-8 lg:gap-12'>
          {/* Left Content */}
          <div className='lg:col-span-6 col-span-12'>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl text-theme font-bold tracking-tight mb-4 sm:mb-5 lg:mb-6'>
              {t('work.title_start')}{' '}
              <span className='text-primary'>{t('work.title_highlight')}</span>{' '}
              {t('work.title_end')}
            </h2>
            <p className='text-muted/80 text-base sm:text-lg lg:text-xl mb-8 sm:mb-10 max-w-xl'>
              {t('work.description')}
            </p>


          </div>

          {/* Right Content - Circular Image with Floating Icons */}
          <div className='lg:col-span-6 col-span-12'>
            <div className='relative flex justify-center lg:justify-end items-center lg:pr-10'>
              {/* Container for circle and floating icons */}
              <div ref={circleRef} className='relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] will-change-transform cursor-grab active:cursor-grabbing touch-none select-none z-10'>
                {/* Main Circular Image */}
                <div className='absolute inset-0 rounded-full border-8 border-white shadow-2xl overflow-hidden'>
                  <Image
                    src='/images/work/img-work-with-us-v2.webp'
                    loading='lazy'
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
                            width={40}
                            height={40}
                            sizes='(max-width: 640px) 32px, 40px'
                            className='object-contain'
                            quality={70}
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
          </div>
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
          width: 68px;
          height: 68px;
          margin-left: -34px;
          margin-top: -34px;
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
          width: 32px;
          height: 32px;
          color: var(--theme-primary);
        }
        @media (max-width: 640px) {
          .orbit-item {
            width: 56px;
            height: 56px;
            margin-left: -28px;
            margin-top: -28px;
            transform:
              rotate(var(--item-angle))
              translateX(145px)
              rotate(calc(-1 * var(--item-angle)))
              rotate(var(--orbit-rotate-neg));
          }
          .orbit-icon {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>
    </section>
  )
}

export default Work
