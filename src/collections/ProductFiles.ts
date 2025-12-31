import { User } from '@/payload-types'
import { BeforeChangeHook } from 'node_modules/payload/dist/collections/config/types'
import { Access, CollectionConfig } from 'payload'

const addUser: BeforeChangeHook = ({ req, data }) => {
  const user = req.user as User | null

  return { ...data, user: user?.id }
}

const sellerOrBuyer: Access = async ({ req }) => {
  const user = req.user as User | null

  if (!user) return false
  if (user?.role === 'admin') return true

  const { docs: products } = await req.payload.find({
    collection: 'products',
    depth: 0,
    where: {
      user: {
        equals: user.id,
      },
    },
  })
  const ownProductFileIds = products.map((product) => product.product_files).flat()

  const { docs: orders } = await req.payload.find({
    collection: 'orders',
    depth: 2,
    where: {
      user: {
        equals: user.id,
      },
    },
  })
  const ownOrdersFileIds = orders
    .map((order) => {
      return order.products.map((product) => {
        if (typeof product === 'string')
          return req.payload.logger.error('Search depth not sufficient to find purchased file IDs')

        return typeof product.product_files === 'string'
          ? product.product_files
          : product.product_files.id
      })
    })
    .filter(Boolean)
    .flat()

  return {
    id: {
      in: [...ownOrdersFileIds, ...ownProductFileIds],
    },
  }
}

const canOwnerDeleteOrChange: Access = async ({ req, id }) => {
  const user = req.user as User | null

  if (!user) return false
  if (user.role === 'admin') return true

  const product = await req.payload.find({
    collection: 'products',
    where: {
      product_files: {
        contains: id,
      },
    },
  })

  if (product.totalDocs > 0) return false

  return {
    user: {
      equals: user.id,
    },
  }
}

export const ProductFiles: CollectionConfig = {
  slug: 'product_files',
  labels: {
    plural: 'فایل های محصولات',
    singular: 'فایل محصولات',
  },
  admin: {
    hidden: ({ user }) => user.role !== 'admin',
  },
  hooks: {
    beforeChange: [addUser],
  },
  access: {
    read: sellerOrBuyer,
    update: canOwnerDeleteOrChange,
    delete: canOwnerDeleteOrChange,
  },
  upload: {
    staticDir: 'product_files',
    mimeTypes: ['images/*', 'fonts/*', 'application/postscript'],
  },
  fields: [
    {
      name: 'user',
      label: 'منتشر کننده',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        condition: () => false,
      },
      hasMany: false,
      required: true,
    },
  ],
}
