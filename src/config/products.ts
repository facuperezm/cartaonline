export const PRODUCT_CATEGORIES = ['Comida', 'Bebida', 'Postre'] as const

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]
