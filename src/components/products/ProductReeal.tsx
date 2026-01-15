'use client'

import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { trpc } from '@/trpc/client'
import { TQueryValidator } from '@/lib/validators'
import { Product } from '@/payload-types'
import ProductListing from './ProductListing'

interface ProductReealProps {
  title: string
  subTitle?: string
  href?: string
  query: TQueryValidator
}

const ProductReeal = (props: ProductReealProps) => {
  const { title, subTitle, href, query } = props

  const { data: queryResults, isLoading } = trpc.getInfiniteProducts.useInfiniteQuery(
    {
      limit: query.limit ?? 4,
      query,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    },
  )

  console.log(queryResults)

  const products = queryResults?.pages.flatMap((page) => page.items)
  let map: (Product | null)[] = []
  if (products && products.length > 0) {
    map = products
  } else if (isLoading) {
    map = new Array<null>(query.limit ?? 4).fill(null)
  }

  console.log(products)

  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title && <h2 className="text-2xl font-bold text-gray-900 sm:3xl">{title}</h2>}
          {subTitle && <p className="mt-2 text-sm text-muted-foreground">{subTitle}</p>}
        </div>
        {href && (
          <Link
            href={href}
            className={buttonVariants({
              variant: 'ghost',
              className: 'group hidden! md:flex! text-violet-700 hover:text-violet-500',
              size: 'sm',
            })}
          >
            همه
            <ChevronLeft className="group-hover:scale-110 group-hover:-mr-1.5 ease-in duration-100 -mr-2" />
          </Link>
        )}
      </div>

      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {map.map((product, i) => (
              <ProductListing key={i} product={product} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
export default ProductReeal
