import logger from '../utils/logger.js'
import { fetchWithTimeout } from '../utils/fetchWithTimeout.js'
import { Product } from './interfaces/prodcut.js'
import { CustomError } from '../error-handling/index.js'

export async function fetchSimilarProducts(productId: string): Promise<Product[]> {
  const similarIds = await getSimilarProductIds(productId)
  return await getProductDetailsByIds(similarIds)
}

async function getSimilarProductIds(productId: string): Promise<number[]> {
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

export async function getProductDetailsByIds(ids: number[]): Promise<Product[]> {
  const BASE_URL = process.env.BASE_URL

  const productDetailsPromises = ids.map(async (id) => {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}/${id}`, {}, 2000)

      if (!res.ok) {
        if (res.status === 404) {
          logger.warn(`Producto ${id} no encontrado (404)`)
          return null
        }
        if (res.status === 500) {
          logger.error(`Error del servidor para producto ${id} (500)`)
          return null
        }
        throw new Error(`Error al obtener producto ${id} (status ${res.status})`)
      }

      return (await res.json()) as Product
    } catch (err: any) {
      logger.error(`Error al obtener producto ${id}: ${err.message}`)
      return null
    }
  })

  const products = await Promise.all(productDetailsPromises)
  return products.filter((product): product is Product => product !== null)
}
