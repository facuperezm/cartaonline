import 'server-only'

import { cacheLife, cacheTag } from 'next/cache'

import { db } from '../db'

export const getStoresByCity = async (city: string) => {
  'use cache'
  cacheTag(`stores-city-${city}`)
  cacheLife({ stale: 300, revalidate: 3600, expire: 86_400 })

  const stores = await db.store.findMany({
    where: {
      citySlug: city,
      deletedAt: null,
      status: 'ACTIVE',
    },
    include: {
      banner: true,
      logo: true,
    },
  })

  return stores
}

export const getStoreById = async (id: string) => {
  'use cache'
  cacheTag(`store-${id}`)
  cacheLife({ stale: 300, revalidate: 3600, expire: 86_400 })

  const store = await db.store.findFirst({
    where: { id, deletedAt: null },
    include: {
      banner: true,
      logo: true,
      products: {
        orderBy: {
          category: 'asc',
        },
      },
    },
  })
  return store
}

export const getStoreByUserId = async (userId: string) => {
  const store = await db.store.findMany({
    where: {
      userId,
      deletedAt: null,
    },
  })
  return store
}
