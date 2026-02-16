import ContactSection from '@/components/Home/contact'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Tamil Electricals | Call or WhatsApp in Virudhachalam',
  description:
    'Contact Tamil Electricals for pricing and availability. Call or WhatsApp our Virudhachalam electrical & electronics shop.',
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return (
    <main className='pt-24 sm:pt-26'>
      <ContactSection />
    </main>
  )
}
