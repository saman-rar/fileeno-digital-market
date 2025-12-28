import React from 'react'

import config from '@/payload.config'
import './styles.css'
import { ArrowDownToLine, CheckCircle, ChevronLeft, Leaf } from 'lucide-react'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
const perks = [
  {
    name: 'تحویل فوری',
    Icon: ArrowDownToLine,
    description: 'محصول خود را پس از چند ثانیه درون ایمیل خود تحویل بگیرید!',
  },
  {
    name: 'ضمانت کیفیت',
    Icon: CheckCircle,
    description:
      'تمام محصولات درون سایت توسط تیم ما بررسی شده تا با بالاترین کیفیت به دست شما برسه همچنین ضمانت بازگشت وجه تا 30 روز در صورت نارضایتی وجود داره.',
  },
  {
    name: 'دوستدار محیط زیست',
    Icon: Leaf,
    description: 'یک درصد از درامد فروش محصولات مختص به حمایت از محیط زیست خواهد شد.',
  },
]

export default async function HomePage() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl leading-20">
            با کیفیت ترین محصولات اینترنتی در <span className="text-violet-500">فایلینو</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            به فایلینو خوش آمدید. تمام محصولات موجود در سایت توسط تیم حرفه ای ما بررسی و تایید شدند
            تا محصولات با بهترین کیفیت تقدیم شما بشه!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>
              محبوترین محصولات
            </Link>
            <Button variant="ghost" className="group">
              ضمانت کیفیت
              <ChevronLeft className="group-hover:scale-130 group-hover:mr-0.75 ease-in duration-100" />
            </Button>
          </div>
        </div>

        {/* TODO: list products */}
      </MaxWidthWrapper>

      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-right lg:block lg:text-center"
              >
                <div className="md:shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-violet-100 text-violet-900">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:mr-4 md:mt-0 lg:mr-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">{perk.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{perk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}
