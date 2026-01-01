import { getToken } from 'next-auth/jwt'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'کاربر',
    plural: 'کاربران',
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return `<a href="${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}"></a>`
      },
    },
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
    // disableLocalStrategy: true,
    strategies: [
      {
        name: 'next-auth',
        authenticate: async ({ headers, payload }) => {
          try {
            // 1. Manually extract the cookie header
            const cookieHeader = headers.get('cookie') || ''

            // 2. Format the request for Auth.js
            // We parse cookies into a Record<string, string>
            const cookieMap: Record<string, string> = {}
            cookieHeader.split(';').forEach((str) => {
              const [name, ...valueParts] = str.split('=')
              if (name && valueParts.length > 0) {
                cookieMap[name.trim()] = valueParts.join('=').trim()
              }
            })

            // 3. Get the token from Auth.js (v5)
            const token = await getToken({
              req: {
                headers: Object.fromEntries(headers.entries()),
                cookies: cookieMap,
              } as any,
              // Use AUTH_SECRET for v5, fallback to NEXTAUTH_SECRET
              secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
            })

            if (!token?.email) return { user: null }

            // 4. Find the user in Payload database
            const result = await payload.find({
              collection: 'users',
              where: {
                email: { equals: token.email },
              },
              limit: 1,
              overrideAccess: true, // Crucial: allows search before login
            })

            const user = result.docs[0]

            if (user) {
              return {
                user: {
                  ...user,
                  collection: 'users', // Critical for access control
                },
              }
            }
          } catch (err) {
            console.error('Auth Strategy Error:', err)
          }

          return { user: null }
        },
      },
    ],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'products',
      label: 'محصولات کاربر',
      admin: {
        condition: () => false,
      },
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'product_files',
      label: 'فایل های کاربر',
      admin: {
        condition: () => false,
      },
      type: 'relationship',
      relationTo: 'product_files',
      hasMany: true,
    },
    {
      name: 'role',
      label: 'دسترسی کاربر',
      defaultValue: 'user',
      required: true,
      admin: {
        condition: () => false,
      },
      type: 'select',
      options: [
        { label: 'ادمین', value: 'admin' },
        { label: 'یوزر', value: 'user' },
      ],
    },
  ],
}
