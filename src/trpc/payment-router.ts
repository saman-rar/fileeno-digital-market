import z from 'zod'
import { privateProcedure, router } from './trpc'
import { TRPCError } from '@trpc/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { stripe } from '@/lib/stripe'
import type Stripe from 'stripe'

export const paymentRouter = router({
  createSession: privateProcedure
    .input(z.object({ productIds: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx
      const { productIds } = input

      if (productIds.length === 0) {
        throw new TRPCError({ code: 'BAD_REQUEST' })
      }

      const payload = await getPayload({ config: configPromise })

      const { docs: products } = await payload.find({
        collection: 'products',
        where: {
          id: {
            in: productIds,
          },
        },
      })

      const filteredProducts = products.filter((product) => Boolean(product.price))

      const order = await payload.create({
        collection: 'orders',
        data: {
          _isPaid: false,
          products: filteredProducts.map((product) => product.id),
          user: user.email as string,
        },
      })

      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

      filteredProducts.forEach((product) => {
        line_items.push({
          price: product.priceId!,
          quantity: 1,
        })
      })

      line_items.push({
        price: 'price_1SmCcmDcWPMkf7OaO34x09OB',
        quantity: 1,
        adjustable_quantity: {
          enabled: false,
        },
      })

      try {
        const stripeSession = await stripe.checkout.sessions.create({
          success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?${order.id}`,
          cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
          payment_method_types: ['card', 'paypal'],
          mode: 'payment',
          metadata: {
            user: user.email ?? 'No Useer',
            orderId: order.id,
          },
          line_items,
        })

        return { url: stripeSession.url }
      } catch (error) {
        console.log(error)

        return { url: null }
      }
    }),
})
