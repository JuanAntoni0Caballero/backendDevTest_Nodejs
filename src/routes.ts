import { Router, Request, Response } from 'express'
import ProductsRoutes from './products/routes.js'
const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.json('All good in here')
})

router.use('/product', ProductsRoutes)

export default router
