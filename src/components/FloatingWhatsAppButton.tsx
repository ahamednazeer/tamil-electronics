'use client'

import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useLanguage } from '@/context/LanguageContext'
import { storeInfo } from '@/data/storeInfo'

const FloatingWhatsAppButton = () => {
  const { t } = useLanguage()
  return (
    <Link
      href={`https://wa.me/${storeInfo.whatsappNumber}`}
      target='_blank'
      rel='noopener noreferrer'
      className='fixed bottom-5 right-5 z-50 lg:hidden group'
      aria-label={t('header.whatsapp_short')}>
      <span className='flex items-center gap-2 rounded-full bg-[#25D366] text-white px-4 py-3 shadow-[0_12px_30px_rgba(37,211,102,0.35)] transition-transform duration-200 group-hover:-translate-y-0.5'>
        <Icon icon='mdi:whatsapp' className='text-xl' />
        <span className='text-sm font-semibold'>{t('contact.whatsapp_button')}</span>
      </span>
    </Link>
  )
}

export default FloatingWhatsAppButton
