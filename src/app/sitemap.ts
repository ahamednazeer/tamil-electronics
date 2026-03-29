import type { MetadataRoute } from 'next'
import { brandsData } from '@/data/brands'
import { categoriesData } from '@/data/categories'
import { locationsData } from '@/data/locations'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tamilelectricals.com'
  
  // Core application routes (Tier 1)
  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      priority: 1.0,
    },
    {
      url: `${siteUrl}/products`,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      priority: 0.8,
    },
  ]

  // Programmatic Category Hubs (Tier 2)
  const categoryRoutes: MetadataRoute.Sitemap = categoriesData.map((category) => ({
    url: `${siteUrl}/categories/${category.slug}`,
    priority: 0.8,
  }))

  // Programmatic Location SILOs (Tier 3)
  const locationRoutes: MetadataRoute.Sitemap = locationsData.map((location) => ({
    url: `${siteUrl}/locations/${location.slug}`,
    priority: 0.7,
  }))

  // Programmatic Brand SILOs (Tier 4)
  const brandRoutes: MetadataRoute.Sitemap = brandsData.map((brand) => ({
    url: `${siteUrl}/brands/${brand.slug}`,
    priority: 0.6,
  }))

  // Merge the massive structured array
  return [...coreRoutes, ...categoryRoutes, ...locationRoutes, ...brandRoutes]
}
