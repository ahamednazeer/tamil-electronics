'use client'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Icon } from '@iconify/react'
import { useLanguage } from '@/context/LanguageContext'

const Work = () => {
  const ref = useRef(null)
  const inView = useInView(ref)
  const { t } = useLanguage()

  const fadeInLeft = {
    initial: { x: -50, opacity: 0 },
    animate: inView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 },
    transition: { duration: 0.6, delay: 0.2 },
  }

  const fadeInRight = {
    initial: { x: 50, opacity: 0 },
    animate: inView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 },
    transition: { duration: 0.6, delay: 0.4 },
  }

  return (
    <section className='py-16 lg:py-24' id='products'>
      <div className='container px-4 sm:px-6 mx-auto'>
        <div ref={ref} className='grid grid-cols-12 items-center gap-8 lg:gap-12'>
          {/* Left Content */}
          <motion.div
            {...fadeInLeft}
            className='lg:col-span-6 col-span-12'>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl text-white font-bold leading-tight mb-6'>
              {t('work.title_start')}{' '}
              <span className='text-primary'>{t('work.title_highlight')}</span>{' '}
              {t('work.title_end')}
            </h2>
            <p className='text-muted text-base lg:text-lg mb-8 max-w-lg'>
              {t('work.description')}
            </p>

            {/* CTA Buttons - Exactly like reference */}
            <div className='flex flex-wrap items-center gap-4'>
              <a
                href='tel:+91XXXXXXXXXX'
                className='bg-primary text-white font-semibold py-3 px-8 rounded-lg hover:bg-primary-dark transition-all'>
                {t('work.contact_us')}
              </a>
              <a
                href='#about'
                className='flex items-center gap-3 text-white font-medium py-3 px-4 hover:text-primary transition-all'>
                <div className='w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center'>
                  <Icon icon='mdi:play' className='text-xl ml-0.5' />
                </div>
                {t('work.view_video')}
              </a>
            </div>
          </motion.div>

          {/* Right Content - Circular Image with Floating Icons */}
          <motion.div {...fadeInRight} className='lg:col-span-6 col-span-12'>
            <div className='relative flex justify-center lg:justify-end items-center'>
              {/* Container for circle and floating icons */}
              <div className='relative' style={{ width: '400px', height: '400px' }}>
                {/* Main Circular Image */}
                <div className='absolute inset-0 rounded-full border-8 border-white shadow-2xl overflow-hidden'>
                  <Image
                    src='/images/work/img-work-with-us.png'
                    alt='Electrical Work'
                    fill
                    className='object-cover'
                  />
                </div>

                {/* Floating Icon 1 - Tools (top left, on circle edge) */}
                <div
                  className='absolute flex items-center justify-center z-20'
                  style={{
                    width: '56px',
                    height: '56px',
                    top: '1px',
                    left: '65px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.12)'
                  }}
                >
                  <div className='relative w-8 h-8'>
                    <Image
                      src='/images/perks/hammer.png'
                      alt='Tools'
                      fill
                      className='object-contain'
                    />
                  </div>
                </div>

                {/* Floating Icon 2 - Power Plug (left side, on circle edge) */}
                <div
                  className='absolute flex items-center justify-center z-20'
                  style={{
                    width: '56px',
                    height: '56px',
                    top: '110px',
                    left: '-15px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.12)'
                  }}
                >
                  <div className='relative w-8 h-8'>
                    <Image
                      src='/images/perks/switch.png'
                      alt='Switch'
                      fill
                      className='object-contain'
                    />
                  </div>
                </div>

                {/* Floating Icon 3 - Screwdriver (lower left, on circle edge) */}
                <div
                  className='absolute flex items-center justify-center z-20'
                  style={{
                    width: '56px',
                    height: '56px',
                    top: '275px',
                    left: '3px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.12)'
                  }}
                >
                  <div className='relative w-8 h-8'>
                    <Image
                      src='/images/perks/bulb.png'
                      alt='Bulb'
                      fill
                      className='object-contain'
                    />
                  </div>
                </div>

                {/* Floating Icon 4 - Cog (bottom, on circle edge) */}
                <div
                  className='absolute flex items-center justify-center z-20'
                  style={{
                    width: '56px',
                    height: '56px',
                    top: '360px',
                    left: '95px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.12)'
                  }}
                >
                  <div className='relative w-8 h-8'>
                    <Image
                      src='/images/perks/fan.png'
                      alt='Fan'
                      fill
                      className='object-contain'
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Work
