import TimeLine from '@/components/Home/Timeline'
import Perks from '@/components/Home/Perks'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Tamil Electricals | Trusted Electrical Shop in Virudhachalam',
  description:
    'Learn about Tamil Electricals, a trusted local electrical & electronics shop in Virudhachalam offering quality products and expert guidance.',
  alternates: {
    canonical: '/about',
  },
}

export default function AboutPage() {
  return (
    <main className='pt-24 sm:pt-26'>
      <h1 className="sr-only">About Tamil Electricals - Virudhachalam's Trusted Electrical Shop</h1>
      <TimeLine />
      <Perks />
    </main>
  )
}
