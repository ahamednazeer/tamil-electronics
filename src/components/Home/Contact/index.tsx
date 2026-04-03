'use client'

import { useLanguage } from '@/context/LanguageContext'
import InquiryForm from './InquiryForm'
import LocationMapSection from './LocationMapSection'

const ContactSection = () => {
  const { t } = useLanguage()

  return (
    <section className='py-10 sm:py-14 lg:py-16' id='contact'>
      <div className='container px-4 sm:px-6'>
        <div className='text-center mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto'>
          <p className='text-primary text-sm sm:text-base font-semibold tracking-wider uppercase mb-2 sm:mb-3'>
            {t('contact.subheading')}
          </p>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl text-theme font-bold tracking-tight mb-4 sm:mb-5 lg:mb-6'>
            {t('contact.title')}
          </h2>
          <p className='text-muted/80 text-base sm:text-lg lg:text-xl'>
            {t('contact.description')}
          </p>
        </div>

        <div className='max-w-xl lg:max-w-2xl mx-auto'>
          <InquiryForm />
        </div>
        <LocationMapSection />
      </div>
    </section>
  )
}

export default ContactSection
