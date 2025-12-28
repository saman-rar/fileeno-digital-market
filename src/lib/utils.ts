import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const faPriceformatter = (price: number) => {
  return new Intl.NumberFormat('fa-IR').format(price)
}
