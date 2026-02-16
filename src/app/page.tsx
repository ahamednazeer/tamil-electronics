import React from 'react'
import Hero from '@/components/Home/Hero'
import LocalServices from '@/components/Home/services'
import Work from '@/components/Home/work'
import Portfolio from '@/components/Home/portfolio'
import Upgrade from '@/components/Home/upgrade'
import PortfolioSlider from '@/components/Home/PortfolioSlider'
import ContactSection from '@/components/Home/contact'
import TimeLine from '@/components/Home/timeline'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title:
    'Tamil Electricals - Electrical & Electronics Shop in Virudhachalam | Wires, Fans, LED, Switches',
  description:
    'Tamil Electricals in Virudhachalam offers wires, fans, LED lights, switches, MCB, pipes, and more. Call or WhatsApp for pricing and availability.',
  keywords: [
    'Tamil Electricals',
    'Virudhachalam electrical shop',
    'Wires',
    'Fans',
    'LED',
    'Switches',
    'MCB',
    'Electrical materials',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title:
      'Tamil Electricals - Electrical & Electronics Shop in Virudhachalam | Wires, Fans, LED, Switches',
    description:
      'Tamil Electricals in Virudhachalam offers wires, fans, LED lights, switches, MCB, pipes, and more. Call or WhatsApp for pricing and availability.',
    url: '/',
    images: [
      {
        url: '/images/hero/banner-image.webp',
        width: 1200,
        height: 630,
        alt: 'Tamil Electricals storefront',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Tamil Electricals - Electrical & Electronics Shop in Virudhachalam | Wires, Fans, LED, Switches',
    description:
      'Tamil Electricals in Virudhachalam offers wires, fans, LED lights, switches, MCB, pipes, and more. Call or WhatsApp for pricing and availability.',
    images: ['/images/hero/banner-image.webp'],
  },
}

export default function Home() {
  return (
    <main>
      <Hero />
      <LocalServices />
      <Work />
      <Portfolio />
      <TimeLine />
      <PortfolioSlider />
      <Upgrade />
      <ContactSection />
    </main>
  )
}
