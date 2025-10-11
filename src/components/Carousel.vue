<template>
  <div class="carousel">
    <div class="carousel-main">
      <img :src="images[currentIndex]" :alt="`Product image ${currentIndex + 1}`" class="carousel-image" />

      <button
        v-if="images.length > 1"
        @click="prev"
        class="carousel-btn carousel-btn-prev"
        aria-label="Previous image"
      >
        ‹
      </button>

      <button
        v-if="images.length > 1"
        @click="next"
        class="carousel-btn carousel-btn-next"
        aria-label="Next image"
      >
        ›
      </button>
    </div>

    <div v-if="images.length > 1" class="carousel-dots">
      <button
        v-for="(_, index) in images"
        :key="index"
        @click="currentIndex = index"
        :class="['carousel-dot', { active: index === currentIndex }]"
        :aria-label="`Go to image ${index + 1}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  images: string[]
}>()

const currentIndex = ref(0)

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}
</script>

<style scoped>
.carousel {
  width: 100%;
}

.carousel-main {
  position: relative;
  width: 100%;
  height: 500px;
  background: #f8f9fa;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.carousel-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #2c3e50;
}

.carousel-btn:hover {
  background: white;
  transform: translateY(-50%) scale(1.1);
}

.carousel-btn-prev {
  left: 1rem;
}

.carousel-btn-next {
  right: 1rem;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.carousel-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #ddd;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.carousel-dot.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
  transform: scale(1.2);
}

.carousel-dot:hover {
  border-color: #667eea;
}

@media (max-width: 768px) {
  .carousel-main {
    height: 350px;
    padding: 1rem;
  }

  .carousel-btn {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }

  .carousel-btn-prev {
    left: 0.5rem;
  }

  .carousel-btn-next {
    right: 0.5rem;
  }
}
</style>
