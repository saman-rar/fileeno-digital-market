import { getServerSideUser } from '@/lib/payload-utils'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ChevronLeft, CircleAlert } from 'lucide-react'
import { redirect } from 'next/navigation'
import { Product, ProductFile } from '@/payload-types'
import { faPriceformatter, formattedLabel, getTotalPrice } from '@/lib/utils'
import Link from 'next/link'

interface ThankYouPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

const ThankYouPage = async ({ searchParams }: ThankYouPageProps) => {
  const { orderId } = await searchParams

  const { user } = await getServerSideUser(await cookies())

  const payload = await getPayload({ config: configPromise })

  const { docs: orders } = await payload.find({
    collection: 'orders',
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  })

  const [order] = orders

  if (!order) {
    return (
      <div className="flex w-full h-[calc(100vh-theme(space.16))] justify-center items-center">
        <div className="flex flex-col items-center gap-5">
          <CircleAlert size={70} className="text-primary" />
          <p className="text-lg font-bold">سفارش یافت نشد!</p>
          <p className="text-muted-foreground font-bold">404 Error - Not Found</p>
        </div>
      </div>
    )
  }

  const products = order.products as Product[]
  const totalPrice = getTotalPrice(products)

  const orderUserId = typeof order.user === 'string' ? order.user : order.user.id
  if (orderUserId === user?.id) {
    return redirect(`/sign-in?origin=thank-you?orderId=${orderId}`)
  }

  return (
    <div className="relative lg:min-h-full">
      <div className="hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
        <Image
          fill
          src="/checkout-thank-you.jpg"
          className="h-full w-full"
          alt="ممنون از اعتماد و خرید شما"
        />
      </div>

      <div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
          <div className="lg:col-start-2">
            <p className="text-sm font-medium text-violet-600">سفارش با موفقیت ثبت شد</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              ممنون از اعتماد و خرید شما
            </h1>
            {order._isPaid ? (
              <p className="mt-2 text-base text-muted-foreground">
                سفارش شما بررسی شده و محصول شما قابل دانلود از لینک زیر می باشد رسید خرید شمارا به
                ایمیل
                {typeof order.user !== 'string' && (
                  <span className="font-medium text-gray-900">{order.user.email}</span>
                )}
                ارسال کردیم
              </p>
            ) : (
              // TODO : add a clock Icon
              <p className="mt-2 text-base text-muted-foreground">
                ممنون از سفارش شما ما در حال بررسی سفارش شما هستیم به زودی سفارش شما فعال میشود
              </p>
            )}

            <div className="mt-16 text-sm font-medium">
              <div className="mt-2 text-muted-foreground">شماره سفارش</div>
              <div className="mt-2 text-gray-900">{order.id}</div>

              <ul className="t-6 divide-y divide-gray-200 border-t border-gray-200 text-sm">
                {(order.products as Product[]).map((product) => {
                  const label = formattedLabel(product.category)
                  const downloadUrl = (product.product_files as ProductFile).url as string

                  const { image } = product.images[0]

                  return (
                    <li key={product.id} className="flex space-x-6 py-6">
                      <div className="relative h-24 w-24">
                        {typeof image !== 'string' && image.url && (
                          <Image
                            fill
                            src={image.url}
                            alt={image.alt}
                            className="flex-none rounded-md bg-gray-100 object-cover object-center"
                          />
                        )}
                      </div>
                      <div className="flex-auto flex flex-col justify-between">
                        <div className="space-y-1">
                          <h3 className="text-gray-900">{product.name}</h3>
                          <p className="my-1 ">دسته بندی: {label}</p>
                        </div>

                        {order._isPaid && (
                          <a
                            href={downloadUrl}
                            download={product.name}
                            className="text-primary-600 hover:underline underline-offset-2"
                          >
                            دانلود محصول
                          </a>
                        )}
                      </div>

                      <p className="flex-none font-medium text-gray-900">
                        {faPriceformatter(product.price)} تومان
                      </p>
                    </li>
                  )
                })}
              </ul>

              <div className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-muted-foreground">
                <div className="flex justify-between">
                  <p>سبد خرید</p>
                  <p className="text-gray-900">{faPriceformatter(totalPrice)} تومان</p>
                </div>
                <div className="flex justify-between">
                  <p>مالیات</p>
                  <p className="text-gray-900">{faPriceformatter(5000)} تومان</p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                  <p className="text-base">مجموع</p>
                  <p className="text-base">{faPriceformatter(totalPrice + 5000)}</p>
                </div>
              </div>

              <div className="mt-16 border-t border-gray-200 py-6 text-left">
                <Link
                  href="/products"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500 group"
                >
                  ادامه خرید
                  <ChevronLeft className="group-hover:scale-130 group-hover:mr-0.75 ease-in duration-100" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ThankYouPage
