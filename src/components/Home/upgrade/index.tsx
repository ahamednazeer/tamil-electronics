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
    <section className='lg:py-10 md:py-8 py-6' id='reviews'>
      <div className='container px-4 sm:px-6'>
        <div className='text-center mb-4 sm:mb-6 lg:mb-7'>
          <p className='text-primary text-lg sm:text-xl lg:text-28 mb-2 sm:mb-3'>
            {t('reviews.subheading')}
          </p>
          <h2 className='text-white text-2xl sm:text-3xl lg:text-4xl font-medium mb-3 sm:mb-5'>
            {t('reviews.title')}
          </h2>
          <p className='text-muted/60 text-sm sm:text-base lg:text-lg'>
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
                      i < displayStars ? 'text-primary' : 'text-white/30'
                    }
                  />
                ))}
              </div>
              <span className='text-white text-sm sm:text-base font-semibold'>
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
                className='text-primary text-xs sm:text-sm font-semibold hover:text-white transition-colors'>
                {t('reviews.view_on_google')}
              </Link>
            </div>
          )}
          {showFallback && (
            <p className='text-muted/60 text-xs sm:text-sm mt-3'>
              {t('reviews.fallback_note')}
            </p>
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
        <style jsx global>{`
          @property --spotlight-angle {
            syntax: '<angle>';
            inherits: false;
            initial-value: 0deg;
          }

          .reviews-spotlight-card {
            --spotlight-bg: #0a1424;
            --spotlight-text: #f8fafc;
            --spotlight-muted: rgba(226, 232, 240, 0.72);
            --spotlight-accent: #ef4444;
            --spotlight-border: rgba(239, 68, 68, 0.22);
            --spotlight-glow: rgba(239, 68, 68, 0.22);
            --spotlight-highlight: rgba(239, 68, 68, 0);
            --spotlight-surface-start: rgba(239, 68, 68, 0.12);
            --spotlight-surface-end: rgba(239, 68, 68, 0.03);
            position: relative;
            width: 100%;
            border-radius: 26px;
            padding: 1px;
            overflow: visible;
            background: linear-gradient(
                145deg,
                var(--spotlight-surface-start),
                var(--spotlight-surface-end)
              )
              padding-box,
              conic-gradient(
                  from var(--spotlight-angle),
                  transparent 0deg,
                  var(--spotlight-highlight) 60deg,
                  transparent 120deg,
                  transparent 360deg
                )
                border-box,
              linear-gradient(
                  to bottom right,
                  var(--spotlight-border),
                  var(--spotlight-border)
                )
                border-box;
            animation: none;
            box-shadow: 0 10px 22px rgba(4, 10, 32, 0.2),
              0 18px 40px var(--spotlight-glow);
            border: 1px solid transparent;
            transition: border-color 0.25s ease, box-shadow 0.25s ease,
              transform 0.25s ease, background 0.25s ease;
          }

          [data-theme='light'] .reviews-spotlight-card {
            --spotlight-bg: #ffffff;
            --spotlight-text: #0f172a;
            --spotlight-muted: #475569;
            --spotlight-accent: #dc2626;
            --spotlight-border: rgba(220, 38, 38, 0.18);
            --spotlight-glow: rgba(220, 38, 38, 0.16);
            --spotlight-highlight: rgba(220, 38, 38, 0);
            --spotlight-surface-start: rgba(220, 38, 38, 0.08);
            --spotlight-surface-end: rgba(220, 38, 38, 0.02);
            box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08),
              0 18px 36px var(--spotlight-glow);
          }

          .reviews-spotlight-card::before {
            content: '';
            position: absolute;
            inset: -18%;
            background: radial-gradient(
              circle,
              var(--spotlight-glow),
              transparent 60%
            );
            filter: blur(22px);
            opacity: 0.45;
            z-index: 0;
          }

          .reviews-spotlight-card--active {
            --spotlight-border: rgba(239, 68, 68, 0.32);
            --spotlight-surface-start: rgba(239, 68, 68, 0.18);
            --spotlight-surface-end: rgba(239, 68, 68, 0.05);
            --spotlight-glow: rgba(239, 68, 68, 0.28);
            box-shadow: 0 14px 28px rgba(4, 10, 32, 0.22),
              0 22px 46px var(--spotlight-glow);
          }

          [data-theme='light'] .reviews-spotlight-card--active {
            --spotlight-border: rgba(220, 38, 38, 0.24);
            --spotlight-surface-start: rgba(220, 38, 38, 0.12);
            --spotlight-surface-end: rgba(220, 38, 38, 0.04);
            --spotlight-glow: rgba(220, 38, 38, 0.22);
            box-shadow: 0 14px 26px rgba(15, 23, 42, 0.1),
              0 22px 46px var(--spotlight-glow);
          }

          .reviews-spotlight-card--soft {
            --spotlight-glow: rgba(239, 68, 68, 0.1);
            --spotlight-surface-start: rgba(239, 68, 68, 0.06);
            --spotlight-surface-end: rgba(239, 68, 68, 0.02);
          }

          [data-theme='light'] .reviews-spotlight-card--soft {
            --spotlight-glow: rgba(220, 38, 38, 0.08);
            --spotlight-surface-start: rgba(220, 38, 38, 0.04);
            --spotlight-surface-end: rgba(220, 38, 38, 0.01);
          }

          .reviews-spotlight-card--soft::before {
            inset: -4%;
            opacity: 0.14;
            filter: blur(10px);
          }

          .reviews-spotlight-card--no-glow::before {
            opacity: 0;
          }

          .reviews-spotlight-card:hover {
            transform: translateY(-2px);
            --spotlight-border: rgba(239, 68, 68, 0.35);
            --spotlight-highlight: rgba(239, 68, 68, 0.7);
            --spotlight-surface-start: rgba(239, 68, 68, 0.18);
            --spotlight-surface-end: rgba(239, 68, 68, 0.06);
            --spotlight-glow: rgba(239, 68, 68, 0.3);
            box-shadow: 0 16px 34px rgba(4, 10, 32, 0.22),
              0 26px 54px var(--spotlight-glow);
            animation: spotlightSpin 4s linear infinite;
          }

          [data-theme='light'] .reviews-spotlight-card:hover {
            --spotlight-border: rgba(220, 38, 38, 0.28);
            --spotlight-highlight: rgba(220, 38, 38, 0.6);
            --spotlight-surface-start: rgba(220, 38, 38, 0.12);
            --spotlight-surface-end: rgba(220, 38, 38, 0.04);
            --spotlight-glow: rgba(220, 38, 38, 0.24);
            box-shadow: 0 16px 34px rgba(15, 23, 42, 0.1),
              0 26px 54px var(--spotlight-glow);
          }

          @media (prefers-reduced-motion: reduce) {
            .reviews-spotlight-card {
              transition: none;
            }
            .reviews-spotlight-card:hover {
              animation: none;
            }
          }

          .reviews-spotlight-grid {
            padding-bottom: 28px;
          }

          .reviews-spotlight-inner {
            position: relative;
            z-index: 1;
            background: var(--spotlight-bg);
            border-radius: 25px;
            padding: 26px 30px 24px;
            color: var(--spotlight-text);
            transition: background 0.25s ease;
          }

          .reviews-spotlight-inner--compact {
            padding: 20px 22px;
          }

          .reviews-spotlight-inner--roomy {
            padding: 20px 22px;
          }

          @media (min-width: 640px) {
            .reviews-spotlight-inner--compact {
              padding: 24px;
            }

            .reviews-spotlight-inner--roomy {
              padding: 24px 26px;
            }
          }

          @media (min-width: 1024px) {
            .reviews-spotlight-inner--roomy {
              padding: 32px;
            }
          }

          .reviews-spotlight-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
          }

          .reviews-spotlight-card:hover .reviews-spotlight-inner {
            background: #1b0f0f;
          }

          [data-theme='light'] .reviews-spotlight-card:hover .reviews-spotlight-inner {
            background: #fff1f1;
          }

          .reviews-spotlight-title {
            font-size: 1.75rem;
            font-weight: 600;
            color: var(--spotlight-text);
            letter-spacing: -0.02em;
          }

          .reviews-spotlight-role {
            margin-top: 2px;
            font-size: 0.9rem;
            color: var(--spotlight-muted);
          }

          .reviews-spotlight-desc {
            margin-top: 14px;
            color: var(--spotlight-muted);
            font-size: 1rem;
            line-height: 1.55;
          }

          .reviews-spotlight-meta {
            margin-top: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 0.95rem;
            color: var(--spotlight-muted);
          }

          .reviews-spotlight-meta svg {
            color: var(--spotlight-accent);
          }

          .reviews-spotlight-stars {
            display: flex;
            gap: 6px;
            margin-top: 14px;
          }

          .reviews-spotlight-star {
            color: var(--spotlight-accent);
          }

          .reviews-spotlight-star-muted {
            color: rgba(148, 163, 184, 0.6);
          }

          .reviews-spotlight-quote {
            margin-top: 14px;
            color: var(--spotlight-muted);
            font-size: 1rem;
            line-height: 1.55;
            font-style: normal;
          }

          @keyframes spotlightSpin {
            to {
              --spotlight-angle: 360deg;
            }
          }

          /* removed old mini-card styles */
        `}</style>
      </div>
    </section>
  )
}

export default Upgrade
