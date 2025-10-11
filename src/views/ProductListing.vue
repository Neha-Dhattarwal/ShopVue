<template>
  <div class="product-listing">
    <div class="hero-section">
      <h1 class="hero-title">Discover Amazing Products</h1>
      <p class="hero-subtitle">Shop the latest trends at unbeatable prices</p>
    </div>

    <div class="filters-section">
      <div class="search-wrapper">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
          class="search-input"
        />
        <span class="search-icon">🔍</span>
      </div>

      <select v-model="selectedCategory" class="category-select">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ capitalize(category) }}
        </option>
      </select>
    </div>

    <div v-if="loading" class="products-grid">
      <LoadingSkeleton v-for="i in 8" :key="i" />
    </div>

    <div v-else-if="error" class="error-message">
      <span class="error-icon">⚠️</span>
      <p>{{ error }}</p>
      <button @click="loadProducts" class="retry-btn">Retry</button>
    </div>

    <div v-else-if="filteredProducts.length === 0" class="no-results">
      <span class="no-results-icon">😔</span>
      <p>No products found</p>
    </div>

    <div v-else class="products-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        class="fade-in"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '../stores/product'
import { useApi } from '../composables/useApi'
import ProductCard from '../components/ProductCard.vue'
import LoadingSkeleton from '../components/LoadingSkeleton.vue'

const productStore = useProductStore()
const api = useApi()

const searchQuery = ref('')
const selectedCategory = ref('')
const loading = ref(false)
const error = ref('')
const categories = ref<string[]>([])

const filteredProducts = computed(() => {
  let products = productStore.products

  if (selectedCategory.value) {
    products = products.filter(p => p.category === selectedCategory.value)
  }

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    products = products.filter(p =>
      p.title.toLowerCase().includes(query)
    )
  }

  return products
})

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const loadProducts = async () => {
  try {
    loading.value = true
    error.value = ''
    const [productsData, categoriesData] = await Promise.all([
      api.fetchProducts(),
      api.fetchCategories()
    ])
    productStore.setProducts(productsData)
    categories.value = categoriesData
  } catch (err) {
    error.value = 'Failed to load products. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
.product-listing {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  padding: 3rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: -2rem -2rem 3rem -2rem;
  color: white;
  border-radius: 0 0 32px 32px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  animation: fadeInUp 0.6s ease;
}

.hero-subtitle {
  font-size: 1.3rem;
  opacity: 0.9;
  margin: 0;
  animation: fadeInUp 0.6s ease 0.2s backwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.filters-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.search-wrapper {
  position: relative;
  flex: 1;
  min-width: 250px;
}

.search-input {
  width: 100%;
  padding: 1rem 3rem 1rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.3rem;
}

.category-select {
  padding: 1rem 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
}

.category-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  animation: fadeIn 0.6s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeInScale 0.5s ease;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.error-message,
.no-results {
  text-align: center;
  padding: 4rem 2rem;
}

.error-icon,
.no-results-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.error-message p,
.no-results p {
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

@media (max-width: 768px) {
  .product-listing {
    padding: 1rem;
  }

  .hero-section {
    padding: 2rem 1rem;
    margin: -1rem -1rem 2rem -1rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .filters-section {
    flex-direction: column;
  }

  .search-wrapper,
  .category-select {
    min-width: 100%;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
}
</style>
