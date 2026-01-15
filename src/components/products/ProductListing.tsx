'use client'

import { Product } from '@/payload-types'
import { useEffect, useState } from 'react'
import { Skeleton } from '../ui/skeleton'
import Link from 'next/link'
import { cn, faPriceformatter, formattedLabel, getValidUrls } from '@/lib/utils'
import { PRODUCT_CATEGORIES } from '@/config'
import ImageSilder from './ImageSlider'

interface ProductListingProps {
  product: Product | null
  index: number
}

const ProductListing = ({ product, index }: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 75)

    return () => clearTimeout(timer)
  }, [index])

  if (!product || !isVisible) return <ProductPlaceholder />

  const label = formattedLabel(product.category)

  const validUrls = getValidUrls(product.images)

  if (isVisible || product) {
    return (
      <Link
        href={`/product/${product.id}`}
        className={cn('invisible h-full w-full cursor-pointer group/main', {
          'visible animate-in fade-in-5': isVisible,
        })}
      >
        <div className="flex flex-col w-full">
          <ImageSilder urls={validUrls} />

          <h3 className="mt-4 font-medium text-sm text-gray-700">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{label}</p>
          <p className="mt-1 font-medium text-sm text-gray-900">
            {faPriceformatter(product.price)}
          </p>
        </div>
      </Link>
    )
  }
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
