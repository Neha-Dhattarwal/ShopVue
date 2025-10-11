<template>
  <div
    class="custom-cursor"
    :style="{ left: `${cursorX}px`, top: `${cursorY}px` }"
  ></div>
</template>

<script setup lang="ts">
import { useCursor } from '../composables/useCursor'

const { cursorX, cursorY } = useCursor()
</script>

<style scoped>
.custom-cursor {
  position: fixed;
  width: 20px;
  height: 20px;
  border: 2px solid #667eea;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
  z-index: 9999;
  mix-blend-mode: difference;
}

@media (max-width: 1024px) {
  .custom-cursor {
    display: none;
  }
}
</style>
