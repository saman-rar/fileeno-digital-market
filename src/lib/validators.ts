import { z } from 'zod'

export const SignUpCredentialsValidator = z
  .object({
    email: z.email('لطفا یک ایمیل معتبر وارد کنید'),
    password: z
      .string()
      .min(8, { message: 'رمز عبور باید شامل حداقل 8 کاراکتر باشد.' })
      .regex(/[A-Z]/, 'رمز عبور باید شاما حداقل یک حرف لاتین بزرگ باشد')
      .regex(/[a-z]/, 'رمز عبور باید شامل حداقل یک حرف لاتین کوچو باشد')
      .regex(/[0-9]/, 'رمز عبور باید شامل حداقل یک عدد باشد')
      .regex(/[^A-Za-z0-9]/, 'رمز عبور باید شامل حداقل یک کاراکتر خاص باشد'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'رمز عبور و تکرار آن یکسان نیستند',
    path: ['confirmPassword'],
  })

export type TSignUpCredentialsValidator = z.infer<typeof SignUpCredentialsValidator>

export const SignInCredentialsValidator = z.object({
  email: z.email('لطفا یک ایمیل معتبر وارد کنید'),
  password: z
    .string()
    .min(8, { message: 'رمز عبور باید شامل حداقل 8 کاراکتر باشد.' })
    .regex(/[A-Z]/, 'رمز عبور باید شاما حداقل یک حرف لاتین بزرگ باشد')
    .regex(/[a-z]/, 'رمز عبور باید شامل حداقل یک حرف لاتین کوچو باشد')
    .regex(/[0-9]/, 'رمز عبور باید شامل حداقل یک عدد باشد')
    .regex(/[^A-Za-z0-9]/, 'رمز عبور باید شامل حداقل یک کاراکتر خاص باشد'),
})

export type TSignInCredentialsValidator = z.infer<typeof SignInCredentialsValidator>

export const QueryValidator = z.object({
  category: z.string().optional(),
  sort: z.enum(['asc', 'desc']).optional(),
  limit: z.number().optional(),
})

export type TQueryValidator = z.infer<typeof QueryValidator>
