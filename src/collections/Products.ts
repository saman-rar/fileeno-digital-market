import { PRODUCT_CATEGORIES } from '@/config'
import { stripe } from '@/lib/stripe'
import { Product } from '@/payload-types'
import { BeforeChangeHook } from 'node_modules/payload/dist/collections/config/types'

import { CollectionConfig } from 'payload'

const addUser: BeforeChangeHook<Product> = async ({ req, data }) => {
  // TODO : if it works change all the get users to this
  const { user } = req

  return { ...data, user: user?.id }
}

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    plural: 'محصولات',
    singular: 'محصول',
  },
  admin: {
    useAsTitle: 'name',
  },
  access: {},
  hooks: {
    beforeChange: [
      addUser,
      async (args) => {
        if (args.operation === 'create') {
          const data = args.data as Product

          const createdProduct = await stripe.products.create({
            name: data.name,
            default_price_data: {
              currency: 'IRR',
              unit_amount: Math.round(data.price * 1000),
            },
          })

          const updated: Product = {
            ...data,
            stripeId: createdProduct.id,
            priceId: createdProduct.default_price as string,
          }

          return updated
        } else if (args.operation === 'update') {
          const data = args.data as Product

          const updatedProcut = await stripe.products.update(data.stripeId!, {
            name: data.name,
            default_price: data.priceId!,
          })

          const updated: Product = {
            ...data,
            stripeId: updatedProcut.id,
            priceId: updatedProcut.default_price as string,
          }

          return updated
        }
      },
    ],
  },
  fields: [
    {
      name: 'user',
      label: 'منتشرکننده',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: 'name',
      label: 'نام',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'جزئیات محصول',
    },
    {
      name: 'price',
      label: 'قیمت (تومان)',
      min: 0,
      type: 'number',
      required: true,
    },
    {
      name: 'category',
      label: 'دسته بندی',
      type: 'select',
      options: PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
      required: true,
    },
    {
      name: 'product_files',
      label: 'فایل محصول',
      type: 'relationship',
      relationTo: 'product_files',
      required: true,
      hasMany: false,
    },
    {
      name: 'provedForSale',
      label: 'وضعیت محصول',
      type: 'select',
      access: {
        create: ({ req }) => req.user?.role === 'admin',
        read: ({ req }) => req.user?.role === 'admin',
        update: ({ req }) => req.user?.role === 'admin',
      },
      defaultValue: 'pending',
      options: [
        {
          label: 'در حال بررسی',
          value: 'pending',
        },
        {
          label: 'منتشر شد',
          value: 'approved',
        },
        {
          label: 'تایید نشد',
          value: 'denied',
        },
      ],
    },
    {
      name: 'priceId',
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'stripeId',
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'images',
      label: 'تصاویر',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: 'تصویر',
        plural: 'تصاویر',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
