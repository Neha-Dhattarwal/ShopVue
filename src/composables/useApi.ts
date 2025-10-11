import axios from 'axios'
import type { Product } from '../stores/product'

const API_BASE = 'https://fakestoreapi.com'
const USD_TO_INR = 83

export const useApi = () => {
  const convertToINR = (usdPrice: number): number => {
    return Math.round(usdPrice * USD_TO_INR)
  }

  const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get(`${API_BASE}/products`)
    return response.data.map((product: Product) => ({
      ...product,
      price: convertToINR(product.price)
    }))
  }

  const fetchProduct = async (id: number): Promise<Product> => {
    const response = await axios.get(`${API_BASE}/products/${id}`)
    return {
      ...response.data,
      price: convertToINR(response.data.price)
    }
  }

  const fetchCategories = async (): Promise<string[]> => {
    const response = await axios.get(`${API_BASE}/products/categories`)
    return response.data
  }

  const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
    const response = await axios.get(`${API_BASE}/products/category/${category}`)
    return response.data.map((product: Product) => ({
      ...product,
      price: convertToINR(product.price)
    }))
  }

  return {
    fetchProducts,
    fetchProduct,
    fetchCategories,
    fetchProductsByCategory
  }
}
