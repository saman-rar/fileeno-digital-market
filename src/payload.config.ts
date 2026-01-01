import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fa } from '@payloadcms/translations/languages/fa'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { transporter } from './lib/nodemailer'
import { Products } from './collections/Products'
import { ProductFiles } from './collections/ProductFiles'
import { Orders } from './collections/Orders'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  email: nodemailerAdapter({
    defaultFromAddress: 'onboarding@resend.dev',
    defaultFromName: 'Fileeno',
    transport: transporter,
  }),
  admin: {
    user: Users.slug,
    components: {
      logout: {
        // @ts-expect-error payload type error
        Button: ['@/components/admin/Logout'],
      },
    },
  },
  collections: [Users, Products, ProductFiles, Orders, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url:
      process.env.DATABASE_URL ||
      'mongodb+srv://saman:930957S.f@cluster0.nkbt7xy.mongodb.net/payload?appName=Cluster0',
  }),
  sharp,
  plugins: [],

  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: { fa },
  },
})
