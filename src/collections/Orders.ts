import { User } from '@/payload-types'
import { Access, CollectionConfig } from 'payload'

const yourOwn: Access = ({ req }) => {
  const user = req.user as User | null

  if (user?.role === 'admin') return true

  return {
    user: {
      equals: user?.id,
    },
  }
}

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    plural: 'سفارش ها',
    singular: 'سفارش',
  },
  admin: {
    useAsTitle: 'user',
    description: 'خلاصه ای از تمام سفارش های شما در فایلینو',
  },
  access: {
    read: yourOwn,
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
    create: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: '_isPaid',
      label: 'پرداخت شده',
      type: 'checkbox',
      access: {
        read: ({ req }) => req.user?.role === 'admin',
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
      required: true,
    },
    {
      name: 'user',
      label: 'خریدار',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        hidden: true,
      },
      required: true,
      hasMany: false,
    },
    {
      name: 'products',
      label: 'محصولات',
      type: 'relationship',
      relationTo: 'products',
      required: true,
      hasMany: true,
    },
  ],
}
