'use client'

import { Button } from '@/components/ui/button'
import { PRODUCT_CATEGORIES } from '@/config'
import { useCart } from '@/hooks/useCart'
import { cn, faPriceformatter, formattedLabel, getTotalPrice } from '@/lib/utils'
import { trpc } from '@/trpc/client'
import { Check, Loader2, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

const CartPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { items, removeItem } = useCart()
  const router = useRouter()

  const { mutateAsync, isPending } = trpc.payment.createSession.useMutation({
    onSuccess: ({ url }) => {
      if (url) router.push(url)
    },
  })

  const productIds = items.map(({ product }) => product.id)

  const checkoutClikHandler = () => {
    setIsLoading(true)
    toast.promise(mutateAsync({ productIds }), {
      loading: 'در حال انتقال به صفحه پرداخت ...',
      success: 'منتقل شدید.',
      error: () => {
        setIsLoading(true)
        return 'خطا در ساخت حساب. لطفا دوباره امتحان کنید.'
      },
    })
  }

  const cartTotal = getTotalPrice(items)

  const fee = 5000

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">سبد خرید</h1>

        <div className="mt-12 lg:grid grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div
            className={cn('lg:col-span-7', {
              'rounded-lg border-2 border-dashed border-zinc-200 p-12': items.length === 0,
            })}
          >
            <h2 className="sr-only">محصولات درون سبد خرید شما</h2>

            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div aria-hidden="true" className="relative mb-4 h-40 w-40 text-muted-foreground">
                  <Image src="/shopping.png" fill loading="eager" alt="سبد خرید خالی" />
                </div>
                <h3 className="font-semibold text-2xl">سبد خرید شما خالی است!</h3>
                <p className="text-muted text-center">چیزی برای نمایش وجود ندارد</p>
              </div>
            ) : null}

            <ul
              className={cn({
                'divide-y divide-gray-200 border-b border-t border-gray-200': items.length > 0,
              })}
            >
              {items.map(({ product }) => {
                const label = formattedLabel(product.category)

                const { image } = product.images[0]

                return (
                  <li key={product.id} className="flex py-6 sm:py-10">
                    <div className="shrink-0">
                      <div className="relative h-24 w-24">
                        {typeof image !== 'string' && image.url && (
                          <Image
                            src={image.url}
                            fill
                            alt={image.alt}
                            className="h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48"
                          />
                        )}
                      </div>
                    </div>

                    <div className="mr-4 flex flex-1 flex-col justify-between sm:mr-6">
                      <div className="relative pl-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <Link
                                href={`/product/${product.id}`}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {product.name}
                              </Link>
                            </h3>
                          </div>

                          <div className="mt-1 flex text-sm">
                            <p className="text-muted-foreground">دسته بندی: {label}</p>
                          </div>

                          <p className="mt-1 text-sm font-medium text-gray-900">
                            {faPriceformatter(product.price)}
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pl-9 w-20">
                          <div className="absolute l-0 t-0">
                            <Button
                              aria-label="حذف محصول"
                              onClick={() => removeItem(product.id)}
                              variant="ghost"
                            >
                              <X aria-hidden="true" className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                        <Check className="h-5 w-5 shrink-0 text-green-500" />
                        <span>تحویل لحظه ای</span>
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">گزارش سفارش</h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">سبد خرید</p>
                <p className="text-sm font-medium text-gray-900">
                  {faPriceformatter(cartTotal)} تومان
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>مالیات</span>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {faPriceformatter(fee)} تومان
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200">
                <div className="text-base font-medium text-gray-900">مجموع</div>
                <div className="text-base font-medium text-gray-900">
                  {faPriceformatter(cartTotal + fee)} تومان
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button
                disabled={isLoading || items.length === 0}
                onClick={checkoutClikHandler}
                className="w-full"
                size="lg"
              >
                پرداخت
                {isLoading && <Loader2 className="w-4 h-4 animate-spin ml-1.5" />}
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
export default CartPage
