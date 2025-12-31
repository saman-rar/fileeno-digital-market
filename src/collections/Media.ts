import { User } from '@/payload-types'
import type { Access, CollectionConfig } from 'payload'

const isAdminOrOwner =
  (): Access =>
  async ({ req }) => {
    const user = req.user as User | undefined

    if (!user) return false
    if (user.role === 'admin') return true

    return {
      user: {
        equals: req.user?.id,
      },
    }
  }

export const Media: CollectionConfig = {
  slug: 'media',
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        return { ...data, user: req.user?.id }
      },
    ],
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*'],
  },
  labels: {
    plural: 'رسانه ها',
    singular: 'رسانه',
  },
  access: {
    read: async ({ req }) => {
      if (!req.user || !req.url?.includes('/admin')) {
        return true
      }

      return await isAdminOrOwner()({ req })
    },
    delete: isAdminOrOwner(),
    update: isAdminOrOwner(),
  },
  admin: {
    hidden: ({ user }) => user.role !== 'admin',
  },
  fields: [
    {
      name: 'alt',
      label: 'موضوع',
      type: 'text',
      required: true,
    },
    {
      name: 'user',
      label: 'منتشر کننده',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
  ],
}
