import { SignUpCredentialsValidator } from '@/lib/validators'
import { publicProcedure, router } from './trpc'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { TRPCError } from '@trpc/server'
import z from 'zod'

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(SignUpCredentialsValidator)
    .mutation(async ({ input }) => {
      const { email, password } = input
      const payload = await getPayload({ config: configPromise })

      const { docs: users } = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      })

      if (users.length !== 0) throw new TRPCError({ code: 'CONFLICT' })

      await payload.create({
        collection: 'users',
        data: {
          email,
          password,
        },
      })

      return { success: true, sentToEmail: email }
    }),

  verifyEmail: publicProcedure
    .input(
      z.object({
        token: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { token } = input

      const payload = await getPayload({ config: configPromise })

      const isVerified = await payload.verifyEmail({
        collection: 'users',
        token,
      })

      if (!isVerified) throw new TRPCError({ code: 'UNAUTHORIZED' })

      return { success: true }
    }),
})
