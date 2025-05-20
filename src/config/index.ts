import express, { Application } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const FRONTEND_URL = process.env.ORIGIN || 'http://localhost:3000'

export default function configApp(app: Application): void {
  app.set('trust proxy', 1)

  app.use(
    cors({
      origin: [FRONTEND_URL],
    })
  )

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
}
