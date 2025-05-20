import request from 'supertest'
import app from '../../app.js'

describe('API Routes', () => {
  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/nonexistent')

    expect(res.statusCode).toBe(404)
    expect(res.body).toHaveProperty('message', 'This route does not exist')
  })

  it('should return 404 for unsupported method POST on /product/:id/similar', async () => {
    const res = await request(app).post('/product/1/similar')
    expect(res.statusCode).toBe(404)
  })

  it('should return 404 when productId is missing in the route', async () => {
    const res = await request(app).get('/product//similar')
    expect(res.statusCode).toBe(404)
  })

  it('should return 404 for a route outside /', async () => {
    const res = await request(app).get('/not-an-api-route')
    expect(res.statusCode).toBe(404)
  })
})
