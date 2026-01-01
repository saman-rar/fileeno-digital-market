'use client'

import { trpc } from '@/trpc/client'
import { ChevronLeft, XCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import Loading from '@/app/(auth)/loading'

interface VerifyEmailProps {
  token: string
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  })

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3">
        <XCircle className="h-10 w-10 text-red-600 mb-2" />
        <h3 className="font-semibold text-xl">خطای تایید حساب</h3>
        <p className="text-muted-foreground text-sm">
          لینک تاید حساب شما منقضی شده یا نامعتبر میباشید لطفا دوباره امتحان کنید.
        </p>
      </div>
    )
  }

  if (data?.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center space-y-2">
        <div className="relative flex items-center justify-center h-80 w-80">
          <div
            className="absolute inset-6 rounded-full
                         bg-linear-to-
                         from-violet-600/60
                         via-fuchsia-500/40
                         to-purple-600/60
                         blur-3xl
                         mask-[radial-gradient(circle,transparent_55%,black_75%)]"
          />
          <div
            className="absolute inset-6 rounded-full
                         border border-violet-400/60
                         shadow-[0_0_40px_10px_rgba(139,92,246,0.45)]"
          />
          <div className="relative h-48 w-48 rounded-full z-10">
            <Image src="/email-sent.png" fill alt="ایمیل ارسال شد" className="object-contain" />
          </div>
        </div>
        <h3 className="font-semibold text-2xl">ایمیل شما با موفقیت تایید شد!</h3>
        <p className="text-muted-foreground text-center mt-1">ممنون از همراهی شما</p>
        <Link
          className={buttonVariants({
            className: 'mt-4! group',
            size: 'lg',
          })}
          href="/sign-in"
        >
          وارد شوید
          <ChevronLeft className="group-hover:scale-130 group-hover:mr-0.75 ease-in duration-100 -mr-1" />
        </Link>
      </div>
    )
  }

  if (isLoading) {
    return (
      <>
        <Loading />
        <h1 className="text-center mt-5 text-2xl font-bold">بررسی اطلاعات ...</h1>
        <p className="text-center text-muted-foreground text-sm -mt-3">
          چند ثانیه بیشتر طول نمیکشه!
        </p>
      </>
    )
  }
}
export default VerifyEmail
