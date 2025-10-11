<template>
  <router-link :to="`/product/${product.id}`" class="product-card">
    <div class="product-image-wrapper">
      <img :src="product.image" :alt="product.title" class="product-image" />
    </div>
    <div class="product-info">
      <h3 class="product-title">{{ product.title }}</h3>
      <div class="product-footer">
        <p class="product-price">₹{{ product.price.toLocaleString('en-IN') }}</p>
        <div class="product-rating">
          <span class="rating-star">⭐</span>
          <span class="rating-value">{{ product.rating.rate }}</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { Product } from '../stores/product'

defineProps<{
  product: Product
}>()
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.product-image-wrapper {
  width: 100%;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  padding: 2rem;
  overflow: hidden;
}

.product-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.1);
}

.product-info {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-title {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  color: #666;
}

.rating-star {
  font-size: 1rem;
}

.rating-value {
  font-weight: 600;
}

@media (max-width: 768px) {
  .product-image-wrapper {
    height: 200px;
    padding: 1rem;
  }

  .product-info {
    padding: 1rem;
  }

  .product-title {
    font-size: 0.9rem;
  }

  .product-price {
    font-size: 1.2rem;
  }
}
</style>
