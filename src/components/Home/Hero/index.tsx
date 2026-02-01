'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'

// Dynamically import slider to reduce initial JS bundle size
const CardSlider = dynamic(() => import('./slider'), {
  ssr: false, // Slider is client-side mostly anyway
  loading: () => <div className="h-24 w-full bg-transparent"></div> // Prevent layout shift
})

const Hero = () => {
  return (
    <section
      className='relative md:pt-32 lg:pt-40 md:pb-20 lg:pb-28 pt-16 pb-12 overflow-hidden z-1'
      id='main-banner'>
      <div className='container px-4 sm:px-6'>
        <div className='grid grid-cols-12 gap-4'>
          {/* Left content - no render-blocking animations */}
          <div className='lg:col-span-5 col-span-12 animate-fade-in'>
            <div className='flex gap-3 sm:gap-6 items-center lg:justify-start justify-center mb-4 sm:mb-5 mt-8 sm:mt-16 lg:mt-24'>
              <Image
                src='/images/icons/icon-bag.svg'
                alt='icon'
                width={32}
                height={32}
                priority
                className='w-8 h-8 sm:w-10 sm:h-10'
              />
              <p className='text-white text-base sm:text-xl lg:text-28 mb-0'>
                Your Trusted <span className='text-primary'>Electrical</span> Partner
              </p>
            </div>
            <h1 className='font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl lg:text-start text-center text-white mb-4 sm:mb-5 leading-tight'>
              All <span className='text-primary'>Electrical</span> Materials{' '}
              <span className='text-primary'>Available</span> Here!
            </h1>
            <p className='text-muted/80 text-sm sm:text-base lg:text-lg lg:text-start text-center mb-6 sm:mb-8 lg:mb-10 px-2 sm:px-0'>
              Wires • Switches • LED Lights • Fans • MCB • Industrial Electrical Items
            </p>
            <div className='flex flex-col sm:flex-row items-center md:justify-start justify-center gap-4 sm:gap-6 lg:gap-8'>
              <a
                href='tel:+91XXXXXXXXXX'
                className='w-full sm:w-auto bg-primary border border-primary rounded-lg text-base sm:text-lg lg:text-xl font-medium hover:bg-transparent hover:text-primary text-darkmode py-3 sm:py-2 px-6 sm:px-7 z-50 text-center'>
                Call Now
              </a>
              <a
                href='https://wa.me/91XXXXXXXXXX'
                target='_blank'
                rel='noopener noreferrer'
                className='w-full sm:w-auto bg-transparent border border-primary rounded-lg text-base sm:text-lg lg:text-xl font-medium hover:bg-primary hover:text-darkmode text-primary py-3 sm:py-2 px-6 sm:px-7 text-center'>
                WhatsApp Us
              </a>
            </div>
            <div className='grid grid-cols-3 gap-4 sm:gap-8 lg:gap-12 mt-10 sm:mt-16 lg:mt-20 md:justify-start justify-center'>
              <div className='text-center'>
                <p className='text-primary text-xl sm:text-2xl lg:text-3xl font-bold'>10+</p>
                <p className='text-muted text-xs sm:text-sm'>Years Experience</p>
              </div>
              <div className='text-center'>
                <p className='text-primary text-xl sm:text-2xl lg:text-3xl font-bold'>1000+</p>
                <p className='text-muted text-xs sm:text-sm'>Happy Customers</p>
              </div>
              <div className='text-center'>
                <p className='text-primary text-xl sm:text-2xl lg:text-3xl font-bold'>50+</p>
                <p className='text-muted text-xs sm:text-sm'>Brands Available</p>
              </div>
            </div>
          </div>
          {/* Right content - hero image */}
          <div className='col-span-7 lg:block hidden animate-fade-in'>
            <div className='ml-10 xl:ml-20 -mr-32 xl:-mr-64 flex justify-center relative'>
              {/* Creative card container with premium styling */}
              <div className='relative p-3 sm:p-4 lg:p-5 border border-primary/10 rounded-3xl bg-gradient-to-br from-dark_grey/50 to-dark_grey/20 backdrop-blur-md shadow-2xl shadow-primary/5 group hover:border-primary/30 transition-all duration-500'>
                {/* Decorative blur orbs - animated on hover */}
                <div className='absolute -top-16 -right-16 w-32 h-32 bg-primary/25 rounded-full blur-3xl group-hover:bg-primary/35 transition-all duration-700'></div>
                <div className='absolute -bottom-12 -left-12 w-28 h-28 bg-tealGreen/20 rounded-full blur-2xl group-hover:bg-tealGreen/30 transition-all duration-700'></div>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/5 rounded-full blur-3xl'></div>

                {/* Inner glow ring */}
                <div className='absolute inset-1 rounded-2xl border border-white/5 pointer-events-none'></div>

                {/* LCP Image with aggressive optimization */}
                <img
                  src='/images/hero/banner-image.png'
                  alt='Electrical Products'
                  width={1150}
                  height={1150}
                  loading='eager'
                  decoding='async'
                  fetchPriority='high'
                  className='w-full h-auto rounded-2xl relative z-10 group-hover:scale-[1.02] transition-transform duration-500'
                />
              </div>
            </div>
          </div>
        </div>
        <CardSlider />
      </div>
      <div className='absolute w-50 h-50 bg-linear-to-bl from-tealGreen from-50% to-charcoalGray to-60% blur-400 rounded-full -top-64 -right-14 -z-1'></div>
    </section>
  )
}

export default Hero

