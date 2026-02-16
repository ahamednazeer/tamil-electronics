'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { dayLabels, storeInfo } from '@/data/storeInfo'
import { formatTime } from '@/utils/time'
import StoreStatus from './StoreStatus'
import InquiryForm from './InquiryForm'

const orderedDays = [1, 2, 3, 4, 5, 6, 0]

const ContactSection = () => {
  const { t, language } = useLanguage()
  const locale = language === 'ta' ? 'ta-IN' : 'en-IN'

  const hoursByDay = new Map(storeInfo.hours.map((hour) => [hour.day, hour]))
  const first = storeInfo.hours[0]
  const allSameHours = storeInfo.hours.every(
    (hour) => hour.opens === first.opens && hour.closes === first.closes
  )

  const closedDays = storeInfo.closedDays
    .slice()
    .sort((a, b) => a - b)
    .map((day) => t(`days.${dayLabels[day]}`))

  return (
    <section className='py-10 sm:py-12 lg:py-14' id='contact'>
      <div className='container px-4 sm:px-6'>
        <div className='text-center mb-6 sm:mb-8'>
          <p className='text-primary text-sm sm:text-base mb-2'>
            {t('contact.subheading')}
          </p>
          <h2 className='text-white text-2xl sm:text-3xl lg:text-4xl font-medium mb-3'>
            {t('contact.title')}
          </h2>
          <p className='text-muted/60 text-sm sm:text-base lg:text-lg'>
            {t('contact.description')}
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start'>
          <div className='lg:col-span-5 reviews-spotlight-card reviews-spotlight-card--soft reviews-spotlight-card--no-glow'>
            <div className='reviews-spotlight-inner reviews-spotlight-inner--roomy'>
              <div className='flex items-center justify-between gap-3 flex-wrap'>
                <h3 className='text-white text-xl font-semibold'>
                  {t('contact.store_info')}
                </h3>
                <StoreStatus />
              </div>
              <div className='mt-5 space-y-5'>
                <div className='flex items-start gap-3'>
                  <span className='p-2 rounded-lg bg-white/5 text-primary'>
                    <Icon icon='mdi:map-marker-radius' className='text-lg' />
                  </span>
                  <div>
                    <p className='text-white text-sm font-semibold'>
                      {t('contact.address')}
                    </p>
                    <Link
                      href={storeInfo.googleMapsUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-muted/70 text-sm hover:text-primary transition-colors'>
                      {storeInfo.address.streetAddress}
                      <br />
                      {storeInfo.address.addressLocality}, {storeInfo.address.addressRegion}{' '}
                      {storeInfo.address.postalCode}
                    </Link>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <span className='p-2 rounded-lg bg-white/5 text-primary'>
                    <Icon icon='mdi:phone' className='text-lg' />
                  </span>
                  <div>
                    <p className='text-white text-sm font-semibold'>
                      {t('contact.phone')}
                    </p>
                    <Link
                      href={`tel:${storeInfo.phoneE164}`}
                      className='text-muted/70 text-sm hover:text-primary transition-colors'>
                      {storeInfo.phoneDisplay}
                    </Link>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <span className='p-2 rounded-lg bg-white/5 text-primary'>
                    <Icon icon='mdi:clock-outline' className='text-lg' />
                  </span>
                  <div className='space-y-2'>
                    <p className='text-white text-sm font-semibold'>
                      {t('contact.hours')}
                    </p>
                    {allSameHours ? (
                      <p className='text-muted/70 text-sm'>
                        {t('contact.hours_daily')}{' '}
                        {formatTime(first.opens, locale)} -{' '}
                        {formatTime(first.closes, locale)}
                      </p>
                    ) : (
                      <div className='space-y-1'>
                        {orderedDays.map((day) => {
                          const hours = hoursByDay.get(day)
                          if (!hours) {
                            return (
                              <p key={day} className='text-muted/70 text-sm'>
                                {t(`days.${dayLabels[day]}`)}: {t('contact.closed')}
                              </p>
                            )
                          }
                          return (
                            <p key={day} className='text-muted/70 text-sm'>
                              {t(`days.${dayLabels[day]}`)}:{' '}
                              {formatTime(hours.opens, locale)} -{' '}
                              {formatTime(hours.closes, locale)}
                            </p>
                          )
                        })}
                      </div>
                    )}
                    <p className='text-muted/60 text-xs'>
                      {closedDays.length > 0
                        ? `${t('contact.closed_days')}: ${closedDays.join(', ')}`
                        : t('contact.open_daily')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='lg:col-span-7'>
            <InquiryForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
