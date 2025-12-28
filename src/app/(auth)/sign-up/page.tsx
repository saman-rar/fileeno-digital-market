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
import { AuthCredentialsValidator, TAuthCredentialsValidator } from '@/lib/validators'

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  })

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {}

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-87.5">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-30 w-30" />
            <h1 className="text-2xl font-bold">ساخت حساب جدید</h1>
            <Link
              href="sign-in"
              className={buttonVariants({
                variant: 'link',
                className: 'text-muted-foreground!',
              })}
            >
              <ArrowLeft className="w-4 h-4" />
              از قبل ثبت نام کردید؟ وارد شوید
            </Link>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-2 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register('email')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.email,
                    })}
                    placeholder="email@example.com"
                  />
                </div>
                <div className="grid gap-2 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register('password')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.password,
                    })}
                    placeholder="your password"
                  />
                </div>

                <Button>Sign up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default page
