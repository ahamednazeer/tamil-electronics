import React from 'react'
import Hero from '@/components/Home/Hero'
import IntroOverlay from '@/components/IntroOverlay'
import LocalServices from '@/components/Home/services'
import Work from '@/components/Home/work'
import Portfolio from '@/components/Home/portfolio'
import Upgrade from '@/components/Home/upgrade'
import PortfolioSlider from '@/components/Home/PortfolioSlider'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Tamil Electricals | Best Electrical Shop in Town',
  description: 'Tamil Electricals provides wires, switches, LED lights, fans, MCB, and electrical materials. Trusted local shop for quality and affordable products.',
}

export default function Home() {
  return (
    <main>
      <IntroOverlay />
      <Hero />
      <LocalServices />
      <Work />
      <Portfolio />
      <Upgrade />
      <PortfolioSlider />
    </main>
  )
}
