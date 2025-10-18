import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useActivityTimer() {
  const activeSeconds = ref(0)
  const lastActivityTime = ref(Date.now())
  const isPaused = ref(false)
  let intervalId = null

  // Time in milliseconds to wait before pausing (15 seconds)
  const INACTIVITY_THRESHOLD = 15000

  // Record activity
  const recordActivity = () => {
    lastActivityTime.value = Date.now()
    if (isPaused.value) {
      isPaused.value = false
    }
  }

  // Format seconds as MM:SS
  const formattedTime = computed(() => {
    const minutes = Math.floor(activeSeconds.value / 60)
    const seconds = activeSeconds.value % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  })

  // Timer tick
  const tick = () => {
    const now = Date.now()
    const timeSinceActivity = now - lastActivityTime.value

    // If no activity for more than threshold, pause
    if (timeSinceActivity > INACTIVITY_THRESHOLD) {
      if (!isPaused.value) {
        isPaused.value = true
      }
    }

    // Only increment if not paused
    if (!isPaused.value) {
      activeSeconds.value++
    }
  }

  onMounted(() => {
    // Start the timer
    intervalId = setInterval(tick, 1000)
  })

  onUnmounted(() => {
    // Clean up
    if (intervalId) {
      clearInterval(intervalId)
    }
  })

  return {
    activeSeconds,
    formattedTime,
    isPaused,
    recordActivity
  }
}
