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
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
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
