import 'server-only'

import type { City } from '@prisma/client'
import { cacheLife, cacheTag } from 'next/cache'

import { db } from '../db'

export const getCities = async () => {
  'use cache'
  cacheTag('cities')
  cacheLife({ stale: 300, revalidate: 3600, expire: 86_400 })

  const cities = await db.city.findMany()
  return cities.sort((a: City, b: City) => Number(b.active) - Number(a.active))
}
