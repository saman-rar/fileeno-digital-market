import { PRODUCT_CATEGORIES } from '@/config'
import { CollectionConfig } from 'payload'

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
      max: 1000,
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
