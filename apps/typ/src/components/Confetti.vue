<template>
  <div class="confetti-container" v-if="showConfetti">
    <div
      v-for="(piece, index) in confettiPieces"
      :key="confettiKey + '-' + index"
      class="confetti-piece"
      :style="{
        left: piece.left + '%',
        backgroundColor: piece.color,
        animationDelay: piece.delay + 's',
        animationDuration: piece.duration + 's',
        transform: `rotate(${piece.rotation}deg)`,
        width: piece.size + 'px',
        height: piece.size * 0.6 + 'px'
      }"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

const colors = [
  '#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d',
  '#43aa8b', '#577590', '#3b82f6', '#8b5cf6', '#ec4899'
]

const showConfetti = ref(false)
const confettiPieces = ref([])
const confettiKey = ref(0)
let hideTimeout = null

const generatePieces = () => {
  const pieces = []
  for (let i = 0; i < 120; i++) {
    pieces.push({
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
      duration: 4 + Math.random() * 2,
      rotation: Math.random() * 360,
      size: 8 + Math.random() * 8
    })
  }
  return pieces
}

watch(() => props.active, (newVal) => {
  if (newVal) {
    // Clear any existing timeout
    if (hideTimeout) {
      clearTimeout(hideTimeout)
    }
    // Generate new confetti and show
    confettiKey.value++
    confettiPieces.value = generatePieces()
    showConfetti.value = true

    // Hide after 4 seconds
    hideTimeout = setTimeout(() => {
      showConfetti.value = false
    }, 4000)
  }
})
</script>

<style scoped>
.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1000;
}

.confetti-piece {
  position: absolute;
  top: -20px;
  border-radius: 2px;
  animation: confetti-fall linear forwards;
}

@keyframes confetti-fall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}
</style>
