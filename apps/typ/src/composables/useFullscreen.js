import { ref, onMounted, onUnmounted } from 'vue'

export function useFullscreen() {
  const isFullscreen = ref(false)

  const updateFullscreenState = () => {
    isFullscreen.value = !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    )
  }

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen.value) {
        // Enter fullscreen
        const elem = document.documentElement
        if (elem.requestFullscreen) {
          await elem.requestFullscreen()
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen()
        } else if (elem.mozRequestFullScreen) {
          await elem.mozRequestFullScreen()
        } else if (elem.msRequestFullscreen) {
          await elem.msRequestFullscreen()
        }
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          await document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen()
        }
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error)
    }
  }

  onMounted(() => {
    document.addEventListener('fullscreenchange', updateFullscreenState)
    document.addEventListener('webkitfullscreenchange', updateFullscreenState)
    document.addEventListener('mozfullscreenchange', updateFullscreenState)
    document.addEventListener('msfullscreenchange', updateFullscreenState)
    updateFullscreenState()
  })

  onUnmounted(() => {
    document.removeEventListener('fullscreenchange', updateFullscreenState)
    document.removeEventListener('webkitfullscreenchange', updateFullscreenState)
    document.removeEventListener('mozfullscreenchange', updateFullscreenState)
    document.removeEventListener('msfullscreenchange', updateFullscreenState)
  })

  return {
    isFullscreen,
    toggleFullscreen
  }
}
