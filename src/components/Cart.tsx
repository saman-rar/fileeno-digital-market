'use client'

import { ImageIcon, ShoppingCart, X } from 'lucide-react'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { faPriceformatter, formattedLabel, getTotalPrice } from '@/lib/utils'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import Image from 'next/image'
import { useCart } from '@/hooks/useCart'
import { ScrollArea } from './ui/scroll-area'
import { Product } from '@/payload-types'

const Cart = () => {
  const { items } = useCart()
  const itemCount = items.length
  const cartTotal = getTotalPrice(items)

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <ShoppingCart
          aria-hidden="true"
          className="h-6 w-6 shrink-0 text-gray-700 group-hover:text-gray-500"
        />
        <Badge className="flex items-center justify-center w-4 h-4 -ml-2 -mt-4">
          <span className="text-sm font-medium text-gray-100 group-hover:text-gray-300 mt-1">
            {itemCount}
          </span>
        </Badge>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>سبد خرید ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              <ScrollArea>
                {items.map(({ product }) => (
                  <CartItem product={product} key={product.id} />
                ))}
              </ScrollArea>
              محصولات
            </div>
            <div className="space-y-4 px-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">ارسال</span>
                  <span>رایگان</span>
                </div>
                <div className="flex">
                  <span className="flex-1">مالیات</span>
                  <span>{faPriceformatter(10000)} تومان</span>
                </div>
                <div className="flex">
                  <span className="flex-1">مجوع</span>
                  <span>{faPriceformatter(cartTotal)} تومان</span>
                </div>
              </div>

              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/cart"
                    className={buttonVariants({
                      className: 'w-full',
                    })}
                  >
                    پرداخت
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-[80%] flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image src="/shopping.png" fill alt="سبد خرید خالی" />
            </div>
            <div className="text-xl font-semibold">سبد خرید شما خالی میباشد!</div>
            <SheetTrigger asChild>
              <Link
                href="/products"
                className={buttonVariants({
                  variant: 'link',
                  className: 'text-sm text-muted-foreground!',
                  size: 'sm',
                })}
              >
                محصول مورد نظر خودتونو برای پرداخت به سبد خرید اضافه کنید.
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
export default Cart

const CartItem = ({ product }: { product: Product }) => {
  const { removeItem } = useCart()

  const { image } = product.images[0]

  const label = formattedLabel(product.category)

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded ml-4">
            {typeof image !== 'string' && image.url ? (
              <Image src={image.url} alt={image.alt} fill className="absolute object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <ImageIcon aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="flex flex-col self-start">
            <span className="line-clamp-1 text-sm font-medium mb-1">{product.name}</span>
            <span className="line-clamp-1 text-sm text-muted-foreground">{label}</span>

            <div className="mt-4 text-xs text-muted-foreground">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => removeItem(product.id)}
                className="flex items-center gap-0.5 cursor-pointer"
              >
                حذف <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1 font-medium" dir="rtl">
          <span className="ml-auto line-clamp-1 text-sm">
            {faPriceformatter(product.price)} تومان
          </span>
        </div>
      </div>
    </div>
  )
}
