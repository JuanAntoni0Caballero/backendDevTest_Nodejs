import { Router } from 'express'
const router = Router()
import ProductsRoutes from './products/routes.js'

router.get('/', (req, res) => {
  res.json('All good in here')
})

router.use('/product', ProductsRoutes)

export default router
