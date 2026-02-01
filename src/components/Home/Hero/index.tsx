'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import CardSlider from './slider'

const Hero = () => {
  const leftAnimation = {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
    transition: { duration: 0.6 },
  }

  const rightAnimation = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <section
      className='relative md:pt-32 lg:pt-40 md:pb-20 lg:pb-28 pt-16 pb-12 overflow-hidden z-1'
      id='main-banner'>
      <div className='container px-4 sm:px-6'>
        <div className='grid grid-cols-12 gap-4'>
          <motion.div {...leftAnimation} className='lg:col-span-5 col-span-12'>
            <div className='flex gap-3 sm:gap-6 items-center lg:justify-start justify-center mb-4 sm:mb-5 mt-8 sm:mt-16 lg:mt-24'>
              <Image
                src='/images/icons/icon-bag.svg'
                alt='icon'
                width={32}
                height={32}
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
          </motion.div>
          <motion.div
            {...rightAnimation}
            className='col-span-7 lg:block hidden'>
            <div className='ml-10 xl:ml-20 -mr-32 xl:-mr-64'>
              <Image
                src='/images/hero/banner-image.png'
                alt='Electrical Products'
                width={1150}
                height={1150}
                className='w-full h-auto'
              />
            </div>
          </motion.div>
        </div>
        <CardSlider />
      </div>
      <div className='absolute w-50 h-50 bg-linear-to-bl from-tealGreen from-50% to-charcoalGray to-60% blur-400 rounded-full -top-64 -right-14 -z-1'></div>
    </section>
  )
}

export default Hero
