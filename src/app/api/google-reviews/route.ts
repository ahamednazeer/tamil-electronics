import { NextResponse } from 'next/server'

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY
const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID

type GoogleReview = {
  author_name?: string
  rating?: number
  text?: string
  relative_time_description?: string
  profile_photo_url?: string
}

type GooglePlaceResult = {
  rating?: number
  user_ratings_total?: number
  reviews?: GoogleReview[]
}

type GooglePlaceResponse = {
  result?: GooglePlaceResult
}

export async function GET() {
  if (!GOOGLE_API_KEY || !GOOGLE_PLACE_ID) {
    return NextResponse.json({
      rating: null,
      userRatingsTotal: null,
      reviews: [],
      error: 'missing_config',
    })
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=name,rating,user_ratings_total,reviews&key=${GOOGLE_API_KEY}`

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } })
    if (!response.ok) {
      return NextResponse.json({
        rating: null,
        userRatingsTotal: null,
        reviews: [],
        error: 'fetch_failed',
      })
    }

    const data = (await response.json()) as GooglePlaceResponse
    const result = data?.result ?? {}

    const reviews = Array.isArray(result.reviews)
      ? result.reviews.slice(0, 6).map((review) => ({
          author_name: review.author_name,
          rating: review.rating,
          text: review.text,
          relative_time_description: review.relative_time_description,
          profile_photo_url: review.profile_photo_url,
        }))
      : []

    return NextResponse.json({
      rating: result.rating ?? null,
      userRatingsTotal: result.user_ratings_total ?? null,
      reviews,
    })
  } catch {
    return NextResponse.json({
      rating: null,
      userRatingsTotal: null,
      reviews: [],
      error: 'exception',
    })
  }
}
