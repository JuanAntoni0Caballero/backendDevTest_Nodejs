import request from 'supertest'
import app from '../../app.js'
import { Product } from '../interfaces/prodcut.js'

describe('GET /product/:id/similar', () => {
  it('should return 200 and similar products for a valid product', async () => {
    const response = await request(app).get('/product/1/similar')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)

    const products: Product[] = response.body

    products.forEach((product) => {
      expect(product).toHaveProperty('id')
      expect(product).toHaveProperty('name')
      expect(product).toHaveProperty('price')
      expect(product).toHaveProperty('availability')
    })
  })

  it('should return 404 for a non-existing product', async () => {
    const response = await request(app).get('/product/99999/similar')
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('errorMessage', 'Product not found')
  })

  it('should return 400 when the productId is not a number', async () => {
    const invalidIds = ['abc', '!', 'null', 'undefined']

    for (const invalidId of invalidIds) {
      const res = await request(app).get(`/product/${invalidId}/similar`)

      expect(res.statusCode).toBe(400)
      expect(res.body).toHaveProperty(
        'errorMessage',
        'El identificador del producto debe ser un número válido'
      )
    }
  })
})
