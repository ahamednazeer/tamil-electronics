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
    <section className='py-10 sm:py-14 lg:py-16' id='about'>
      <div className='container px-4 sm:px-6'>
        <div className='text-center mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto'>
          <p className='text-primary text-sm sm:text-base font-semibold tracking-wider uppercase mb-2 sm:mb-3'>
            {t('about.subheading_start')} {t('about.subheading_highlight')}
          </p>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl text-theme font-bold tracking-tight mb-4 sm:mb-5 lg:mb-6'>
            {t('about.title')}
          </h2>
          <p className='text-muted/80 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto'>
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
              <div key={index} className='uiverse-card focus:outline-none' tabIndex={0}>
                <div className='uiverse-card-content'>
                  <div className='icon-wrap relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 shadow-sm transition-colors'>
                    <div className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                    <div 
                      className="w-[30px] h-[30px] bg-primary dark:bg-primary/90 relative z-10 transition-colors"
                      style={{
                        WebkitMaskImage: `url(${item.icon})`,
                        WebkitMaskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        maskImage: `url(${item.icon})`,
                        maskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        maskPosition: 'center',
                      }}
                      title={item.title}
                    />
                  </div>
                  <h4 className='text-theme text-lg sm:text-xl font-bold text-center'>
                    {item.title}
                  </h4>
                  <div className='mt-1 opacity-50 flex items-center justify-center animate-bounce transition-opacity'>
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                       <path d="m6 9 6 6 6-6"/>
                     </svg>
                  </div>
                </div>
                <div className='uiverse-card-details'>
                  <p className='text-white text-base sm:text-lg font-medium text-center leading-relaxed drop-shadow-md'>
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
