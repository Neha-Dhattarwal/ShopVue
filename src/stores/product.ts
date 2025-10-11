import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const categories = ref<string[]>([])
  const productCache = ref<Map<number, Product>>(new Map())

  const cacheProduct = (product: Product) => {
    productCache.value.set(product.id, product)
  }

  const getCachedProduct = (id: number): Product | undefined => {
    return productCache.value.get(id)
  }

  const setProducts = (newProducts: Product[]) => {
    products.value = newProducts
    newProducts.forEach(product => cacheProduct(product))
  }

  const setCategories = (newCategories: string[]) => {
    categories.value = newCategories
  }

  return {
    products,
    categories,
    setProducts,
    setCategories,
    cacheProduct,
    getCachedProduct
  }
})
