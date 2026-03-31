import Link from 'next/link'
import { Metadata } from 'next'
import { Icon } from '@iconify/react'

export const metadata: Metadata = {
  title: '404 - Circuit Broken | Tamil Electricals',
  description: 'The page you are looking for does not exist. Looks like a short circuit!',
}

export default function NotFoundPage() {
  return (
    <section className='min-h-[85vh] flex items-center justify-center relative overflow-hidden bg-[var(--theme-bg)]' id='not-found-page'>
      {/* Background glowing effects */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-primary/5 rounded-full blur-[80px] pointer-events-none' aria-hidden='true'></div>
      
      <div className='container max-w-2xl px-4 relative z-10 text-center animate-fade-in'>
        <div className='mb-8 relative inline-flex justify-center items-center'>
          {/* Pulsing background circle behind icon */}
          <div className='absolute w-28 h-28 sm:w-36 sm:h-36 bg-primary/10 rounded-full animate-ping' style={{ animationDuration: '3s' }}></div>
          <Icon icon="mdi:power-plug-off" className='text-[6rem] sm:text-[8rem] text-primary drop-shadow-[0_0_15px_rgba(227,30,36,0.35)] relative z-10' />
        </div>
        
        <h1 className='text-6xl sm:text-8xl font-black text-theme tracking-tight mb-2 drop-shadow-sm'>
          404
        </h1>
        <h2 className='text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500 mb-4 inline-block pb-1'>
           Circuit Broken!
        </h2>
        
        <p className='text-muted text-lg mb-10 max-w-md mx-auto leading-relaxed'>
          Oops! The page you are looking for does not exist. It might have been moved, deleted, or perhaps the wiring is loose.
        </p>
        
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
          <Link
            href='/'
            className='btn btn-primary px-8 py-3.5 shadow-xl shadow-primary/20 hover:-translate-y-1 w-full sm:w-auto text-base sm:text-lg'>
            <Icon icon="mdi:home-lightning-bolt-outline" className='text-xl' />
            Back to Home
          </Link>
          <a
            href='/contact'
            className='btn btn-outline bg-[var(--theme-bg)] px-8 py-3.5 w-full sm:w-auto text-base sm:text-lg'>
            <Icon icon="mdi:tools" className='text-xl' />
            Report Issue
          </a>
        </div>
      </div>
    </section>
  )
}
