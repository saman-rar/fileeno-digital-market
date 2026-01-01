'use client'

import { Product } from '@/payload-types'
import { useState } from 'react'
import { Skeleton } from '../ui/skeleton'

interface ProductListingProps {
  product: Product | null
  index: number
}

const ProductListing = ({ product, index }: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState(false)

  if (true || !product || !isVisible) return <ProductPlaceholder />

  return <div>ProductListing</div>
}
export default ProductListing

const ProductPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 rounded-lg" />
      <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
    </div>
  )
}
