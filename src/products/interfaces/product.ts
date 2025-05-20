export interface Product {
  id: string
  name: string
  price: number
  availability: boolean
  [key: string]: string | number | boolean
}
