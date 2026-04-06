'use client'

import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useLanguage } from '@/context/LanguageContext'
import { storeInfo } from '@/data/storeInfo'
import { trackEvent } from '@/lib/analytics'

const FloatingWhatsAppButton = () => {
  const { t } = useLanguage()
  return (
    <Link
      href={`https://wa.me/${storeInfo.whatsappNumber}`}
      target='_blank'
      rel='noopener noreferrer'
      className='fixed bottom-4 right-4 z-50 group sm:bottom-5 sm:right-5 lg:hidden'
      aria-label={t('header.whatsapp_short')}
      onClick={() => trackEvent('whatsapp_button_clicked')}>
      <span className='flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.35)] transition-transform duration-200 group-hover:-translate-y-0.5'>
        <Icon icon='mdi:whatsapp' className='text-3xl' />
      </span>
    </Link>
  )
}

export default FloatingWhatsAppButton
