'use client'

import { Icons } from '@/components/Icons'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignInCredentialsValidator, TSignInCredentialsValidator } from '@/lib/validators'
import { trpc } from '@/trpc/client'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'
import ZodErrors from '@/components/ZodErrors'

const SignInPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const isSeller = searchParams.get('as') === 'seller'
  const origin = searchParams.get('origin')

  const continueAsSeller = () => {
    router.push('?as=seller')
  }
  const continueAsCustomer = () => {
    router.replace('/sign-in', undefined)
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignInCredentialsValidator>({
    resolver: zodResolver(SignInCredentialsValidator),
  })

  const {
    mutateAsync,
    isPending,
    error: mutateError,
  } = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      router.refresh()

      if (origin) {
        return router.push('/' + origin)
      }

      if (isSeller) {
        return router.push('/admin')
      }

      router.push('/')
    },
  })

  const onSubmit = ({ email, password }: TSignInCredentialsValidator) => {
    toast.promise(mutateAsync({ email, password }), {
      loading: 'در حال برسی اطلاعات ...',
      success: 'با موقیت وارد شدید.',
      error: () => {
        if (mutateError?.data?.code === 'UNAUTHORIZED') {
          return 'ایمیل یا رمز عبور صحیح نمی‌باشد'
        }
        return 'خطایی رخ داد'
      },
    })
  }
  return (
    <>
      <div className="container px-15 relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-87.5">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-30 w-30" />
            <h1 className="text-2xl font-bold">ورود به {isSeller ? 'پنل فروش' : 'فایلینو'}</h1>
            <Link
              href="sign-up"
              className={buttonVariants({
                variant: 'link',
                className: 'text-muted-foreground!',
              })}
            >
              <ArrowLeft className="w-4 h-4" />
              حساب کاربر ندارید؟ ثبت نام کنید.
            </Link>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-2 py-2">
                  <Label htmlFor="email">ایمیل</Label>
                  <Input
                    dir="ltr"
                    {...register('email')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.email,
                    })}
                    placeholder="email@example.com"
                    id="email"
                  />
                </div>
                <div className="grid gap-2 py-2">
                  <Label htmlFor="password">رمز عبور</Label>
                  <Input
                    dir="ltr"
                    {...register('password')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.password,
                    })}
                    type="password"
                    placeholder="رمز عبور خود را وارد کنید"
                    id="password"
                  />
                </div>

                <ZodErrors errors={errors} />

                <Button disabled={isSubmitting} className="mt-2">
                  ورود
                  {isSubmitting && ' ...'}
                </Button>
              </div>
            </form>

            <div className="relative">
              <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-sm uppercase">
                <span className="bg-background px-2 text-accent-foreground">
                  {isSeller ? 'دستتون خورد؟' : 'فروشنده هستید؟'}
                </span>
              </div>
            </div>

            {isSeller ? (
              <Button onClick={continueAsCustomer} disabled={isPending} variant="secondary">
                ادامه به عنوان کاربر
              </Button>
            ) : (
              <Button onClick={continueAsSeller} disabled={isPending} variant="secondary">
                ادامه به عنوان فروشنده
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default SignInPage
