'use client'

import { Icon } from '@iconify/react'
import { storeInfo } from '@/data/storeInfo'
import posthog from 'posthog-js'

interface LocationCtaButtonProps {
  locationName: string
  googleMapsUrl: string
}

export default function LocationCtaButton({ locationName, googleMapsUrl }: LocationCtaButtonProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <a
        href={`https://wa.me/${storeInfo.whatsappNumber}?text=Hi, I need electrical/plumbing supplies delivered to ${locationName}.`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary flex items-center justify-center gap-2 py-3.5 px-7 text-lg font-medium shadow-xl shadow-primary/20"
        onClick={() => posthog.capture('location_whatsapp_clicked', { location_name: locationName })}
      >
        <Icon icon="mdi:whatsapp" className="text-2xl" />
        WhatsApp us for {locationName} Supply
      </a>
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline flex items-center justify-center gap-2 py-3.5 px-7 text-lg font-medium bg-[var(--theme-bg)]"
        onClick={() => posthog.capture('location_maps_clicked', { location_name: locationName })}
      >
        <Icon icon="mdi:map-marker-path" className="text-2xl" />
        Navigate to Warehouse
      </a>
    </div>
  )
}
