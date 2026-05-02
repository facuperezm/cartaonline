import 'server-only'

import { slugifyCityName } from '@/lib/location'

type MapboxContext = {
  country?: { name?: string }
  region?: { name?: string }
  district?: { name?: string }
  place?: { name?: string }
  locality?: { name?: string }
  neighborhood?: { name?: string }
  address?: { name?: string }
  street?: { name?: string }
}

type MapboxFeature = {
  geometry?: {
    coordinates?: [number, number]
  }
  properties?: {
    name?: string
    full_address?: string
    place_formatted?: string
    context?: MapboxContext
  }
}

type MapboxRetrieveResponse = {
  features?: MapboxFeature[]
}

export type RetrievedMapboxFeature = {
  address: string
  cityName: string
  citySlug: string
  province: string
  latitude: number
  longitude: number
}

export async function retrieveMapboxFeature(
  mapboxId: string,
  sessionToken: string,
): Promise<RetrievedMapboxFeature> {
  const accessToken = process.env.MAPBOX_SECRET_TOKEN

  if (!accessToken) {
    throw new Error('Falta configurar MAPBOX_SECRET_TOKEN.')
  }

  const url = new URL(
    `https://api.mapbox.com/search/searchbox/v1/retrieve/${encodeURIComponent(
      mapboxId,
    )}`,
  )
  url.searchParams.set('access_token', accessToken)
  url.searchParams.set('session_token', sessionToken)
  url.searchParams.set('country', 'ar')
  url.searchParams.set('language', 'es')

  const response = await fetch(url, { cache: 'no-store' })

  if (!response.ok) {
    throw new Error('No se pudo validar la dirección seleccionada.')
  }

  const data = (await response.json()) as MapboxRetrieveResponse
  const feature = data.features?.[0]
  const coordinates = feature?.geometry?.coordinates
  const context = feature?.properties?.context
  const cityName =
    context?.place?.name ??
    context?.locality?.name ??
    context?.district?.name ??
    context?.neighborhood?.name
  const province = context?.region?.name
  const address =
    feature?.properties?.full_address ??
    [feature?.properties?.name, feature?.properties?.place_formatted]
      .filter(Boolean)
      .join(', ')

  if (!(coordinates && cityName && province && address)) {
    throw new Error('La dirección seleccionada está incompleta.')
  }

  return {
    address,
    cityName,
    citySlug: slugifyCityName(cityName),
    province,
    latitude: coordinates[1],
    longitude: coordinates[0],
  }
}
