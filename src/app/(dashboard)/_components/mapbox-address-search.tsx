'use client'

import { MapPin, SearchIcon } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type Suggestion = {
  mapbox_id: string
  name: string
  place_formatted?: string
  full_address?: string
}

type SuggestResponse = {
  suggestions?: Suggestion[]
}

type MapboxAddressSearchProps = {
  defaultValue?: string
  label?: string
  placeholder?: string
  required?: boolean
  sessionToken: string
  onSelectedChange?: (selected: boolean) => void
}

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

function formatSuggestion(suggestion: Suggestion) {
  return [suggestion.name, suggestion.place_formatted]
    .filter(Boolean)
    .join(', ')
}

export function MapboxAddressSearch({
  defaultValue = '',
  label = 'Dirección',
  placeholder = 'Av. Corrientes 1234, CABA, Argentina',
  required = false,
  sessionToken,
  onSelectedChange,
}: MapboxAddressSearchProps) {
  const inputId = useId()
  const [query, setQuery] = useState(defaultValue)
  const [mapboxId, setMapboxId] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    onSelectedChange?.(Boolean(mapboxId))
  }, [mapboxId, onSelectedChange])

  useEffect(() => {
    if (!(accessToken && query.trim().length >= 3 && !mapboxId)) {
      setSuggestions([])
      return
    }

    const controller = new AbortController()
    const timeoutId = window.setTimeout(async () => {
      setLoading(true)

      try {
        const url = new URL(
          'https://api.mapbox.com/search/searchbox/v1/suggest',
        )
        url.searchParams.set('q', query)
        url.searchParams.set('access_token', accessToken)
        url.searchParams.set('session_token', sessionToken)
        url.searchParams.set('country', 'ar')
        url.searchParams.set('language', 'es')
        url.searchParams.set('limit', '5')
        url.searchParams.set('types', 'address,poi')

        const response = await fetch(url, { signal: controller.signal })
        const data = (await response.json()) as SuggestResponse
        setSuggestions(data.suggestions ?? [])
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setSuggestions([])
        }
      } finally {
        setLoading(false)
      }
    }, 250)

    return () => {
      window.clearTimeout(timeoutId)
      controller.abort()
    }
  }, [mapboxId, query, sessionToken])

  return (
    <div className="space-y-2">
      <Label className="flex flex-col gap-2" htmlFor={inputId}>
        {label}
        <div className="relative">
          <SearchIcon className="-translate-y-1/2 absolute top-1/2 left-3 size-4 text-muted-foreground" />
          <Input
            autoComplete="off"
            className="pl-9"
            disabled={!accessToken}
            id={inputId}
            onChange={(event) => {
              setQuery(event.target.value)
              setMapboxId('')
            }}
            placeholder={
              accessToken
                ? placeholder
                : 'Configurá NEXT_PUBLIC_MAPBOX_TOKEN para buscar direcciones'
            }
            required={required}
            value={query}
          />

          {suggestions.length > 0 ? (
            <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-md border bg-popover shadow-md">
              {suggestions.map((suggestion) => (
                <button
                  className={cn(
                    'flex w-full items-start gap-2 px-3 py-2 text-left text-sm',
                    'hover:bg-accent hover:text-accent-foreground',
                  )}
                  key={suggestion.mapbox_id}
                  onClick={() => {
                    setQuery(formatSuggestion(suggestion))
                    setMapboxId(suggestion.mapbox_id)
                    setSuggestions([])
                  }}
                  type="button"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <span>
                    <span className="block font-medium">{suggestion.name}</span>
                    {suggestion.place_formatted ? (
                      <span className="block text-muted-foreground text-xs">
                        {suggestion.place_formatted}
                      </span>
                    ) : null}
                  </span>
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </Label>

      {loading ? (
        <p className="text-muted-foreground text-xs">Buscando dirección...</p>
      ) : null}

      <input name="mapboxId" type="hidden" value={mapboxId} />
      <input name="sessionToken" type="hidden" value={sessionToken} />
    </div>
  )
}
