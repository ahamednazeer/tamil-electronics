import TimeLine from '@/components/Home/timeline'
import Perks from '@/components/Home/perks'
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
      <TimeLine />
      <Perks />
    </main>
  )
}
