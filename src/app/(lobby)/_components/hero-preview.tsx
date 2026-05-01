'use client'

import { Clock, MapPin, QrCode, Share2, Star } from 'lucide-react'
import { useEffect, useState } from 'react'

type Category = 'Comida' | 'Bebida' | 'Postre'

const PRODUCTS: { name: string; desc: string; price: number; cat: Category }[] =
  [
    {
      name: 'Empanada de Carne',
      desc: 'Receta tradicional cordobesa',
      price: 800,
      cat: 'Comida',
    },
    {
      name: 'Milanesa Napo',
      desc: 'Con papas fritas',
      price: 4500,
      cat: 'Comida',
    },
    {
      name: 'Café con Leche',
      desc: 'Recién hecho',
      price: 1200,
      cat: 'Bebida',
    },
    {
      name: 'Limonada de menta',
      desc: 'Fresca y casera',
      price: 1500,
      cat: 'Bebida',
    },
    {
      name: 'Flan Casero',
      desc: 'Con dulce de leche',
      price: 2000,
      cat: 'Postre',
    },
    {
      name: 'Helado Artesanal',
      desc: 'Dos bochas a elección',
      price: 1800,
      cat: 'Postre',
    },
  ]

const CATEGORY_ORDER: Category[] = ['Comida', 'Bebida', 'Postre']

const LOOP_MS = 11_000
const HEADER_DELAY = 0.2
const CATEGORY_STAGGER = 0.6
const PRODUCT_STAGGER = 0.35

const formatArs = (amount: number) => `$${amount.toLocaleString('es-AR')}`

export function HeroPreview() {
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCycle((c) => c + 1)
    }, LOOP_MS)
    return () => {
      clearInterval(id)
    }
  }, [])

  return (
    <div
      className="relative flex h-full w-full flex-col gap-4 bg-gradient-to-br from-card via-card to-muted/30 p-5 motion-reduce:gap-3"
      key={cycle}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <h3
            className="animate-fade-up truncate font-bold text-base opacity-0 motion-reduce:animate-none motion-reduce:opacity-100 sm:text-lg"
            style={{ animationDelay: `${HEADER_DELAY}s` }}
          >
            Café La Costanera
          </h3>
          <div
            className="flex animate-fade-up flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
            style={{ animationDelay: `${HEADER_DELAY + 0.15}s` }}
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-1.5 py-0.5 font-medium text-[10px] text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Abierto
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock aria-hidden className="h-3 w-3" />
              11:00–23:00
            </span>
            <span className="inline-flex items-center gap-1">
              <Star
                aria-hidden
                className="h-3 w-3 fill-secondary text-secondary"
              />
              4.8
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin aria-hidden className="h-3 w-3" />
              Av. Mitre 1845
            </span>
          </div>
        </div>
        <div
          className="flex shrink-0 animate-fade-up items-center gap-1.5 opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
          style={{ animationDelay: `${HEADER_DELAY + 0.1}s` }}
        >
          <button
            aria-label="Compartir"
            className="rounded-full border bg-background p-1.5 text-muted-foreground"
            tabIndex={-1}
            type="button"
          >
            <Share2 aria-hidden className="h-3.5 w-3.5" />
          </button>
          <div className="rounded-xl border bg-background p-1.5 text-primary shadow-sm">
            <QrCode aria-hidden className="h-5 w-5" />
          </div>
        </div>
      </header>

      <div className="h-px shrink-0 bg-border" />

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden">
        <h4
          className="animate-fade-up font-semibold text-sm opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
          style={{ animationDelay: `${HEADER_DELAY + 0.4}s` }}
        >
          Nuestro Menú
        </h4>

        {CATEGORY_ORDER.map((category, catIdx) => {
          const items = PRODUCTS.filter((p) => p.cat === category)
          if (items.length === 0) {
            return null
          }
          const categoryDelay =
            HEADER_DELAY + 0.6 + catIdx * (CATEGORY_STAGGER + PRODUCT_STAGGER)
          return (
            <div className="flex flex-col gap-1.5" key={category}>
              <span
                className="animate-fade-up font-medium text-[10px] text-muted-foreground uppercase tracking-wider opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
                style={{ animationDelay: `${categoryDelay}s` }}
              >
                {category}
              </span>
              <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {items.map((product, idx) => (
                  <li
                    className="flex animate-fade-up items-start justify-between gap-2 rounded-lg border bg-background/70 p-2 opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
                    key={product.name}
                    style={{
                      animationDelay: `${categoryDelay + 0.2 + idx * PRODUCT_STAGGER}s`,
                    }}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-xs leading-tight">
                        {product.name}
                      </p>
                      <p className="truncate text-[10px] text-muted-foreground leading-tight">
                        {product.desc}
                      </p>
                    </div>
                    <p className="shrink-0 font-semibold text-xs tabular-nums">
                      {formatArs(product.price)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
