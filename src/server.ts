import express from 'express'
import { nextApp, nextHandler } from './next-utils'
import * as trcpExpress from '@trpc/server/adapters/express'
import { appRouter } from './trpc'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// export type ExpressContext = Awaited<ReturnType<typeof createContext>>

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
)

const createContext = ({ req, res }: trcpExpress.CreateExpressContextOptions) => ({ req, res })

app.use(
  '/api/trpc',
  trcpExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
)

app.use((req, res) => nextHandler(req, res))

nextApp.prepare().then(() => {
  app.listen(PORT)
})
