import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'ایمیل', type: 'text' },
        password: { label: 'رمز عبور', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('fileds are empty')
        }

        const payload = await getPayload({ config: configPromise })

        try {
          const result = await payload.login({
            collection: 'users',
            data: {
              email: credentials.email,
              password: credentials.password,
            },
          })

          if (result.user) {
            return {
              id: result.user.id,
              email: result.user.email,
            }
          }
        } catch {
          throw new Error('payload login failed!')
        }

        return null
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        // @ts-expect-error user object has id
        session.user.id = token.id
      }
      return session
    },
  },
}
