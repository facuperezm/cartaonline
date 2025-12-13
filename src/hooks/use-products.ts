import { useQuery } from '@tanstack/react-query'

import { getProduct } from '@/lib/actions/product'

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
