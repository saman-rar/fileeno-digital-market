import VerifyEmail from '@/components/VerifyEmail'
import Image from 'next/image'

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const VerifyEmailPage = async ({ searchParams }: PageProps) => {
  const { token, to: toEmail } = await searchParams

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[px-350]">
        {token && typeof token === 'string' ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-3">
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

            <h3 className="font-semibold text-violet-500 text-2xl">ایمیل خود را چک کنید.</h3>
            {toEmail ? (
              <p className="text-muted-foreground text-center">
                لینک تایید ایمیلتون رو به <span className="font-semibold">{toEmail}</span> ارسال
                کردیم!
              </p>
            ) : (
              <p className="text-muted-foreground text-center">
                یک لینک تایید برای ایمیل شما ارسال کردیم.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
export default VerifyEmailPage
