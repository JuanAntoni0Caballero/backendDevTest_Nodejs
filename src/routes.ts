import { Router } from 'express'
import ProductsRoutes from './products/routes.js'
const router = Router()

router.use('/product', ProductsRoutes)

export default router
