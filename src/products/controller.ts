import { Request, Response, NextFunction } from 'express'
import { fetchSimilarProducts } from './service.js'

export async function getSimilarProducts(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const productId = req.params.productId

    const similarProducts = await fetchSimilarProducts(productId)
    res.status(200).json(similarProducts)
  } catch (err) {
    next(err)
  }
}
