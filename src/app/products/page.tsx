import Work from '@/components/Home/work'
import Portfolio from '@/components/Home/portfolio'
import PortfolioSlider from '@/components/Home/PortfolioSlider'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Products | Tamil Electricals - Wires, LED, Fans, Switches & More',
  description:
    'Explore Tamil Electricals product range including wires, switches, LED lights, fans, MCBs, pipes, pumps, and more in Virudhachalam.',
  alternates: {
    canonical: '/products',
  },
}

export default function ProductsPage() {
  return (
    <main className='pt-24 sm:pt-26'>
      <Work />
      <Portfolio />
      <PortfolioSlider />
    </main>
  )
}
