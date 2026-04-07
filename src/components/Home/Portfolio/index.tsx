'use client'

import Image from 'next/image'
import { Bebas_Neue, DM_Mono } from 'next/font/google'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
})

const FACE_ORDER = ['top', 'front', 'right', 'back', 'left', 'bottom'] as const

const STOPS = [
  { rx: 90, ry: 0 },
  { rx: 0, ry: 0 },
  { rx: 0, ry: -90 },
  { rx: 0, ry: -180 },
  { rx: 0, ry: -270 },
  { rx: -90, ry: -360 },
]

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

const Portfolio = () => {
  const { t, language } = useLanguage()
  const storyRef = useRef<HTMLDivElement>(null)
  const panelRefs = useRef<Array<HTMLElement | null>>([])
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const frameRef = useRef<number | null>(null)
  const [progress, setProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const isEnglish = language === 'en'

  const featuredProducts = [
    {
      image: '/images/products/led-lights.webp',
      video: '/images/products/led-lights.mp4',
      title: t('portfolio.items.led.title'),
    },
    {
      image: '/images/products/wires-cables.webp',
      video: '/images/products/wires-cables.mp4',
      title: t('portfolio.items.wires.title'),
    },
    {
      image: '/images/products/switch-boards.webp',
      video: '/images/products/switch-boards.mp4',
      title: t('portfolio.items.switches.title'),
    },
    {
      image: '/images/products/fans.webp',
      video: '/images/products/fans.mp4',
      title: t('portfolio.items.fans.title'),
    },
    {
      image: '/images/products/mcb.webp',
      video: '/images/products/mcb.mp4',
      title: t('portfolio.items.mcb.title'),
    },
    {
      image: '/images/products/pvc-pipes.webp',
      video: '/images/products/pvc-pipes.mp4',
      title: t('portfolio.items.pipes.title'),
    },
  ]

  useEffect(() => {
    const updateScene = () => {
      const story = storyRef.current
      if (!story) return

      const rect = story.getBoundingClientRect()
      const scrollable = Math.max(story.offsetHeight - window.innerHeight, 1)
      const nextProgress = clamp(-rect.top / scrollable, 0, 1)

      let nextActive = 0
      const viewportMid = window.innerHeight * 0.5
      panelRefs.current.forEach((panel, index) => {
        if (!panel) return
        const panelRect = panel.getBoundingClientRect()
        if (panelRect.top <= viewportMid) {
          nextActive = index
        }
      })

      setProgress(nextProgress)
      setActiveIndex(nextActive)
    }

    const scheduleUpdate = () => {
      if (frameRef.current !== null) return
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null
        updateScene()
      })
    }

    updateScene()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return

      if (prefersReducedMotion) {
        video.pause()
        return
      }

      const visibleFaceIndex = clamp(
        Math.round(progress * (featuredProducts.length - 1)),
        0,
        featuredProducts.length - 1
      )

      if (index !== visibleFaceIndex) {
        video.pause()
        return
      }

      const playWhenReady = () => {
        const currentVisibleFaceIndex = clamp(
          Math.round(progress * (featuredProducts.length - 1)),
          0,
          featuredProducts.length - 1
        )

        if (currentVisibleFaceIndex !== index) return
        video.play().catch(() => {})
      }

      video.removeEventListener('canplay', playWhenReady)

      if (video.readyState >= 2) {
        playWhenReady()
        return
      }

      video.preload = 'auto'
      video.addEventListener('canplay', playWhenReady, { once: true })
      video.load()
    })
  }, [featuredProducts.length, prefersReducedMotion, progress])

  const faceCount = featuredProducts.length
  const scaledProgress = progress * (faceCount - 1)
  const fromIndex = Math.min(Math.floor(scaledProgress), faceCount - 2)
  const easedFrame = easeInOut(scaledProgress - fromIndex)
  const fromStop = STOPS[fromIndex]
  const toStop = STOPS[fromIndex + 1]
  const rotateX = fromStop.rx + (toStop.rx - fromStop.rx) * easedFrame
  const rotateY = fromStop.ry + (toStop.ry - fromStop.ry) * easedFrame
  const visibleFaceIndex = clamp(Math.round(scaledProgress), 0, faceCount - 1)
  const activeProduct = featuredProducts[activeIndex]

  const displayClass = isEnglish ? bebasNeue.className : ''
  const monoClass = isEnglish ? dmMono.className : ''

  return (
    <section id='products' className='portfolio-cube-section'>
      <div className='container px-4 sm:px-6'>
        <div className='portfolio-cube-heading'>
          <p className='portfolio-cube-kicker'>
            {t('portfolio.subheading_start')}{' '}
            <span>{t('portfolio.subheading_highlight')}</span>
          </p>
          <h2 className='portfolio-cube-title text-theme'>
            {t('portfolio.title_start')}{' '}
            <span className='text-primary'>{t('portfolio.title_highlight')}</span>
          </h2>
          <p className='portfolio-cube-intro'>{t('portfolio.description')}</p>
        </div>
      </div>

      <div ref={storyRef} className='portfolio-cube-story'>
        <div className='portfolio-cube-stage'>
          <div className='portfolio-cube-scene' aria-hidden='true'>
            <div
              className='portfolio-cube-object'
              style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}>
              {FACE_ORDER.map((face, index) => {
                const item = featuredProducts[index]
                return (
                  <div key={face} className='portfolio-cube-face' data-face={face}>
                    {item.video ? (
                      <video
                        ref={(element) => {
                          videoRefs.current[index] = element
                        }}
                        src={item.video}
                        poster={item.image}
                        muted
                        loop
                        playsInline
                        autoPlay={index === visibleFaceIndex && !prefersReducedMotion}
                        preload='auto'
                        className='portfolio-cube-face-video'
                      />
                    ) : (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        priority={index < 2}
                        sizes='(max-width: 768px) 72vw, 520px'
                        className='portfolio-cube-face-image'
                      />
                    )}
                    <div className='portfolio-cube-face-wash'></div>
                    <div
                      className={`portfolio-cube-face-label ${displayClass} ${
                        isEnglish ? 'portfolio-cube-face-label-en' : ''
                      }`}>
                      {item.title}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className={`portfolio-cube-hud ${monoClass}`}>
            <div className='portfolio-cube-hud-number'>
              {String(Math.round(progress * 100)).padStart(3, '0')}%
            </div>
            <div className='portfolio-cube-progress'>
              <div
                className='portfolio-cube-progress-fill'
                style={{ width: `${Math.round(progress * 100)}%` }}></div>
            </div>
            <div className='portfolio-cube-hud-label'>{activeProduct.title}</div>
          </div>
        </div>

        <div className='portfolio-cube-panels'>
          {featuredProducts.map((item, index) => (
            <section
              key={item.title}
              id={`product-face-${index}`}
              ref={(element) => {
                panelRefs.current[index] = element
              }}
              className='portfolio-cube-panel'
              aria-hidden='true'></section>
          ))}
        </div>
      </div>

      <style jsx>{`
        .portfolio-cube-section {
          position: relative;
          padding: 3rem 0 1rem;
          overflow: clip;
        }

        .portfolio-cube-heading {
          max-width: 44rem;
          margin: 0 auto 2rem;
          text-align: center;
        }

        .portfolio-cube-kicker {
          color: var(--theme-text-muted);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 0.85rem;
        }

        .portfolio-cube-kicker span {
          color: var(--theme-primary);
        }

        .portfolio-cube-title {
          font-size: clamp(2.2rem, 5vw, 4.4rem);
          font-weight: 800;
          line-height: 1.02;
          letter-spacing: -0.04em;
        }

        .portfolio-cube-intro {
          color: color-mix(in srgb, var(--theme-text) 70%, transparent);
          font-size: clamp(1rem, 2vw, 1.15rem);
          line-height: 1.75;
          margin-top: 1rem;
        }

        .portfolio-cube-story {
          position: relative;
        }

        .portfolio-cube-stage {
          position: sticky;
          top: 0;
          height: 100svh;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .portfolio-cube-scene {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1300px;
        }

        .portfolio-cube-object {
          --cube-size: min(68vw, 62vh, 32rem);
          position: relative;
          width: var(--cube-size);
          height: var(--cube-size);
          transform-style: preserve-3d;
          will-change: transform;
        }

        .portfolio-cube-face {
          position: absolute;
          inset: 0;
          overflow: hidden;
          backface-visibility: hidden;
          border-radius: 1.8rem;
          background: color-mix(in srgb, var(--theme-bg-card) 96%, transparent);
          border: 1px solid color-mix(in srgb, var(--theme-border) 70%, transparent);
          box-shadow:
            0 28px 60px rgba(0, 0, 0, 0.22),
            inset 0 0 0 1px color-mix(in srgb, white 3%, transparent);
        }

        .portfolio-cube-face[data-face='front'] {
          transform: translateZ(calc(var(--cube-size) / 2));
        }

        .portfolio-cube-face[data-face='back'] {
          transform: rotateY(180deg) translateZ(calc(var(--cube-size) / 2));
        }

        .portfolio-cube-face[data-face='right'] {
          transform: rotateY(90deg) translateZ(calc(var(--cube-size) / 2));
        }

        .portfolio-cube-face[data-face='left'] {
          transform: rotateY(-90deg) translateZ(calc(var(--cube-size) / 2));
        }

        .portfolio-cube-face[data-face='top'] {
          transform: rotateX(-90deg) translateZ(calc(var(--cube-size) / 2));
        }

        .portfolio-cube-face[data-face='bottom'] {
          transform: rotateX(90deg) translateZ(calc(var(--cube-size) / 2));
        }

        .portfolio-cube-face-image {
          object-fit: cover;
          transform: scale(1.01);
          filter: saturate(1.06) contrast(1.04);
        }

        .portfolio-cube-face-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.01);
          filter: saturate(1.06) contrast(1.04);
        }

        .portfolio-cube-face-wash {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0%, transparent 34%),
            linear-gradient(0deg, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.16) 42%, transparent 72%);
        }

        .portfolio-cube-face-label {
          position: absolute;
          left: 1.5rem;
          right: 1.5rem;
          bottom: 1.25rem;
          color: rgba(255, 255, 255, 0.96);
          font-size: clamp(1.4rem, 4vw, 2.6rem);
          line-height: 0.95;
          letter-spacing: 0.05em;
          text-wrap: balance;
        }

        .portfolio-cube-face-label-en {
          text-transform: uppercase;
        }

        .portfolio-cube-hud {
          position: absolute;
          top: 2rem;
          right: 2rem;
          width: min(12rem, calc(100vw - 4rem));
          text-align: right;
          color: var(--theme-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-size: 0.7rem;
        }

        .portfolio-cube-hud-number {
          color: color-mix(in srgb, var(--theme-text) 88%, transparent);
        }

        .portfolio-cube-progress {
          width: 100%;
          height: 1px;
          margin-top: 0.55rem;
          background: color-mix(in srgb, var(--theme-text-muted) 55%, transparent);
          overflow: hidden;
        }

        .portfolio-cube-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--theme-primary), var(--theme-accent));
          transition: width 180ms linear;
        }

        .portfolio-cube-hud-label {
          margin-top: 0.55rem;
          color: var(--theme-primary);
          font-size: 0.65rem;
          text-wrap: balance;
        }

        .portfolio-cube-panels {
          position: relative;
          z-index: 1;
        }

        .portfolio-cube-panel {
          min-height: 100svh;
          display: flex;
          align-items: center;
          padding: 6rem 5rem 6rem calc(5rem + 2.5rem);
        }

        @media (max-width: 64rem) {
          .portfolio-cube-panel {
            padding-inline: 2rem;
          }
        }

        @media (max-width: 48rem) {
          .portfolio-cube-section {
            padding-top: 2rem;
          }

          .portfolio-cube-heading {
            margin-bottom: 1rem;
          }

          .portfolio-cube-stage {
            height: 100dvh;
          }

          .portfolio-cube-hud {
            top: 1rem;
            right: 1rem;
            width: min(9rem, calc(100vw - 2rem));
          }

          .portfolio-cube-object {
            --cube-size: min(76vw, 44vh, 22rem);
          }

          .portfolio-cube-face,
          .portfolio-cube-panel {
            border-radius: 1.35rem;
          }

          .portfolio-cube-face-label {
            left: 1rem;
            right: 1rem;
            bottom: 1rem;
          }

          .portfolio-cube-panel {
            min-height: 100svh;
            padding: 0 1rem;
          }
        }
      `}</style>
    </section>
  )
}

export default Portfolio
