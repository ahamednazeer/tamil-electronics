'use client'

import { useEffect, useState, useLayoutEffect } from 'react'

const INTRO_SEEN_KEY = 'intro_seen'
const SCATTER_TERMS = [
    'Wires',
    'Cables',
    'Switches',
    'Sockets',
    'MCB',
    'ELCB',
    'RCCB',
    'DB Box',
    'Panels',
    'Panel Board',
    'Distribution Box',
    'Conduits',
    'Trunking',
    'Cable Tray',
    'Cable Ties',
    'Lugs',
    'Ferrules',
    'Connectors',
    'Plugs',
    'Adapters',
    'Power Strip',
    'Spike Guard',
    'Surge Protector',
    'LED',
    'Bulbs',
    'Tube Light',
    'Downlight',
    'Floodlight',
    'Street Light',
    'Ceiling Fan',
    'Exhaust Fan',
    'Regulators',
    'Stabilizers',
    'Inverter',
    'Battery',
    'UPS',
    'Timers',
    'Timer Switch',
    'Sensors',
    'Motion Sensor',
    'Photo Sensor',
    'Relays',
    'Contactors',
    'Starters',
    'Isolators',
    'Busbar',
    'Earthing',
    'Copper Wire',
    'Aluminium Wire',
    'PVC Pipe',
    'UPVC',
    'CPVC',
    'GI Pipe',
    'Cable Glands',
    'Insulation Tape',
    'Heat Shrink',
    'Multimeter',
    'Tester',
    'Fuse',
    'Junction Box',
    'Switchgear',
    'Flexible Cable',
    'Armoured Cable',
    'Floor Box',
    'Modular Plate',
    'Lamp Holder',
    'Bell',
]

