'use client'
import { Icon } from '@iconify/react'
import { useLanguage } from '@/context/LanguageContext'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { storeInfo } from '@/data/storeInfo'

type Review = {
  author_name: string
  rating: number
  text: string
  relative_time_description?: string
  profile_photo_url?: string
}

type ReviewCard = {
  author_name?: string
  rating?: number
  text?: string
  relative_time_description?: string
  name?: string
  role?: string
  quote?: string
}

const Upgrade = () => {
  const { t } = useLanguage()
  const [reviews, setReviews] = useState<Review[]>([])
  const [rating, setRating] = useState<number | null>(null)
  const [total, setTotal] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  const testimonials: ReviewCard[] = [
    {
      quote: t('testimonials.items.0.quote'),
      name: 'Rajesh K.',
      role: t('testimonials.items.0.role'),
    },
    {
      quote: t('testimonials.items.1.quote'),
      name: 'Priya M.',
      role: t('testimonials.items.1.role'),
    },
    {
      quote: t('testimonials.items.2.quote'),
      name: 'Kumar S.',
      role: t('testimonials.items.2.role'),
    },
  ]

  useEffect(() => {
    let active = true
    const loadReviews = async () => {
      try {
        const response = await fetch('/api/google-reviews')
        const data = await response.json()
        if (!active) return
        setReviews(data.reviews ?? [])
        setRating(data.rating ?? null)
        setTotal(data.userRatingsTotal ?? null)
      } catch {
        if (!active) return
        setReviews([])
      } finally {
        if (!active) return
        setLoading(false)
      }
    }

    loadReviews()
    return () => {
      active = false
    }
  }, [])

  const showFallback = !loading && reviews.length === 0
  const displayReviews: ReviewCard[] = reviews.length > 0 ? reviews : testimonials
  const displayStars = rating ? Math.round(rating) : 5

  return (
    <section className='py-16 sm:py-20 lg:py-24' id='reviews'>
      <div className='container px-4 sm:px-6'>
        <div className='text-center mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto'>
          <p className='text-primary text-sm sm:text-base font-semibold tracking-wider uppercase mb-2 sm:mb-3'>
            {t('reviews.subheading')}
          </p>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl text-theme font-bold tracking-tight mb-4 sm:mb-5 lg:mb-6'>
            {t('reviews.title')}
          </h2>
          <p className='text-muted/80 text-base sm:text-lg lg:text-xl'>
            {t('reviews.description')}
          </p>
          {rating && (
            <div className='mt-4 flex items-center justify-center gap-3 flex-wrap'>
              <div className='flex items-center gap-1'>
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    icon='mdi:star'
                    width='18'
                    height='18'
                    className={
                      i < displayStars ? 'text-primary' : 'text-muted/40'
                    }
                  />
                ))}
              </div>
              <span className='text-theme text-sm sm:text-base font-semibold'>
                {rating.toFixed(1)}
              </span>
              {total && (
                <span className='text-muted/60 text-xs sm:text-sm'>
                  {t('reviews.based_on').replace('{count}', String(total))}
                </span>
              )}
              <Link
                href={storeInfo.googleMapsUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary text-xs sm:text-sm font-semibold hover:text-theme transition-colors'>
                {t('reviews.view_on_google')}
              </Link>
            </div>
          )}
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 reviews-spotlight-grid'>
          {displayReviews.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className={`reviews-spotlight-card ${
                index === 1 ? 'reviews-spotlight-card--active' : ''
              }`.trim()}>
              <div className='reviews-spotlight-inner'>
                <div className='reviews-spotlight-top'>
                  <div>
                    <h4 className='reviews-spotlight-title'>
                      {item.author_name ?? item.name}
                    </h4>
                    <p className='reviews-spotlight-role'>
                      {item.relative_time_description ?? item.role}
                    </p>
                  </div>
                </div>
                <div className='reviews-spotlight-stars'>
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      icon='mdi:star'
                      width='18'
                      height='18'
                      className={
                        i < (item.rating ?? 5)
                          ? 'reviews-spotlight-star'
                          : 'reviews-spotlight-star-muted'
                      }
                    />
                  ))}
                </div>
                <p className='reviews-spotlight-quote'>
                  &quot;{item.text ?? item.quote}&quot;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Upgrade
