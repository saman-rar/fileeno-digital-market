import { PRODUCT_CATEGORIES } from '@/config'
import { CartItem } from '@/hooks/useCart'
import { Media, Product } from '@/payload-types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const faPriceformatter = (price: number) => {
  return new Intl.NumberFormat('fa-IR').format(price)
}

interface Image {
  image: string | Media
}

export const getValidUrls = (images: Image[]) => {
  const validUrls = images
    .map(({ image }) => (typeof image === 'string' ? image : image.url))
    .filter(Boolean) as string[]

  return validUrls.reverse()
}

export const formattedLabel = (category: 'ui-kits' | 'icons') => {
  const label = PRODUCT_CATEGORIES.find(({ value }) => value === category)?.label

  return label
}

export const getTotalPrice = (items: CartItem[] | Product[]) => {
  if (items.length === 0) return 0

  if ('product' in items[0]) {
    return (items as CartItem[]).reduce((total, { product }) => total + product.price, 0)
  }

  return (items as Product[]).reduce((total, product) => total + product.price, 0)
}
