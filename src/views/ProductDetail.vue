<template>
  <div class="product-detail">
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Loading product...</p>
    </div>

    <div v-else-if="error" class="error-message">
      <span class="error-icon">⚠️</span>
      <p>{{ error }}</p>
      <button @click="loadProduct" class="retry-btn">Retry</button>
    </div>

    <div v-else-if="product" class="product-container">
      <button @click="router.push('/')" class="back-btn">
        ← Back to Products
      </button>

      <div class="product-content">
        <div class="product-gallery">
          <Carousel :images="productImages" />
        </div>

        <div class="product-info">
          <h1 class="product-title">{{ product.title }}</h1>

          <div class="product-meta">
            <div class="product-rating">
              <span class="rating-stars">
                <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= Math.round(product.rating.rate) }">
                  ⭐
                </span>
              </span>
              <span class="rating-text">
                {{ product.rating.rate }} ({{ product.rating.count }} reviews)
              </span>
            </div>

            <div class="product-category">
              <span class="category-badge">{{ capitalize(product.category) }}</span>
            </div>
          </div>

          <p class="product-price">₹{{ product.price.toLocaleString('en-IN') }}</p>

          <p class="product-description">{{ product.description }}</p>

          <div class="quantity-section">
            <label for="quantity" class="quantity-label">Quantity:</label>
            <select id="quantity" v-model.number="quantity" class="quantity-select">
              <option v-for="i in 5" :key="i" :value="i">{{ i }}</option>
            </select>
          </div>

          <button @click="handleAddToCart" class="add-to-cart-btn">
            <span class="btn-icon">🛒</span>
            Add to Cart
          </button>

          <div v-if="showAddedMessage" class="added-message">
            ✓ Added to cart!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/product'
import { useCartStore } from '../stores/cart'
import { useApi } from '../composables/useApi'
import Carousel from '../components/Carousel.vue'
import type { Product } from '../stores/product'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()
const api = useApi()

const product = ref<Product | null>(null)
const loading = ref(false)
const error = ref('')
const quantity = ref(1)
const showAddedMessage = ref(false)

const productImages = computed(() => {
  if (!product.value) return []
  return [product.value.image, product.value.image, product.value.image]
})

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const loadProduct = async () => {
  try {
    loading.value = true
    error.value = ''
    const productId = Number(route.params.id)

    const cached = productStore.getCachedProduct(productId)
    if (cached) {
      product.value = cached
      loading.value = false
      return
    }

    const data = await api.fetchProduct(productId)
    product.value = data
    productStore.cacheProduct(data)
  } catch (err) {
    error.value = 'Failed to load product. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const handleAddToCart = () => {
  if (!product.value) return

  cartStore.addToCart(
    {
      id: product.value.id,
      title: product.value.title,
      price: product.value.price,
      image: product.value.image
    },
    quantity.value
  )

  showAddedMessage.value = true
  setTimeout(() => {
    showAddedMessage.value = false
  }, 2000)
}

onMounted(() => {
  loadProduct()
})
</script>

<style scoped>
.product-detail {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.loading-container {
  text-align: center;
  padding: 4rem 2rem;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #f0f0f0;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  text-align: center;
  padding: 4rem 2rem;
}

.error-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.error-message p {
  font-size: 1.2rem;
  color: #666;
  margin: 1rem 0;
}

.retry-btn {
  padding: 0.8rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.retry-btn:hover {
  transform: scale(1.05);
}

.product-container {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
}

.back-btn:hover {
  border-color: #667eea;
  color: #667eea;
  transform: translateX(-4px);
}

.product-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  animation: slideUp 0.6s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.product-gallery {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  line-height: 1.3;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rating-stars {
  display: flex;
  gap: 0.2rem;
  font-size: 1.2rem;
}

.star {
  filter: grayscale(100%);
  opacity: 0.3;
}

.star.filled {
  filter: grayscale(0%);
  opacity: 1;
}

.rating-text {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.category-badge {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
}

.product-price {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.product-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin: 0;
}

.quantity-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quantity-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

.quantity-select {
  padding: 0.8rem 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quantity-select:focus {
  outline: none;
  border-color: #667eea;
}

.add-to-cart-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1.2rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
}

.add-to-cart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4);
}

.btn-icon {
  font-size: 1.5rem;
}

.added-message {
  padding: 1rem;
  background: #4caf50;
  color: white;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1024px) {
  .product-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .product-gallery {
    position: static;
  }
}

@media (max-width: 768px) {
  .product-detail {
    padding: 1rem;
  }

  .product-title {
    font-size: 1.5rem;
  }

  .product-price {
    font-size: 2rem;
  }

  .product-description {
    font-size: 1rem;
  }

  .add-to-cart-btn {
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }
}
</style>
