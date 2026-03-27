'use client'

import { ReactLenis } from 'lenis/react'

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 3.2, smoothWheel: false }}>
      {children}
    </ReactLenis>
  )
}