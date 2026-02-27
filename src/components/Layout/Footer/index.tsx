'use client'
import React, { FC } from 'react'
import Link from 'next/link'
import { headerData } from '../Header/Navigation/menuData'
import { footerlabels } from '@/app/api/data'
import { Icon } from '@iconify/react'
import Logo from '../Header/Logo'
import { useLanguage } from '@/context/LanguageContext'
import { storeInfo } from '@/data/storeInfo'
import { formatTime } from '@/utils/time'

const Footer: FC = () => {
  const { t, language } = useLanguage()
  const locale = language === 'ta' ? 'ta-IN' : 'en-IN'
  const firstHour = storeInfo.hours[0]
  return (
    <footer className='site-footer pt-8 sm:pt-10 lg:pt-12' id='footer'>
      <div className='container px-4 sm:px-6'>
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 xl:gap-20 pb-10 sm:pb-12 lg:pb-16'>
          {/* Logo and About */}
          <div className='col-span-2 sm:col-span-2 md:col-span-6 lg:col-span-4'>
            <Logo />
            <div className='mt-4 sm:mt-6'>
              <p className='text-muted/80 text-sm sm:text-base lg:text-lg mb-1 sm:mb-2'>{t('footer.trusted_partner')}</p>
              <p className='text-muted/60 text-xs sm:text-sm lg:text-base'>{t('footer.now_open_desc')}</p>
            </div>
            <div className='flex gap-4 sm:gap-6 items-center mt-5 sm:mt-8 relative z-1'>
              <Link
                href='https://www.facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Facebook'
                className='group'>
                <Icon
                  icon='fa6-brands:facebook-f'
                  width='20'
                  height='20'
                  className='text-theme group-hover:text-primary sm:w-6 sm:h-6'
                />
              </Link>
              <Link
                href='https://www.instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Instagram'
                className='group'>
                <Icon
                  icon='fa6-brands:instagram'
                  width='20'
                  height='20'
                  className='text-theme group-hover:text-primary sm:w-6 sm:h-6'
                />
              </Link>
              <Link
                href={`https://wa.me/${storeInfo.whatsappNumber}`}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='WhatsApp'
                className='group'>
                <Icon
                  icon='fa6-brands:whatsapp'
                  width='20'
                  height='20'
                  className='text-theme group-hover:text-primary sm:w-6 sm:h-6'
                />
              </Link>
            </div>
            <h3 className='text-theme text-sm sm:text-lg lg:text-xl font-medium mt-6 sm:mt-10 lg:mt-20'>
              © 2025 Tamil Electricals
            </h3>
          </div>

          {/* Quick Links */}
          <div className='col-span-1 md:col-span-3 lg:col-span-2'>
            <h4 className='text-theme mb-3 sm:mb-4 font-medium text-base sm:text-lg lg:text-xl'>{t('footer.quick_links')}</h4>
            <ul>
              {headerData.map((item, index) => (
                <li key={index} className='pb-2 sm:pb-3 lg:pb-4'>
                  <Link
                    href={item.href}
                    className='text-theme hover:text-primary text-sm sm:text-base'>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div className='col-span-1 md:col-span-3 lg:col-span-2'>
            <h4 className='text-theme mb-3 sm:mb-4 font-medium text-base sm:text-lg lg:text-xl'>{t('footer.information')}</h4>
            <ul>
              {footerlabels.map((item, index) => (
                <li key={index} className='pb-2 sm:pb-3 lg:pb-4'>
                  <span className='text-muted/80 text-sm sm:text-base'>
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className='col-span-2 sm:col-span-2 md:col-span-12 lg:col-span-4'>
            <h3 className='text-theme text-base sm:text-lg lg:text-xl font-medium mb-4 sm:mb-5'>{t('footer.contact_us')}</h3>
            <div className='flex flex-col gap-6'>

              {/* Shop Address */}
              <div className='flex flex-col gap-2'>
                <p className='text-theme text-base font-medium'>{t('footer.shop_address')}</p>
                <p className='text-muted/80 text-sm leading-relaxed'>
                  {storeInfo.address.streetAddress}
                  <br />
                  {storeInfo.address.addressLocality}, {storeInfo.address.addressRegion},{' '}
                  {storeInfo.address.postalCode}
                </p>
              </div>

              {/* Phone */}
              <div className='flex flex-col gap-2'>
                <p className='text-theme text-base font-medium'>{t('footer.phone')}</p>
                <Link
                  href={`tel:${storeInfo.phoneE164}`}
                  className='text-muted/60 hover:text-primary text-sm transition-colors'
                >
                  {storeInfo.phoneDisplay}
                </Link>
              </div>

              {/* Working Hours */}
              <div className='flex flex-col gap-2'>
                <p className='text-theme text-base font-medium'>{t('footer.working_hours')}</p>
                <p className='text-muted/80 text-sm'>
                  {formatTime(firstHour.opens, locale)} - {formatTime(firstHour.closes, locale)}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
