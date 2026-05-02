import type { MetadataRoute } from 'next'
import { db } from '@/lib/db'
import { getSiteUrl } from '@/lib/site-url'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl()
  const [stores, cityGroups] = await Promise.all([
    db.store.findMany({
      where: {
        deletedAt: null,
        status: 'ACTIVE',
      },
      select: {
        citySlug: true,
        id: true,
        updatedAt: true,
      },
    }),
    db.store.groupBy({
      by: ['citySlug'],
      where: {
        deletedAt: null,
        status: 'ACTIVE',
      },
      _max: {
        updatedAt: true,
      },
    }),
  ])

  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/sign-in`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${siteUrl}/sign-up`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...cityGroups.map((city) => ({
      url: `${siteUrl}/stores/${city.citySlug}`,
      lastModified: city._max.updatedAt ?? new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    })),
    ...stores.map((store) => ({
      url: `${siteUrl}/stores/${store.citySlug}/${store.id}`,
      lastModified: store.updatedAt,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })),
  ]
}
