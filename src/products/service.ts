import logger from '../utils/logger.js'
import { Product } from './interfaces/product.js'
import { CustomError } from '../error-handling/index.js'

export async function getSimilarProductIds(productId: string): Promise<number[]> {
  const BASE_URL = process.env.BASE_URL
  const response = await fetch(`${BASE_URL}/${productId}/similarids`)

  if (response.status === 404) {
    const error: CustomError = new Error('Product not found')
    error.status = 404
    throw error
  }

  if (response.status === 500) {
    const error: CustomError = new Error(`Failed to fetch similar IDs (status ${response.status})`)
    error.status = 500
    throw error
  }

  return await response.json()
}

export async function* getProductDetailsByIdsStream(
  ids: number[]
): AsyncGenerator<Product, void, unknown> {
  const BASE_URL = process.env.BASE_URL

  for (const id of ids) {
    try {
      const res = await fetch(`${BASE_URL}/${id}`)

      if (!res.ok) {
        if (res.status === 404) {
          logger.warn(`Producto ${id} no encontrado (404)`)
          continue
        }
        if (res.status === 500) {
          logger.error(`Error del servidor para producto ${id} (500)`)
          continue
        }
        throw new Error(`Error al obtener producto ${id} (status ${res.status})`)
      }

      const product = (await res.json()) as Product
      yield product
    } catch (err: unknown) {
      logger.error(
        `Error al obtener producto ${id}: ${err instanceof Error ? err.message : String(err)}`
      )
    }
  }
}
