'use client'
import React, { FC } from 'react'
import Link from 'next/link'
import { headerData } from '../Header/Navigation/menuData'

import { Icon } from '@iconify/react'
import Logo from '../Header/Logo'
import { useLanguage } from '@/context/LanguageContext'
import { storeInfo } from '@/data/storeInfo'
import posthog from 'posthog-js'
import { locationsData } from '@/data/locations'
import { formatTime } from '@/lib/time'
import VisitorCounter from '@/components/common/VisitorCounter'

const socialLinks = [
  {
    href: 'https://www.facebook.com',
    icon: 'fa6-brands:facebook-f',
    label: 'Facebook',
    hoverColor: '#1877F2',
  },
  {
    href: 'https://www.instagram.com',
    icon: 'fa6-brands:instagram',
    label: 'Instagram',
    hoverColor: '#E4405F',
  },
  {
    href: `https://wa.me/${storeInfo.whatsappNumber}`,
    icon: 'fa6-brands:whatsapp',
    label: 'WhatsApp',
    hoverColor: '#25D366',
  },
]

const Footer: FC = () => {
  const { t, language } = useLanguage()
  const locale = language === 'ta' ? 'ta-IN' : 'en-IN'
  const firstHour = storeInfo.hours[0]

  return (
    <footer className='site-footer relative overflow-hidden' id='footer'>
      {/* Decorative gradient orbs */}
      <div className='footer-orb footer-orb--primary' aria-hidden='true' />
      <div className='footer-orb footer-orb--accent' aria-hidden='true' />

      {/* Top accent line */}
      <div className='footer-accent-line' aria-hidden='true' />

      <div className='container px-4 sm:px-6 relative z-[1]'>
        {/* Main footer grid */}
        <div className='grid grid-cols-2 md:grid-cols-12 gap-6 lg:gap-10 pt-8 sm:pt-10 pb-6 sm:pb-8'>

          {/* Brand Column */}
          <div className='col-span-2 md:col-span-6 lg:col-span-4'>
            <Logo />
            <p className='footer-tagline mt-3 text-sm leading-relaxed max-w-sm'>
              {t('footer.trusted_partner')}
            </p>
            <p className='text-[var(--theme-text-muted)] text-xs mt-1 max-w-xs leading-relaxed'>
              {t('footer.now_open_desc')}
            </p>

            {/* Social Icons — Premium pill style */}
            <div className='flex gap-2.5 mt-4'>
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={social.label}
                  className='footer-social-icon group'
                  style={{ '--social-hover': social.hoverColor } as React.CSSProperties}
                >
                  <Icon
                    icon={social.icon}
                    width='18'
                    height='18'
                    className='relative z-[1] transition-transform duration-300 group-hover:scale-110'
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className='col-span-1 md:col-span-3 lg:col-span-2'>
            <h4 className='footer-heading'>{t('footer.quick_links')}</h4>
            <ul className='mt-3 space-y-2'>
              {headerData.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className='footer-link group'
                  >
                    <span className='footer-link-dot' />
                    {t(`menu.${item.label.toLowerCase()}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div className='col-span-1 md:col-span-3 lg:col-span-2'>
            <h4 className='footer-heading'>{t('footer.information')}</h4>
            <ul className='mt-3 space-y-2'>
              <li className='footer-info-item'>
                <Icon icon='mdi:check-circle-outline' width='14' height='14' className='text-[var(--theme-primary)] mt-0.5 shrink-0' />
                <span>{t('footer.info_brands')}</span>
              </li>
              <li className='footer-info-item'>
                <Icon icon='mdi:check-circle-outline' width='14' height='14' className='text-[var(--theme-primary)] mt-0.5 shrink-0' />
                <span>{t('footer.info_genuine')}</span>
              </li>
              <li className='footer-info-item'>
                <Icon icon='mdi:check-circle-outline' width='14' height='14' className='text-[var(--theme-primary)] mt-0.5 shrink-0' />
                <span>{t('footer.info_wholesale')}</span>
              </li>
            </ul>

            <h4 className='footer-heading mt-6 pt-2 border-t border-[var(--theme-border)]/50'>Service Areas</h4>
            <div className='mt-4 flex flex-wrap gap-2'>
              {locationsData.map((location) => (
                <Link 
                  key={location.slug} 
                  href={`/locations/${location.slug}`}
                  className='text-[var(--theme-text-muted)] hover:text-primary hover:border-primary/40 text-[11px] font-medium bg-[var(--theme-bg-card)] border border-[var(--theme-border)] transition-colors px-2.5 py-1 rounded-full whitespace-nowrap'
                >
                  {location.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className='col-span-2 md:col-span-12 lg:col-span-4'>
            <h4 className='footer-heading'>{t('footer.contact_us')}</h4>
            <div className='mt-3 space-y-1'>
              {/* Address */}
              <div className='footer-contact-card group'>
                <div className='footer-contact-icon-wrap'>
                  <Icon icon='mdi:map-marker-outline' width='20' height='20' />
                </div>
                <div>
                  <p className='text-[var(--theme-text)] text-sm font-medium mb-1'>{t('footer.shop_address')}</p>
                  <p className='text-[var(--theme-text-muted)] text-xs sm:text-sm leading-relaxed'>
                    {storeInfo.address.streetAddress}<br />
                    {storeInfo.address.addressLocality}, {storeInfo.address.addressRegion}, {storeInfo.address.postalCode}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <Link href={`tel:${storeInfo.phoneE164}`} className='footer-contact-card group cursor-pointer' onClick={() => posthog.capture('footer_phone_clicked')}>
                <div className='footer-contact-icon-wrap'>
                  <Icon icon='mdi:phone-outline' width='20' height='20' />
                </div>
                <div>
                  <p className='text-[var(--theme-text)] text-sm font-medium mb-1'>{t('footer.phone')}</p>
                  <p className='text-[var(--theme-text-muted)] text-xs sm:text-sm group-hover:text-[var(--theme-primary)] transition-colors'>
                    {storeInfo.phoneDisplay}
                  </p>
                </div>
              </Link>

              {/* Working Hours */}
              <div className='footer-contact-card group'>
                <div className='footer-contact-icon-wrap'>
                  <Icon icon='mdi:clock-outline' width='20' height='20' />
                </div>
                <div>
                  <p className='text-[var(--theme-text)] text-sm font-medium mb-1'>{t('footer.working_hours')}</p>
                  <p className='text-[var(--theme-text-muted)] text-xs sm:text-sm'>
                    {formatTime(firstHour.opens, locale)} – {formatTime(firstHour.closes, locale)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='footer-bottom-bar'>
          <p className='text-[var(--theme-text-muted)] text-xs sm:text-sm'>
            © {new Date().getFullYear()} Tamil Electricals. {t('footer.trusted_partner') ? 'All rights reserved.' : ''}
          </p>
          <VisitorCounter />
        </div>
      </div>
    </footer>
  )
}

export default Footer
