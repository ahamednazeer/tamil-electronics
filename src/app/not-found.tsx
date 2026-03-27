import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found | Tamil Electricals',
}

export default function NotFoundPage() {
  return (
    <section className='min-h-screen flex items-center justify-center bg-darkmode'>
      <div className='container px-4 text-center'>
        <h1 className='text-8xl font-bold text-primary mb-4'>404</h1>
        <h2 className='text-2xl sm:text-3xl text-white mb-4'>
          Page Not Found
        </h2>
        <p className='text-muted/60 mb-8 max-w-md mx-auto'>
          Oops! The page you are looking for does not exist.
          It might have been moved or deleted.
        </p>
        <Link
          href='/'
          className='inline-block bg-primary text-darkmode px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors'>
          Go To Home
        </Link>
      </div>
    </section>
  )
}