import { Request, Response, NextFunction } from 'express'
import { fetchSimilarProducts } from './service.js'
import { CustomError } from '../error-handling/index.js'

export async function getSimilarProducts(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const productIdStr = req.params.productId
    const productId = Number(productIdStr)

    if (isNaN(productId)) {
      const err: CustomError = new Error('El identificador del producto debe ser un número válido')
      err.status = 400
      throw err
    }
    const similarProducts = await fetchSimilarProducts(productIdStr)
    res.status(200).json(similarProducts)
  } catch (err) {
    next(err)
  }
}
