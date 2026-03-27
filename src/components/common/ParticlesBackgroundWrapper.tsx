'use client'

import dynamic from 'next/dynamic'

// Lazy-load Three.js-based ParticlesBackground to reduce initial bundle (~500KB)
const ClientParticlesBackground = dynamic(
  () => import('@/components/common/ParticlesBackground'),
  { ssr: false }
)

export default function ParticlesBackgroundWrapper() {
  return <ClientParticlesBackground />
}
