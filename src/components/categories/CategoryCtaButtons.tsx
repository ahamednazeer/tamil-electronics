'use client'

import { Icon } from '@iconify/react'
import { storeInfo } from '@/data/storeInfo'
import { trackEvent } from '@/lib/analytics'

interface CategoryCtaButtonsProps {
  categoryName: string
}

export default function CategoryCtaButtons({ categoryName }: CategoryCtaButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full">
      <a
        href={`https://wa.me/${storeInfo.whatsappNumber}?text=Hi, I am inquiring about ${categoryName} in your store.`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary flex items-center justify-center gap-2 py-3.5 px-7 text-base sm:text-lg font-medium shadow-lg shadow-primary/25"
        onClick={() => trackEvent('category_whatsapp_clicked', { category_name: categoryName })}
      >
        <Icon icon="mdi:whatsapp" className="text-xl" />
        Inquire Rates
      </a>
      <a
        href={`tel:${storeInfo.phoneE164}`}
        className="btn btn-outline flex items-center justify-center gap-2 py-3.5 px-7 text-base sm:text-lg font-medium bg-[var(--theme-bg)]"
        onClick={() => trackEvent('category_call_clicked', { category_name: categoryName })}
      >
        <Icon icon="mdi:phone" className="text-xl" />
        Call Expert
      </a>
    </div>
  )
}