const IntroOverlay = () => {
    const [enabled, setEnabled] = useState(true)
    const [done, setDone] = useState(false)
    const [fadeOut, setFadeOut] = useState(false)

    const buildScatter = (useRandom: boolean) => {
        const rand = (seed: number) => {
            if (useRandom) {
                return () => Math.random()
            }
            let value = seed % 233280
            return () => {
                value = (value * 9301 + 49297) % 233280
                return value / 233280
            }
        }

        return SCATTER_TERMS.map((text, index) => {
            const next = rand((index + 1) * 9973)
            const pickPos = () => {
                let top = 6 + next() * 86
                let left = 6 + next() * 86
                for (let i = 0; i < 6; i += 1) {
                    if (!(top > 30 && top < 70 && left > 25 && left < 75)) {
                        break
                    }
                    top = 6 + next() * 86
                    left = 6 + next() * 86
                }
                return { top, left }
            }

            const { top, left } = pickPos()
            const rangeStart = 5 + next() * 70
            const rangeEnd = Math.min(95, rangeStart + 12 + next() * 10)
            return {
                text,
                top: `${top.toFixed(1)}%`,
                left: `${left.toFixed(1)}%`,
                range: `${Math.round(rangeStart)}% ${Math.round(rangeEnd)}%`,
            }
        })
    }

    const [scatteredWords] = useState(() => buildScatter(false))

    useEffect(() => {
        let shouldShow = true
        try {
            shouldShow = sessionStorage.getItem(INTRO_SEEN_KEY) !== '1'
        } catch {
            shouldShow = true
        }

        setEnabled(shouldShow)
        if (!shouldShow) {
            setDone(true)
            // Immediately reveal site content for returning users
            const introScene = document.querySelector('.intro-scene')
            if (introScene) {
                introScene.classList.add('intro-done')
            }
        }
    }, [])

    // Reset scroll to top immediately on mount
    useLayoutEffect(() => {
        if (!enabled || done) return
        window.scrollTo(0, 0)
    }, [enabled, done])

    useEffect(() => {
        if (!enabled || done) return

        // Remove intro-loading to reveal the intro (CSS is now loaded)
        document.documentElement.classList.remove('intro-loading')
        document.body.classList.add('intro-active')
        document.documentElement.classList.add('intro-active')

        const handleScroll = () => {
            const scrollTop = window.scrollY
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0

            if (progress >= 0.90 && !fadeOut) {
                setFadeOut(true)
            }

            if (progress >= 0.98) {
                window.scrollTo(0, 0)
                setDone(true)
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
            document.body.classList.remove('intro-active')
            document.documentElement.classList.remove('intro-active')
        }
    }, [enabled, done, fadeOut])

    useEffect(() => {
        if (enabled) return
        document.body.classList.remove('intro-active')
        document.documentElement.classList.remove('intro-active')
    }, [enabled])

    useEffect(() => {
        if (!done) return
        try {
            sessionStorage.setItem(INTRO_SEEN_KEY, '1')
        } catch {
            // ignore storage failures
        }
        // Remove intro-loading and add intro-done to reveal site content
        document.documentElement.classList.remove('intro-loading')
        const introScene = document.querySelector('.intro-scene')
        if (introScene) {
            introScene.classList.add('intro-done')
        }
    }, [done])

    if (!enabled || done) {
        return null
    }

    return (
        <>
            {/* Spacer to create scrollable height */}
            <div className="intro-scroll-spacer" aria-hidden="true" />

            {/* Main intro container */}
            <div className={`intro-container ${fadeOut ? 'fade-out' : ''}`} aria-hidden="true">

                {/* Main content area */}
                <div className="stuck-grid">

                    {/* Scattered words around the viewport */}
                    {scatteredWords.map((word, index) => (
                        <div
                            key={index}
                            className="grid-item scattered"
                            style={{
                                top: word.top,
                                left: word.left,
                                '--anim-range': word.range
                            } as React.CSSProperties}
                        >
                            {word.text}
                        </div>
                    ))}

                    {/* Main titles - centered */}
                    <div className="main-titles">
                        {/* FIRST: "Your Town's" */}
                        <div className="grid-item title-1">
                            Your Town&apos;s
                        </div>

                        {/* SECOND: "Electrical & Electronics" */}
                        <div className="grid-item title-2">
                            <b>Electrical</b> & <b>Electronics</b>
                        </div>

                        {/* THIRD: "Hub" */}
                        <div className="grid-item title-3">
                            Hub
                        </div>
                    </div>

                </div>

                {/* Scroll indicator */}
                <div className="scroll-indicator">
                    <div className="scroll-mouse">
                        <div className="scroll-wheel" />
                    </div>
                    <span>Scroll to explore</span>
                </div>
            </div>

            <style jsx global>{`
                @keyframes zoom-in {
                    0% {
                        transform: translateZ(-1000px);
                        opacity: 0;
                        filter: blur(5px);
                    }
                    50% {
                        transform: translateZ(0px);
                        opacity: 1;
                        filter: blur(0px);
                    }
                    100% {
                        transform: translateZ(1000px);
                        opacity: 0;
                        filter: blur(5px);
                    }
                }

                @keyframes scroll-wheel-anim {
                    0%, 100% {
                        opacity: 1;
                        transform: translateX(-50%) translateY(0);
                    }
                    50% {
                        opacity: 0.3;
                        transform: translateX(-50%) translateY(10px);
                    }
                }

                html.intro-active,
                html.intro-active body {
                    min-height: 400vh !important;
                    background: #ffffff !important;
                    overflow-x: hidden;
                }

                /* Hide site content while intro is showing */
                .site-layer {
                    opacity: 0;
                    pointer-events: none;
                }

                .intro-scroll-spacer {
                    height: 400vh;
                    width: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    pointer-events: none;
                }

                /* 
                html:not(.intro-active) .intro-scroll-spacer,
                html:not(.intro-active) .intro-container {
                    display: none;
                } 
                */

                .intro-container {
                    position: fixed;
                    inset: 0;
                    z-index: 9999;
                    background: #ffffff !important;
                    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                }

                .intro-container.fade-out {
                    opacity: 0;
                    transform: scale(1.05);
                }

                /* Grid Styles */
                .stuck-grid {
                    position: absolute;
                    inset: 0;
                    height: 100svh;
                    perspective: 1000px;
                    transform-style: preserve-3d;
                    overflow: clip;
                    background: #ffffff;
                }

                /* Scattered words */
                .stuck-grid > .grid-item.scattered {
                    position: absolute;
                    transform-style: preserve-3d;
                    font-size: clamp(0.8rem, 2vw, 1.2rem);
                    font-weight: 300;
                    white-space: nowrap;
                    color: rgba(0, 0, 0, 0.35);
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    will-change: transform, opacity, filter;
                }

                @supports (animation-timeline: scroll()) {
                    @media (prefers-reduced-motion: no-preference) {
                        .stuck-grid > .grid-item.scattered {
                            animation: zoom-in linear both;
                            animation-timeline: scroll(root block);
                            animation-range: var(--anim-range, 20% 40%);
                        }
                    }
                }

                /* Main titles container */
                .main-titles {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    width: 100%;
                    transform: translateY(-50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 0;
                    text-align: center;
                    perspective: 1000px;
                    transform-style: preserve-3d;
                    z-index: 10;
                }

                .main-titles > .grid-item {
                    transform-style: preserve-3d;
                    white-space: nowrap;
                    will-change: transform, opacity, filter;
                }

                @supports (animation-timeline: scroll()) {
                    @media (prefers-reduced-motion: no-preference) {
                        .main-titles > .grid-item {
                            animation: zoom-in linear both;
                            animation-timeline: scroll(root block);
                        }
                    }
                }

                /* TITLE 1: "Your Town's" - FIRST */
                .main-titles > .grid-item.title-1 {
                    font-size: clamp(1.5rem, 5vw, 3rem);
                    font-weight: 500;
                    letter-spacing: 0.4em;
                    text-transform: uppercase;
                    color: rgba(0, 0, 0, 0.5);
                    animation-range: -10% 30%;
                    padding-left: 0.4em; /* Balance trailing space with leading padding */
                }

                /* TITLE 2: "Electrical & Electronics" - MIDDLE */
                .main-titles > .grid-item.title-2 {
                    font-size: clamp(2.5rem, 12vw, 8rem);
                    font-weight: 300;
                    color: rgba(0, 0, 0, 0.6);
                    line-height: 1;
                    margin: 1rem 0;
                    animation-range: 20% 60%;
                }

                .main-titles > .grid-item.title-2 b {
                    font-weight: 800;
                    background: linear-gradient(135deg, #e74c3c 0%, #f39c12 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                /* TITLE 3: "Hub" - LAST */
                .main-titles > .grid-item.title-3 {
                    font-size: clamp(2rem, 8vw, 5rem);
                    font-weight: 400;
                    letter-spacing: 0.3em;
                    color: rgba(0, 0, 0, 0.4);
                    animation-range: 50% 90%;
                    padding-left: 0.3em; /* Balance trailing space with leading padding */
                }

                /* Scroll indicator */
                .scroll-indicator {
                    position: absolute;
                    bottom: 3rem;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 100;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.75rem;
                    color: rgba(0, 0, 0, 0.5);
                    font-size: 0.75rem;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                }

                .scroll-mouse {
                    width: 26px;
                    height: 42px;
                    border: 2px solid rgba(0, 0, 0, 0.2);
                    border-radius: 13px;
                    position: relative;
                    background: rgba(0, 0, 0, 0.02);
                }

                .scroll-wheel {
                    position: absolute;
                    left: 50%;
                    top: 8px;
                    width: 4px;
                    height: 10px;
                    background: #e74c3c;
                    border-radius: 2px;
                    transform: translateX(-50%);
                    animation: scroll-wheel-anim 1.5s ease-in-out infinite;
                }

                @media (prefers-reduced-motion: reduce) {
                    .stuck-grid > .grid-item,
                    .main-titles > .grid-item {
                        animation: none !important;
                        opacity: 1;
                        filter: none;
                        transform: none;
                    }
                    .scroll-wheel {
                        animation: none;
                    }
                }

                /* Mobile adjustments */
                @media (max-width: 768px) {
                    .stuck-grid > .grid-item.scattered {
                        font-size: clamp(0.6rem, 1.5vw, 0.9rem);
                    }
                    .main-titles > .grid-item.title-1 {
                        font-size: clamp(1rem, 4vw, 2rem);
                        letter-spacing: 0.2em;
                    }
                    .main-titles > .grid-item.title-2 {
                        font-size: clamp(2rem, 10vw, 5rem);
                    }
                    .main-titles > .grid-item.title-3 {
                        font-size: clamp(1.5rem, 6vw, 3rem);
                    }
                    .scroll-indicator {
                        bottom: 2rem;
                    }
                }
            `}</style>
        </>
    )
}

export default IntroOverlay
