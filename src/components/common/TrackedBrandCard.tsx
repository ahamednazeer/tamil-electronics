'use client'

import Link from 'next/link'
import Image from 'next/image'
import posthog from 'posthog-js'

interface Brand {
  slug: string
  name: string
  logo: string
}

interface TrackedBrandCardProps {
  brand: Brand
  idx: number
}

export default function TrackedBrandCard({ brand, idx }: TrackedBrandCardProps) {
  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group"
      data-aos="fade-up"
      data-aos-delay={(idx % 6) * 50}
      onClick={() => posthog.capture('brand_card_clicked', { brand_name: brand.name, brand_slug: brand.slug })}
    >
      <div className="relative w-full aspect-[4/3] mb-3">
        <Image
          src={brand.logo}
          alt={brand.name}
          fill
          className="object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <span className="text-xs sm:text-sm font-semibold text-gray-800 text-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 disabled">
        {brand.name}
      </span>
    </Link>
  )
}
