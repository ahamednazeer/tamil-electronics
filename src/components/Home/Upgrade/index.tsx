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
  profile_photo_url?: string
}

const Upgrade = () => {
  const { t } = useLanguage()
  const [reviews, setReviews] = useState<Review[]>([])
  const [rating, setRating] = useState<number | null>(null)
  const [total, setTotal] = useState<number | null>(null)

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
      }
    }

    loadReviews()
    return () => {
      active = false
    }
  }, [])

  const displayReviews: ReviewCard[] = reviews.length > 0 ? reviews : testimonials
  const displayStars = rating ? Math.round(rating) : 5

  return (
    <section className='py-10 sm:py-14 lg:py-16' id='reviews'>
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
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
          {displayReviews.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className='uiverse-card group focus:outline-none'
              tabIndex={0}>
              <div className='uiverse-card-content !gap-3 sm:!gap-4 mt-4'>
                <div className='icon-wrap relative flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full overflow-hidden border border-primary/20 shadow-[0_4px_12px_rgba(227,30,36,0.15)] transition-colors'>
                  {item.profile_photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.profile_photo_url} alt={item.author_name ?? item.name ?? ''} className='w-full h-full object-cover' />
                  ) : (
                    <div className='w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center'>
                      <Icon icon='mdi:account-circle' className='text-3xl sm:text-4xl text-primary' />
                    </div>
                  )}
                </div>
                <div className='flex flex-col items-center gap-1 px-2'>
                  <h4 className='text-theme text-lg sm:text-xl font-bold text-center line-clamp-1'>
                    {item.author_name ?? item.name}
                  </h4>
                  <div className='flex items-center justify-center gap-1'>
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        icon='mdi:star'
                        width='16'
                        height='16'
                        className={
                          i < (item.rating ?? 5)
                            ? 'text-primary'
                            : 'text-muted/40'
                        }
                      />
                    ))}
                  </div>
                </div>
                <div className='mt-2 opacity-50 flex items-center justify-center animate-bounce transition-opacity group-hover:opacity-0'>
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                     <path d="m6 9 6 6 6-6"/>
                   </svg>
                </div>
              </div>
              <div className='uiverse-card-details !justify-center !px-4 sm:!px-6'>
                <p className='text-muted text-[13px] sm:text-[15px] font-medium text-center leading-relaxed italic line-clamp-4'>
                  &quot;{item.text ?? item.quote}&quot;
                </p>
                <p className='text-primary text-xs sm:text-sm mt-3 font-semibold'>
                  {item.relative_time_description ?? item.role}
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
