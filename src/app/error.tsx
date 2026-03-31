'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { trackEvent } from '@/lib/analytics'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to PostHog
    trackEvent('app_error_boundary_triggered', { 
        error_message: error.message,
        digest: error.digest 
    })
    console.error('Unhandled App Error:', error)
  }, [error])

  return (
    <section className='min-h-[85vh] flex items-center justify-center relative overflow-hidden bg-[var(--theme-bg)] py-20' id='error-page'>
      {/* Background glowing effects */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none' aria-hidden='true'></div>
      
      <div className='container max-w-2xl px-4 relative z-10 text-center animate-fade-in'>
        <div className='mb-6 relative inline-flex justify-center items-center'>
          {/* Pulsing background circle behind icon */}
          <div className='absolute w-28 h-28 sm:w-32 sm:h-32 bg-primary/10 rounded-full animate-pulse' style={{ animationDuration: '2s' }}></div>
          <Icon icon="mdi:lightning-bolt" className='text-[5.5rem] sm:text-[7rem] text-primary drop-shadow-[0_0_20px_rgba(227,30,36,0.4)] relative z-10 animate-bounce' style={{ animationDuration: '2s' }} />
        </div>
        
        <h1 className='text-4xl sm:text-5xl md:text-6xl font-black text-theme tracking-tight mb-3'>
          System Overload!
        </h1>
        <h2 className='text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500 mb-6'>
           We experienced a short circuit.
        </h2>
        
        <div className='text-muted/80 text-sm sm:text-base lg:text-lg mb-10 max-w-lg mx-auto leading-relaxed border border-[var(--theme-border)] bg-[var(--theme-bg-card)]/60 backdrop-blur-sm p-5 sm:p-6 rounded-2xl shadow-sm'>
          <p>Something went wrong in our system. Our technicians have been notified automatically.</p>
          <p className='mt-2 text-xs opacity-70'>Error: {error.message || 'Unknown fault'}</p>
        </div>
        
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
          <button
            onClick={() => reset()}
            className='btn btn-primary px-8 py-3.5 shadow-xl shadow-primary/20 hover:-translate-y-1 w-full sm:w-auto text-base sm:text-lg'>
            <Icon icon="mdi:restart" className='text-xl' />
            Try Again
          </button>
          <Link
            href='/'
            className='btn btn-outline bg-[var(--theme-bg)] px-8 py-3.5 w-full sm:w-auto text-base sm:text-lg'>
            <Icon icon="mdi:home-outline" className='text-xl' />
            Return Home
          </Link>
        </div>
      </div>
    </section>
  )
}
