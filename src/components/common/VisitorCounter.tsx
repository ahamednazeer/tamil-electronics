'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

// ── Helpers ──────────────────────────────────────────────────────────
function getVisitorId(): string {
  const KEY = 'te_visitor_id'
  let id = ''
  try {
    id = localStorage.getItem(KEY) || ''
  } catch {
    /* SSR / private-mode fallback */
  }
  if (!id) {
    id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
    try {
      localStorage.setItem(KEY, id)
    } catch {
      /* noop */
    }
  }
  return id
}

// ── Animated counter ────────────────────────────────────────────────
function useAnimatedCount(target: number, duration = 1200) {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (target <= 0) { setDisplay(target); return }
    const start = performance.now()
    const from = 0

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress)
      setDisplay(Math.round(from + (target - from) * eased))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return display
}

// ── Component ───────────────────────────────────────────────────────
export default function VisitorCounter() {
  const [active, setActive] = useState(0)
  const [total, setTotal] = useState(0)
  const visitorIdRef = useRef('')

  const animatedTotal = useAnimatedCount(total, 1400)
  const animatedActive = useAnimatedCount(active, 800)

  // Heartbeat: POST every 30 s
  const heartbeat = useCallback(async () => {
    try {
      const res = await fetch('/api/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId: visitorIdRef.current }),
      })
      if (res.ok) {
        const data = await res.json()
        setActive(data.active ?? 0)
        setTotal(data.total ?? 0)
      }
    } catch {
      // Network error — silently ignore
    }
  }, [])

  useEffect(() => {
    visitorIdRef.current = getVisitorId()

    // Initial heartbeat
    heartbeat()

    // Repeat every 30 s
    const interval = setInterval(heartbeat, 30_000)

    return () => clearInterval(interval)
  }, [heartbeat])

  return (
    <div className='visitor-counter' aria-label='Site visitor statistics'>
      {/* Total visitors */}
      <div className='visitor-counter__stat'>
        <span className='visitor-counter__icon'>
          <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
            <circle cx='9' cy='7' r='4' />
            <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
            <path d='M16 3.13a4 4 0 0 1 0 7.75' />
          </svg>
        </span>
        <span className='visitor-counter__value'>{animatedTotal.toLocaleString()}</span>
        <span className='visitor-counter__label'>visitors</span>
      </div>

      <span className='visitor-counter__divider' aria-hidden='true' />

      {/* Active right now */}
      <div className='visitor-counter__stat visitor-counter__stat--live'>
        <span className='visitor-counter__pulse' aria-hidden='true' />
        <span className='visitor-counter__value'>{animatedActive}</span>
        <span className='visitor-counter__label'>online now</span>
      </div>
    </div>
  )
}
