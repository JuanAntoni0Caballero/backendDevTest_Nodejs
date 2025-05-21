import { Request, Response, NextFunction } from 'express'
import { getSimilarProductIds, getProductDetailsByIdsStream } from './service.js'
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

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    })

    const similarIds = await getSimilarProductIds(productIdStr)

    for await (const product of getProductDetailsByIdsStream(similarIds)) {
      res.write(`data: ${JSON.stringify(product)}\n\n`)
    }

    res.write('event: end\ndata: fin\n\n')
    res.end()
  } catch (err) {
    next(err)
  }
}
