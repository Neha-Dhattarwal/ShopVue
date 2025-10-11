import { ref, onMounted, onUnmounted } from 'vue'

export const useCursor = () => {
  const cursorX = ref(0)
  const cursorY = ref(0)

  const updateCursor = (e: MouseEvent) => {
    cursorX.value = e.clientX
    cursorY.value = e.clientY
  }

  onMounted(() => {
    window.addEventListener('mousemove', updateCursor)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', updateCursor)
  })

  return {
    cursorX,
    cursorY
  }
}
