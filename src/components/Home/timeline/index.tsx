'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRef } from 'react'


const TimeLine = () => {
  const ref = useRef(null)

  const features = [
    {
      icon: '/images/timeline/icon-planning.svg',
      title: 'Quality Products',
      text: 'We provide only genuine and certified electrical materials',
    },
    {
      icon: '/images/timeline/icon-refinement.svg',
      title: 'Expert Guidance',
      text: 'Our team helps you choose the right products',
    },
    {
      icon: '/images/timeline/icon-prototype.svg',
      title: 'Wide Range',
      text: 'All types of electrical materials under one roof',
    },
    {
      icon: '/images/timeline/icon-support.svg',
      title: 'Local Trust',
      text: 'Serving the community for over 10 years',
    },
  ]

  return (
    <section className='lg:pt-12 md:pt-10 pt-8' id='about'>
      <div className='container px-4 sm:px-6 lg:px-16'>
        <div className='text-center'>
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.6 }}>
            <p className='text-muted text-lg sm:text-xl lg:text-28 mb-4 sm:mb-6 lg:mb-9'>
              About <span className='text-primary'>Tamil Electricals</span>
            </p>
            <h2 className='text-white text-2xl sm:text-3xl lg:text-4xl font-medium lg:w-80% mx-auto mb-6 sm:mb-8 lg:mb-10 px-2'>
              Your trusted local electrical shop serving for over 10 years.
            </h2>
            <p className='text-muted/60 text-sm sm:text-base lg:text-lg lg:w-70% mx-auto mb-6 sm:mb-8 lg:mb-10 px-2'>
              Tamil Electricals provides quality wires, switches, LED lights, fans, MCBs,
              and all types of electrical materials for homes, shops, and industries.
              We are committed to offering genuine products at competitive prices with excellent customer service.
            </p>
          </motion.div>
          <motion.div
            whileInView={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6 }}>
            <div ref={ref} className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
              {features.map((item, index) => (
                <div key={index} className='flex flex-col items-center gap-3 sm:gap-4 lg:gap-6 p-4 sm:p-5 lg:p-6 bg-light_grey/10 rounded-xl sm:rounded-2xl'>
                  <div className='bg-light_grey/45 p-3 sm:p-4 lg:p-6 rounded-full'>
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={32}
                      height={32}
                      className='timeline-icon w-6 h-6 sm:w-8 sm:h-8 lg:w-11 lg:h-11'
                    />
                  </div>
                  <div className='text-center'>
                    <h4 className='text-base sm:text-lg lg:text-2xl text-muted mb-1 sm:mb-2'>{item.title}</h4>
                    <p className='text-muted/60 text-xs sm:text-sm lg:text-base'>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TimeLine
