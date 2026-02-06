'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

const IntroOverlay = () => {
    const { t, language } = useLanguage()
    const overlayRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const oRef = useRef<HTMLSpanElement>(null)
    const topLineRef = useRef<HTMLDivElement>(null)
    const mainLineRef = useRef<HTMLDivElement>(null)
    const progressRef = useRef(0)
    const rangeRef = useRef(0)
    const touchRef = useRef<{ y: number } | null>(null)
    const [done, setDone] = useState(false)
    const baseSizesRef = useRef<{
        topSize: number
        mainSize: number
        topLineHeight: number
        mainLineHeight: number
    } | null>(null)
    const zoomFactorRef = useRef(7.5)

    useEffect(() => {
        if (done) return
        baseSizesRef.current = null
        const overlay = overlayRef.current
        if (!overlay) return

        const root = document.documentElement
        const body = document.body
        root.classList.add('intro-lock')
        body.classList.add('intro-lock')

        const cacheBaseSizes = () => {
            if (baseSizesRef.current) return
            if (!topLineRef.current || !mainLineRef.current) return
            const topStyle = window.getComputedStyle(topLineRef.current)
            const mainStyle = window.getComputedStyle(mainLineRef.current)
            const topSize = parseFloat(topStyle.fontSize)
            const mainSize = parseFloat(mainStyle.fontSize)
            const topLineHeight = topStyle.lineHeight.endsWith('px')
                ? parseFloat(topStyle.lineHeight)
                : topSize * 1.1
            const mainLineHeight = mainStyle.lineHeight.endsWith('px')
                ? parseFloat(mainStyle.lineHeight)
                : mainSize * 1.05
            baseSizesRef.current = {
                topSize,
                mainSize,
                topLineHeight,
                mainLineHeight,
            }
        }

        const applyFontScale = (scale: number) => {
            const base = baseSizesRef.current
            if (!base) return
            if (topLineRef.current) {
                topLineRef.current.style.fontSize = `${base.topSize * scale}px`
                topLineRef.current.style.lineHeight = `${base.topLineHeight * scale}px`
            }
            if (mainLineRef.current) {
                mainLineRef.current.style.fontSize = `${base.mainSize * scale}px`
                mainLineRef.current.style.lineHeight = `${base.mainLineHeight * scale}px`
            }
        }

        const measureTarget = () => {
            const text = textRef.current
            const letter = oRef.current
            if (!text) return

            cacheBaseSizes()
            const zoomFactor = zoomFactorRef.current

            applyFontScale(zoomFactor)

            const textRect = text.getBoundingClientRect()
            let originX = textRect.width / 2
            let originY = textRect.height / 2
            let dx = 0
            let dy = 0

            if (letter) {
                const letterRect = letter.getBoundingClientRect()
                const letterCenterX = letterRect.left + letterRect.width / 2
                const letterCenterY = letterRect.top + letterRect.height / 2
                dx = window.innerWidth / 2 - letterCenterX
                dy = window.innerHeight / 2 - letterCenterY
                originX = letterCenterX - textRect.left
                originY = letterCenterY - textRect.top
            }

            overlay.style.setProperty('--intro-dx', `${dx}px`)
            overlay.style.setProperty('--intro-dy', `${dy}px`)
            overlay.style.setProperty('--intro-origin-x', `${originX}px`)
            overlay.style.setProperty('--intro-origin-y', `${originY}px`)

            applyFontScale(1)
        }

        const updateRange = () => {
            const range = Math.max(window.innerHeight * 1.2, 900)
            rangeRef.current = range
        }

        const applyProgress = (value: number) => {
            const progress = Math.min(1, Math.max(0, value))
            if (progress === progressRef.current) return
            progressRef.current = progress
            const overlayEl = overlayRef.current
            if (!overlayEl) return
            const scale = 1 + progress * (zoomFactorRef.current - 1)
            const fadeStart = 0.78
            const opacity =
                progress < fadeStart ? 1 : Math.max(0, 1 - (progress - fadeStart) / (1 - fadeStart))
            overlayEl.style.setProperty('--intro-progress', progress.toFixed(4))
            overlayEl.style.setProperty('--intro-opacity', opacity.toFixed(3))
            if (baseSizesRef.current) {
                if (topLineRef.current) {
                    topLineRef.current.style.fontSize = `${baseSizesRef.current.topSize * scale}px`
                    topLineRef.current.style.lineHeight = `${baseSizesRef.current.topLineHeight * scale}px`
                }
                if (mainLineRef.current) {
                    mainLineRef.current.style.fontSize = `${baseSizesRef.current.mainSize * scale}px`
                    mainLineRef.current.style.lineHeight = `${baseSizesRef.current.mainLineHeight * scale}px`
                }
            }
            if (progress >= 1) {
                root.classList.remove('intro-lock')
                body.classList.remove('intro-lock')
                setDone(true)
            }
        }

        const onWheel = (event: WheelEvent) => {
            event.preventDefault()
            const multiplier =
                event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1
            const delta = event.deltaY * multiplier
            const range = rangeRef.current || 1
            applyProgress(progressRef.current + delta / range)
        }

        const onKey = (event: KeyboardEvent) => {
            if (['ArrowDown', 'PageDown', ' ', 'Spacebar'].includes(event.key)) {
                event.preventDefault()
                const range = rangeRef.current || 1
                applyProgress(progressRef.current + 140 / range)
            }
            if (['ArrowUp', 'PageUp'].includes(event.key)) {
                event.preventDefault()
                const range = rangeRef.current || 1
                applyProgress(progressRef.current - 140 / range)
            }
        }

        const onTouchStart = (event: TouchEvent) => {
            const touch = event.touches[0]
            if (!touch) return
            touchRef.current = { y: touch.clientY }
        }

        const onTouchMove = (event: TouchEvent) => {
            const touch = event.touches[0]
            if (!touch) return
            if (!touchRef.current) {
                touchRef.current = { y: touch.clientY }
                return
            }
            event.preventDefault()
            const delta = touchRef.current.y - touch.clientY
            touchRef.current.y = touch.clientY
            const range = rangeRef.current || 1
            applyProgress(progressRef.current + delta / range)
        }

        const onTouchEnd = () => {
            touchRef.current = null
        }

        const onResize = () => {
            updateRange()
            measureTarget()
            applyProgress(progressRef.current)
        }

        updateRange()
        measureTarget()
        applyProgress(progressRef.current)

        window.addEventListener('wheel', onWheel, { passive: false })
        window.addEventListener('keydown', onKey)
        window.addEventListener('touchstart', onTouchStart, { passive: false })
        window.addEventListener('touchmove', onTouchMove, { passive: false })
        window.addEventListener('touchend', onTouchEnd)
        window.addEventListener('resize', onResize)

        return () => {
            window.removeEventListener('wheel', onWheel)
            window.removeEventListener('keydown', onKey)
            window.removeEventListener('touchstart', onTouchStart)
            window.removeEventListener('touchmove', onTouchMove)
            window.removeEventListener('touchend', onTouchEnd)
            window.removeEventListener('resize', onResize)
            root.classList.remove('intro-lock')
            body.classList.remove('intro-lock')
        }
    }, [done, language])

    const renderTownText = () => {
        const townText = t('hero.all_materials')
        if (language !== 'en') {
            return townText
        }
        const target = 'Town'
        const index = townText.indexOf(target)
        if (index === -1) {
            return townText
        }
        const before = townText.slice(0, index)
        const after = townText.slice(index + target.length)
        return (
            <>
                {before}T<span ref={oRef} className='intro-letter'>o</span>wn{after}
            </>
        )
    }

    if (done) {
        return null
    }

    return (
        <>
            <div
                ref={overlayRef}
                className='intro-overlay'
                aria-hidden='true'>
                <div ref={textRef} className='intro-text'>
                    <div ref={topLineRef} className='intro-line intro-line-top'>{renderTownText()}</div>
                    <div ref={mainLineRef} className='intro-line intro-line-main'>
                        <span className='intro-primary'>{t('hero.electrical')}</span>{' '}
                        <span className='intro-secondary'>{t('hero.materials')}</span>
                    </div>
                </div>
            </div>
            <style jsx global>{`
        .intro-overlay {
          position: fixed;
          inset: 0;
          background: var(--theme-bg);
          z-index: 80;
          display: flex;
          align-items: center;
          justify-content: center;
          --intro-dx: 0px;
          --intro-dy: 0px;
          --intro-origin-x: 50%;
          --intro-origin-y: 50%;
          --intro-progress: 0;
          --intro-opacity: 1;
          opacity: var(--intro-opacity);
          pointer-events: none;
          touch-action: none;
          will-change: transform, opacity;
        }

        .intro-text {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%)
            translate(
              calc(var(--intro-dx) * var(--intro-progress)),
              calc(var(--intro-dy) * var(--intro-progress))
            );
          transform-origin: var(--intro-origin-x) var(--intro-origin-y);
          text-align: center;
          line-height: 1.05;
          will-change: transform;
          -webkit-font-smoothing: antialiased;
          text-rendering: geometricPrecision;
        }

        .intro-line {
          opacity: 1;
        }

        .intro-line-top {
          text-transform: uppercase;
          font-size: clamp(0.85rem, 2.2vw, 1.1rem);
          letter-spacing: 0.08em;
          color: var(--theme-text-muted);
          margin-bottom: 0.5rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .intro-line-main {
          font-size: clamp(2.6rem, 8.5vw, 5.4rem);
          font-weight: 800;
          white-space: nowrap;
        }

        .intro-primary {
          color: var(--theme-primary);
        }

        .intro-secondary {
          color: var(--theme-text);
        }

        .intro-letter {
          display: inline-block;
        }

        html.intro-lock,
        body.intro-lock {
          overflow: hidden;
          height: 100%;
          overscroll-behavior: none;
          touch-action: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .intro-text {
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
        </>
    )
}

export default IntroOverlay