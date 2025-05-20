import { Router } from 'express'
const router = Router()
import { getSimilarProducts } from './controller.js'

router.get('/:productId/similar', getSimilarProducts)

export default router
