'use client'

import type { Product } from '@prisma/client'

import { DataTable } from '@/app/(dashboard)/_components/tables/data-table'

import { columns } from './tables/columns'

type StoreProductsTabProps = {
  storeId: string
  products: Product[]
}

export function StoreProductsTab({ storeId, products }: StoreProductsTabProps) {
  return <DataTable columns={columns} data={products} storeId={storeId} />
}
