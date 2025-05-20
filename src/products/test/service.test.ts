import { fetchSimilarProducts } from '../service'

global.fetch = jest.fn() as jest.Mock

describe('fetchSimilarProducts', () => {
  beforeEach(() => {
    ;(fetch as jest.Mock).mockReset()
  })

  it('should skip products that return 404 or 500 errors', async () => {
    ;(fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [1, 2, 5],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: '1',
          name: 'Product 1',
          price: 9.99,
          availability: true,
        }),
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ errorMessage: 'Product not found' }),
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ errorMessage: 'Internal server error' }),
      })

    const result = await fetchSimilarProducts('4')

    expect(result).toEqual([
      {
        id: '1',
        name: 'Product 1',
        price: 9.99,
        availability: true,
      },
    ])
  })
})
