import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://tamilelectricals.com',
      lastModified: new Date(),
    },
  ]
}
