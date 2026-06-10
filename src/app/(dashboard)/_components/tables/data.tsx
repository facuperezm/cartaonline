import { Beef, CakeSlice, CupSoda, type LucideIcon } from 'lucide-react'

import { PRODUCT_CATEGORIES, type ProductCategory } from '@/config/products'

const CATEGORY_ICONS: Record<ProductCategory, LucideIcon> = {
  Comida: Beef,
  Bebida: CupSoda,
  Postre: CakeSlice,
}

export const statuses = PRODUCT_CATEGORIES.map((category) => ({
  value: category,
  label: category,
  icon: CATEGORY_ICONS[category],
}))
