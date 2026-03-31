'use client'

import { Icon } from '@iconify/react'
import { storeInfo } from '@/data/storeInfo'
import { trackEvent } from '@/lib/analytics'

interface BrandCtaButtonsProps {
  brandName: string
}

export default function BrandCtaButtons({ brandName }: BrandCtaButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full">
      <a
        href={`https://wa.me/${storeInfo.whatsappNumber}?text=Hi, I am looking for ${brandName} products in your shop.`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary flex items-center justify-center gap-2 py-3.5 px-7 text-base sm:text-lg font-medium shadow-lg shadow-primary/25"
        onClick={() => trackEvent('brand_whatsapp_clicked', { brand_name: brandName })}
      >
        <Icon icon="mdi:whatsapp" className="text-xl" />
        Inquire on WhatsApp
      </a>
      <a
        href={`tel:${storeInfo.phoneE164}`}
        className="btn btn-outline flex items-center justify-center gap-2 py-3.5 px-7 text-base sm:text-lg font-medium bg-[var(--theme-bg)]"
        onClick={() => trackEvent('brand_call_clicked', { brand_name: brandName })}
      >
        <Icon icon="mdi:phone" className="text-xl" />
        Call for Pricing
      </a>
    </div>
  )
}
