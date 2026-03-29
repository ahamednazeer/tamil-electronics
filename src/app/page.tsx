import React from 'react'
import Hero from '@/components/Home/Hero'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'

const LocalServices = dynamic(() => import('@/components/Home/Services'))
const Work = dynamic(() => import('@/components/Home/Work'))
const Portfolio = dynamic(() => import('@/components/Home/Portfolio'))
const Upgrade = dynamic(() => import('@/components/Home/Upgrade'))
const PortfolioSlider = dynamic(() => import('@/components/Home/PortfolioSlider'))
const ContactSection = dynamic(() => import('@/components/Home/Contact'))
const TimeLine = dynamic(() => import('@/components/Home/Timeline'))
const Faq = dynamic(() => import('@/components/Home/Faq'))
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
      <Faq />
      <ContactSection />
    </main>
  )
}
