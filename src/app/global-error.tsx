'use client'

import { useEffect } from 'react'
import { Icon } from '@iconify/react'
import { trackEvent } from '@/lib/analytics'
import '@/styles/globals.css'

export default function GlobalError({
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
        digest: error.digest,
        type: 'global_error'
    })
    console.error('Unhandled Global Error:', error)
  }, [error])

  return (
    <html lang="en">
      <body className="bg-white dark:bg-[#000510] text-[#0f172a] dark:text-[#f8fafc] font-sans antialiased selection:bg-red-500/30">
        <section className='min-h-screen flex items-center justify-center relative overflow-hidden bg-[var(--theme-bg)] py-20'>
          {/* Background glowing effects */}
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none' aria-hidden='true'></div>
          
          <div className='container max-w-2xl px-4 relative z-10 text-center'>
            <div className='mb-6 relative inline-flex justify-center items-center'>
              <div className='absolute w-28 h-28 sm:w-32 sm:h-32 bg-red-600/10 rounded-full animate-pulse' style={{ animationDuration: '2s' }}></div>
              <Icon icon="mdi:alert-circle-outline" className='text-[5.5rem] sm:text-[7rem] text-[#e31e24] drop-shadow-[0_0_20px_rgba(227,30,36,0.4)] relative z-10 animate-bounce' style={{ animationDuration: '2.5s' }} />
            </div>
            
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-black text-theme tracking-tight mb-3'>
              Major Fault
            </h1>
            <h2 className='text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#e31e24] to-orange-500 mb-6'>
               A critical system failure occurred.
            </h2>
            
            <div className='text-muted/80 text-sm sm:text-base lg:text-lg mb-10 max-w-lg mx-auto leading-relaxed border border-[var(--theme-border)] bg-[var(--theme-bg-card)]/60 backdrop-blur-sm p-5 sm:p-6 rounded-2xl shadow-sm'>
              <p>A fatal error prevented the application from loading. Please refresh the page.</p>
            </div>
            
            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
              <button
                onClick={() => reset()}
                className='inline-flex items-center justify-center gap-2 rounded-xl bg-[#e31e24] text-white font-semibold px-8 py-3.5 shadow-xl shadow-red-500/20 hover:-translate-y-1 transition-all w-full sm:w-auto text-base sm:text-lg'>
                <Icon icon="mdi:refresh" className='text-xl' />
                Refresh Page
              </button>
            </div>
          </div>
        </section>
      </body>
    </html>
  )
}
