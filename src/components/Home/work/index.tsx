'use client'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const Work = () => {
  const ref = useRef(null)
  const inView = useInView(ref)

  const TopAnimation = {
    initial: { y: '-100%', opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: '-100%', opacity: 0 },
    transition: { duration: 0.6, delay: 0.4 },
  }

  const bottomAnimation = {
    initial: { y: '100%', opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 },
    transition: { duration: 0.6, delay: 0.4 },
  }

  const services = [
    {
      icon: '/images/icons/icon-consulting.svg',
      text: 'Genuine Products',
      desc: 'Original and quality electrical materials',
    },
    {
      icon: '/images/icons/icon-blockchain.svg',
      text: 'Affordable Prices',
      desc: 'Competitive pricing for all needs',
    },
    {
      icon: '/images/icons/icon-Services.svg',
      text: 'All Major Brands',
      desc: 'Trusted electrical brands available',
    },
    {
      icon: '/images/icons/icon-consulting.svg',
      text: 'Quick Service',
      desc: 'Fast billing and friendly support',
    },
  ]

  return (
    <section className='lg:pt-28 md:pt-20 pt-12' id='products'>
      <div className='container px-4 sm:px-6 mx-auto lg:max-w-(--breakpoint-xl)'>
        <div ref={ref} className='grid grid-cols-12 items-center gap-6 lg:gap-0'>
          <motion.div
            {...bottomAnimation}
            className='lg:col-span-7 col-span-12'>
            <p className='text-lg sm:text-xl lg:text-28 text-white text-center lg:text-left'>
              Why Choose <span className='text-primary'>Us</span>
            </p>
            <h2 className='text-2xl sm:text-3xl lg:text-4xl text-white lg:w-full md:w-70% font-medium text-center lg:text-left'>
              Quality electrical materials for your every need.
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-7 mt-6 sm:mt-8 lg:mt-11'>
              {services.map((service, index) => (
                <div key={index} className='flex items-center gap-3 sm:gap-4 lg:gap-5'>
                  <div className='p-3 sm:p-4 lg:p-5 bg-light_grey/30 rounded-full flex-shrink-0'>
                    <Image
                      src={service.icon}
                      alt={`${service.text} icon`}
                      width={32}
                      height={32}
                      className='w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10'
                    />
                  </div>
                  <div>
                    <p className='text-base sm:text-lg lg:text-xl text-muted'>{service.text}</p>
                    <p className='text-xs sm:text-sm text-muted/60'>{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...TopAnimation} className='lg:col-span-5 col-span-12'>
            <div className='xl:-mr-40 mt-6 lg:mt-9 flex justify-center relative'>
              {/* Creative card container with premium styling */}
              <div className='relative p-3 sm:p-4 lg:p-5 border border-primary/10 rounded-3xl bg-gradient-to-br from-dark_grey/50 to-dark_grey/20 backdrop-blur-md shadow-2xl shadow-primary/5 group hover:border-primary/30 transition-all duration-500'>
                {/* Decorative blur orbs - animated on hover */}
                <div className='absolute -top-16 -right-16 w-32 h-32 bg-primary/25 rounded-full blur-3xl group-hover:bg-primary/35 transition-all duration-700'></div>
                <div className='absolute -bottom-12 -left-12 w-28 h-28 bg-tealGreen/20 rounded-full blur-2xl group-hover:bg-tealGreen/30 transition-all duration-700'></div>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/5 rounded-full blur-3xl'></div>

                {/* Inner glow ring */}
                <div className='absolute inset-1 rounded-2xl border border-white/5 pointer-events-none'></div>

                <Image
                  src='/images/work/img-work-with-us.png'
                  alt='Electrical Products Display'
                  width={600}
                  height={425}
                  className='w-full max-w-md lg:max-w-none lg:w-full rounded-2xl relative z-10 shadow-lg group-hover:scale-[1.02] transition-transform duration-500'
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Work
