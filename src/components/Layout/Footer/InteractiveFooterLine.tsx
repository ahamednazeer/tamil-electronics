'use client'

import { useEffect, useRef, type PointerEvent } from 'react'

const VIEWBOX_WIDTH = 800
const VIEWBOX_HEIGHT = 96
const BASELINE_Y = 36
const CONTROL_X = VIEWBOX_WIDTH / 2
const ELASTIC_DURATION = 900

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const createCurve = (controlY: number) =>
  `M0,${BASELINE_Y} Q${CONTROL_X},${controlY} ${VIEWBOX_WIDTH},${BASELINE_Y}`

const easeOutElastic = (progress: number) => {
  if (progress === 0 || progress === 1) {
    return progress
  }

  const c4 = (2 * Math.PI) / 3
  return Math.pow(2, -10 * progress) * Math.sin((progress * 10 - 0.75) * c4) + 1
}

const InteractiveFooterLine = () => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const linePathRef = useRef<SVGPathElement | null>(null)
  const hitPathRef = useRef<SVGPathElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const stateRef = useRef({
    currentY: BASELINE_Y,
    connected: false,
    reduceMotion: false,
    tweenFromY: BASELINE_Y,
    tweenStart: 0,
    isTweening: false,
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    stateRef.current.reduceMotion = mediaQuery.matches

    const syncMotionPreference = (event: MediaQueryListEvent) => {
      stateRef.current.reduceMotion = event.matches
      if (event.matches) {
        stateRef.current.currentY = BASELINE_Y
        stateRef.current.tweenFromY = BASELINE_Y
        stateRef.current.tweenStart = 0
        stateRef.current.isTweening = false
      }
    }

    const render = (timestamp: number) => {
      const linePath = linePathRef.current

      if (!linePath) {
        return
      }

      const state = stateRef.current

      if (!state.reduceMotion && state.isTweening) {
        const elapsed = timestamp - state.tweenStart
        const progress = clamp(elapsed / ELASTIC_DURATION, 0, 1)
        const eased = easeOutElastic(progress)
        state.currentY = state.tweenFromY + (BASELINE_Y - state.tweenFromY) * eased

        if (progress >= 1) {
          state.currentY = BASELINE_Y
          state.isTweening = false
        }
      } else if (state.reduceMotion) {
        state.currentY = BASELINE_Y
      }

      const curve = createCurve(state.currentY)
      linePath.setAttribute('d', curve)
      animationRef.current = window.requestAnimationFrame((nextTimestamp) => render(nextTimestamp))
    }

    mediaQuery.addEventListener('change', syncMotionPreference)
    render(0)

    return () => {
      mediaQuery.removeEventListener('change', syncMotionPreference)
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current
    const hitPath = hitPathRef.current

    if (!svg || !hitPath || stateRef.current.reduceMotion) {
      return
    }

    const rect = svg.getBoundingClientRect()
    const y = (event.clientY - rect.top) * (VIEWBOX_HEIGHT / rect.height)
    const overPath = event.target === hitPath

    if (!stateRef.current.connected && overPath) {
      stateRef.current.connected = true
      stateRef.current.isTweening = false
    }

    if (stateRef.current.connected) {
      stateRef.current.currentY = clamp(y * 2 - BASELINE_Y, 4, VIEWBOX_HEIGHT - 4)
    }
  }

  const handlePointerLeave = () => {
    stateRef.current.connected = false
    stateRef.current.tweenFromY = stateRef.current.currentY
    stateRef.current.tweenStart = performance.now()
    stateRef.current.isTweening = true
  }

  return (
    <div className='footer-accent-line' aria-hidden='true'>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio='none'
        className='footer-accent-line__svg'
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <defs>
          <linearGradient id='footer-accent-gradient' x1='0' y1='0' x2='596' y2='600' gradientUnits='userSpaceOnUse'>
            <stop offset='0' stopColor='var(--theme-primary)' />
            <stop offset='1' stopColor='var(--theme-primary)' />
          </linearGradient>
        </defs>

        <path
          ref={linePathRef}
          d={createCurve(BASELINE_Y)}
          stroke='url(#footer-accent-gradient)'
          strokeWidth='2'
          strokeLinecap='round'
          fill='none'
        />
        <path
          ref={hitPathRef}
          d={createCurve(BASELINE_Y)}
          stroke='transparent'
          strokeWidth='72'
          strokeLinecap='round'
          fill='none'
          pointerEvents='stroke'
        />
      </svg>
    </div>
  )
}

export default InteractiveFooterLine
