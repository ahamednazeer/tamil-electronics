'use client'
import { Icon } from '@iconify/react'
import { useLanguage } from '@/context/LanguageContext'

const Upgrade = () => {
  const { t } = useLanguage()

  const testimonials = [
    {
      quote: t('testimonials.items.0.quote'),
      name: "Rajesh K.",
      role: t('testimonials.items.0.role')
    },
    {
      quote: t('testimonials.items.1.quote'),
      name: "Priya M.",
      role: t('testimonials.items.1.role')
    },
    {
      quote: t('testimonials.items.2.quote'),
      name: "Kumar S.",
      role: t('testimonials.items.2.role')
    },
  ]

  return (
    <section className='lg:py-10 md:py-8 py-6' id='upgrade'>
      <div className='container px-4 sm:px-6'>
        <div className='text-center mb-4 sm:mb-6 lg:mb-7'>
          <p className='text-primary text-lg sm:text-xl lg:text-28 mb-2 sm:mb-3'>{t('testimonials.subheading')}</p>
          <h2 className='text-white text-2xl sm:text-3xl lg:text-4xl font-medium mb-3 sm:mb-5'>
            {t('testimonials.title')}
          </h2>
          <p className='text-muted/60 text-sm sm:text-base lg:text-lg'>
            {t('testimonials.description')}
          </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
          {testimonials.map((item, index) => (
            <div key={index} className='bg-light_grey/10 p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl'>
              <div className='flex mb-3 sm:mb-4'>
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    icon='mdi:star'
                    width='18'
                    height='18'
                    className='text-primary sm:w-5 sm:h-5 lg:w-6 lg:h-6'
                  />
                ))}
              </div>
              <p className='text-muted text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 italic'>&quot;{item.quote}&quot;</p>
              <div className='flex items-center gap-3 sm:gap-4'>
                <div className='w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0'>
                  <Icon icon='mdi:account' width='20' height='20' className='text-primary sm:w-6 sm:h-6' />
                </div>
                <div>
                  <h4 className='text-white text-sm sm:text-base lg:text-lg font-medium'>{item.name}</h4>
                  <p className='text-muted/60 text-xs sm:text-sm'>{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Upgrade
