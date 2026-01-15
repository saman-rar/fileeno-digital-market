import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Ban, Check, CircleAlert, ClockFading, Shield } from 'lucide-react'
import { faPriceformatter, formattedLabel, getValidUrls } from '@/lib/utils'
import ImageSilder from '@/components/products/ImageSlider'
import ProductReeal from '@/components/products/ProductReeal'
import AddToCartButton from '@/components/AddToCartButton'

interface ProdctDetailPageProps {
  params: {
    productId: string
  }
}

const BREADCRUMPS = [
  { id: 1, name: 'خانه', href: '/' },
  { id: 2, name: 'محصولات', href: '/product' },
]

const ProductDetailsPage = async ({ params }: ProdctDetailPageProps) => {
  const { productId } = await params
  const payload = await getPayload({ config: configPromise })

  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
    },
  })
  const [product] = products

  if (!product) {
    return (
      <div className="flex w-full h-[calc(100vh-theme(space.16))] justify-center items-center">
        <div className="flex flex-col items-center gap-5">
          <CircleAlert size={70} className="text-primary" />
          <p className="text-lg font-bold">محصول مورد نظر یافت نشد!</p>
          <p className="text-muted-foreground font-bold">404 Error - Not Found</p>
        </div>
      </div>
    )
  }

  if (product.provedForSale === 'pending') {
    return (
      <div className="flex w-full h-[calc(100vh-theme(space.16))] justify-center items-center">
        <div className="flex flex-col items-center gap-5">
          <ClockFading size={70} className="text-primary" />
          <p className="text-lg font-bold">محصول مورد نظر هنوز در دسترس نیست.</p>
        </div>
      </div>
    )
  }

  if (product.provedForSale === 'denied') {
    return (
      <div className="flex w-full h-[calc(100vh-theme(space.16))] justify-center items-center">
        <div className="flex flex-col items-center gap-5">
          <Ban size={70} className="text-rose-700" />
          <p className="text-lg font-bold">محصول مورد نظر در دسترس نیست.</p>
        </div>
      </div>
    )
  }

  const label = formattedLabel(product.category)

  const validUrls = getValidUrls(product.images)

  return (
    <MaxWidthWrapper className="bg-white">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:gap-x-8 lg:px-8">
          {/*TODO: product details */}
          <div className="lg:self-end">
            <ol className="flex items-center space-x-2">
              {BREADCRUMPS.map((breadcrump, i) => (
                <li key={breadcrump.href}>
                  <div className="flex items-center text-sm">
                    <Link
                      href={breadcrump.href}
                      className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                    >
                      {breadcrump.name}
                    </Link>
                    {i !== BREADCRUMPS.length - 1 && <span className="mr-2 text-gray-400">/</span>}
                  </div>
                </li>
              ))}
            </ol>

            <div className="lg:grid lg:grid-cols-2">
              <div className="lg:col-start-2 lg:row-span-2 lg:mt-0 lg:mr-10">
                <div className="mt-4">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {product.name}
                  </h1>
                </div>

                <section className="mt-4">
                  <div className="flex items-center">
                    <p className="font-medium text-gray-900">
                      {faPriceformatter(product.price)} تومان
                    </p>
                    <div className="mr-4 border-r text-muted-foreground border-r-gray-300 pr-4">
                      {label}
                    </div>
                  </div>

                  <div className="mt-4 space-y-6">
                    <p className="text-base text-muted-foreground">{product.description}</p>
                  </div>

                  <div className="mt-6 flex items-center">
                    <Check aria-hidden="true" className="h-5 w-5 shrink-0 text-green-500" />
                    <p className="mr-2 text-sm text-muted-foreground">تحویل در لحظه</p>
                  </div>
                </section>
              </div>

              <div className=" lg:col-start-1 lg:row-start-2 lg:max-w-lg lg: self-start">
                <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
                  <div className="aspect-square rounded-lg">
                    <ImageSilder urls={validUrls} />
                  </div>
                </div>

                <div className="mt-1 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg: self-start">
                  <div>
                    <div className="mt-10">
                      <AddToCartButton product={product} />
                    </div>
                    <div className="mt-6 text-center">
                      <div className="group inline-flex text-sm font-medium">
                        <Shield
                          aria-hidden="true"
                          className="ml-2 h-5 w-5 shrink-0 text-gray-400"
                        />
                        <span className="text-muted-foreground hover:text-gray-700">
                          ضمانت 30 روزه بازگشت وجه
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductReeal
        href="/products"
        query={{ category: product.category, limit: 4 }}
        title={`محصولات مشابه ${product.name}`}
        subTitle={`مشاهده محصولات  ${label} مشابه ${product.name}`}
      />
    </MaxWidthWrapper>
  )
}
export default ProductDetailsPage
