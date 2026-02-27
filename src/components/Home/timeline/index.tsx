'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

const TimeLine = () => {
  const { t } = useLanguage()

  const features = [
    {
      icon: '/images/timeline/icon-planning.svg',
      title: t('about.features.0.title'),
      text: t('about.features.0.text'),
    },
    {
      icon: '/images/timeline/icon-refinement.svg',
      title: t('about.features.1.title'),
      text: t('about.features.1.text'),
    },
    {
      icon: '/images/timeline/icon-prototype.svg',
      title: t('about.features.2.title'),
      text: t('about.features.2.text'),
    },
    {
      icon: '/images/timeline/icon-support.svg',
      title: t('about.features.3.title'),
      text: t('about.features.3.text'),
    },
  ]

  return (
    <section className='py-10 sm:py-12 lg:py-14' id='about'>
      <div className='container px-4 sm:px-6'>
        <div className='text-center mb-6 sm:mb-8'>
          <p className='text-muted text-sm sm:text-base mb-2'>
            {t('about.subheading_start')}{' '}
            <span className='text-primary'>{t('about.subheading_highlight')}</span>
          </p>
          <h2 className='text-theme text-2xl sm:text-3xl lg:text-4xl font-medium mb-3 sm:mb-4'>
            {t('about.title')}
          </h2>
          <p className='text-muted/60 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto'>
            {t('about.description')}
          </p>
        </div>

        <motion.div
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
            {features.map((item, index) => (
              <div key={index} className='reviews-spotlight-card'>
                <div className='reviews-spotlight-inner reviews-spotlight-inner--compact'>
                  <div className='flex items-center gap-3 mb-3 sm:mb-4'>
                    <div className='flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 border border-primary/30'>
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={24}
                        height={24}
                        sizes='24px'
                        className='h-6 w-6 brightness-0 saturate-100 dark:brightness-100 dark:invert'
                      />
                    </div>
                    <h4 className='text-theme text-base sm:text-lg font-semibold'>
                      {item.title}
                    </h4>
                  </div>
                  <p className='text-muted/60 text-sm sm:text-base'>
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TimeLine
