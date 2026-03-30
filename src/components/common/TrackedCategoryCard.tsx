'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import posthog from 'posthog-js'

interface Category {
  slug: string
  name: string
  heroImage: string
  seoTitle: string
  keyFeatures: string[]
}

interface TrackedCategoryCardProps {
  category: Category
  idx: number
}

export default function TrackedCategoryCard({ category, idx }: TrackedCategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block bg-[var(--theme-bg-card)] rounded-3xl overflow-hidden border border-[var(--theme-border)] shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1"
      data-aos="fade-up"
      data-aos-delay={(idx % 4) * 50}
      onClick={() => posthog.capture('category_card_clicked', { category_name: category.name, category_slug: category.slug })}
    >
      <div className="relative h-48 sm:h-56 w-full overflow-hidden">
        <Image
          src={category.heroImage}
          alt={category.seoTitle}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h3 className="absolute bottom-4 left-5 right-5 text-white font-bold text-xl drop-shadow-md">
          {category.name}
        </h3>
      </div>
      <div className="p-5">
        <ul className="space-y-2 mb-4">
          {category.keyFeatures.slice(0, 3).map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-[var(--theme-text-muted)]">
              <Icon icon="mdi:check-circle-outline" className="text-primary shrink-0" />
              <span className="truncate">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center text-primary font-medium text-sm group-hover:underline">
          View Details <Icon icon="mdi:arrow-right" className="ml-1" />
        </div>
      </div>
    </Link>
  )
}
