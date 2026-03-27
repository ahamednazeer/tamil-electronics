'use client'
import { Icon } from '@iconify/react'
import { useLanguage } from '@/context/LanguageContext'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { storeInfo } from '@/data/storeInfo'
import { motion, AnimatePresence } from 'framer-motion'

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
  const [showBreakdown, setShowBreakdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowBreakdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
            <div className='relative max-w-sm mx-auto' ref={dropdownRef}>
              <button
                onClick={() => setShowBreakdown(!showBreakdown)}
                className='mt-4 w-full flex items-center justify-center gap-2 sm:gap-3 flex-wrap p-2 sm:p-3 rounded-full hover:bg-theme-bg-secondary transition-colors group cursor-pointer border border-transparent hover:border-border/50'>
                <div className='flex items-center gap-1'>
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      icon='mdi:star'
                      width='18'
                      height='18'
                      className={i < displayStars ? 'text-primary' : 'text-muted/40'}
                    />
                  ))}
                </div>
                <span className='text-theme text-sm sm:text-base font-semibold'>
                  {rating.toFixed(1)}
                </span>
                {total && (
                  <span className='text-muted/60 text-xs sm:text-sm mr-2'>
                    {t('reviews.based_on').replace('{count}', String(total))}
                  </span>
                )}
                <Icon
                  icon='mdi:chevron-down'
                  className={`text-theme transition-transform duration-300 ${
                    showBreakdown ? 'rotate-180' : ''
                  }`}
                  width='20'
                  height='20'
                />
              </button>

              <AnimatePresence>
                {showBreakdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className='absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[280px] sm:w-[320px] bg-theme-bg-card border border-border/40 rounded-2xl shadow-xl p-5 z-50 text-left overflow-hidden'>
                    <h3 className='text-theme text-xl font-semibold mb-3 tracking-tight'>
                      Average Rating
                    </h3>
                    <div className='flex items-center gap-2 mb-6'>
                      <span className='text-theme text-3xl font-bold'>
                        {rating.toFixed(1)}
                      </span>
                      <div className='flex items-center gap-0.5 mt-1'>
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            icon={i < displayStars ? 'mdi:star' : i === displayStars ? 'mdi:star-half-full' : 'mdi:star-outline'}
                            width='16'
                            height='16'
                            className='text-secondary'
                          />
                        ))}
                      </div>
                    </div>

                    <div className='flex flex-col gap-3'>
                      {[
                        { star: 5, pct: 90 },
                        { star: 4, pct: 60 },
                        { star: 3, pct: 40 },
                        { star: 2, pct: 30 },
                        { star: 1, pct: 0 },
                      ].map((bar) => (
                        <div key={bar.star} className='flex items-center gap-3'>
                          <span className='text-theme text-sm font-medium w-4 shrink-0 text-center'>
                            {bar.star}
                          </span>
                          <div className='flex-1 h-2 bg-theme-bg-secondary rounded-full overflow-hidden'>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${bar.pct}%` }}
                              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                              className='h-full bg-[#1c5d41] rounded-full'
                            />
                          </div>
                          <span className='text-theme-muted text-xs font-medium w-8 shrink-0 text-right'>
                            {bar.pct}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className='mt-2'>
                <Link
                  href={storeInfo.googleMapsUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary text-xs sm:text-sm font-semibold hover:text-theme transition-colors'>
                  {t('reviews.view_on_google')}
                </Link>
              </div>
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
