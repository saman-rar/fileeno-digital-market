import { z } from 'zod'

export const AuthCredentialsValidator = z.object({
  email: z.email(),
  password: z.string().min(8, { message: 'رمز عبور باید شامل حداقل 8 کاراکتر باشد.' }),
})

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>
