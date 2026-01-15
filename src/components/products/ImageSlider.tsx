'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useEffect, useState } from 'react'
import { Pagination } from 'swiper/modules'
import type SwiperType from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageSliderProps {
  urls: string[]
}

const ImageSilder = ({ urls }: ImageSliderProps) => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null)
  const [activeIndex, setActiveIndex] = useState(urls.length - 1)
  const [slideConfig, setSlideConfig] = useState({
    isBeginning: activeIndex === 0,
    isEnd: activeIndex === urls.length - 1,
  })

  console.log(activeIndex)

  useEffect(() => {
    swiper?.on('slideChange', ({ activeIndex }) => {
      setActiveIndex(activeIndex)
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (urls.length ?? 0) - 1,
      })
    })
  }, [swiper, urls])

  console.log('after useeefecta', activeIndex)

  const activeStyles =
    'active:scale-[0.97] grid opacity-100 hover-105 absolute top-1/2 -transalte-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300'
  const inactiveStyle = 'hidden text-gary-400'

  return (
    <div className="group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl">
      <div className="absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition">
        <button
          aria-label="next image"
          onClick={(e) => {
            e.preventDefault()
            swiper?.slidePrev()
          }}
          className={cn(activeStyles, 'right-3 transition', {
            [inactiveStyle]: slideConfig.isBeginning,
            'hover:bg-primary-300 text-primary-800 opacity-100': !slideConfig.isBeginning,
          })}
        >
          <ChevronRight className="h-4 w-4 text-zinc-700" />
        </button>
        <button
          aria-label="next image"
          onClick={(e) => {
            e.preventDefault()
            swiper?.slideNext()
          }}
          className={cn(activeStyles, 'left-3 transition', {
            [inactiveStyle]: slideConfig.isEnd,
            'hover:bg-primary-300 text-primary-800 opacity-100': !slideConfig.isEnd,
          })}
        >
          <ChevronLeft className="h-4 w-4 text-zinc-700" />
        </button>
      </div>

      <Swiper
        initialSlide={urls.length - 1}
        pagination={{
          renderBullet: (_, className) => {
            return `<span class='rounded-full transition ${className}'></span>`
          },
        }}
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={50}
        slidesPerView={1}
        modules={[Pagination]}
        className="h-full w-full"
      >
        {urls.map((url, i) => (
          <SwiperSlide key={i} className="-z-10 relative h-full w-full">
            <Image
              fill
              loading="eager"
              className="z-10 h-full w-full object-cover object-center"
              src={url}
              alt="تصویر محصول"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ImageSilder
