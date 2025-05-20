import logger from '../utils/logger.js'
import { Application, Request, Response, NextFunction } from 'express'

export interface CustomError extends Error {
  status?: number
}

export default function errorHandling(app: Application): void {
  app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'This route does not exist' })
  })

  app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    logger.error(`${req.method} ${req.path} - ${err.message}`)

    const status = err.status || 500
    res.status(status).json({
      errorMessage: status === 500 ? 'Error interno del servidor' : err.message,
    })
    next()
  })
}
