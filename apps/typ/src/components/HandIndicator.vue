<template>
  <div class="hand-indicator">
    <div class="hand left-hand" :class="{ active: activeHand === 'left' }">
      <svg viewBox="0 0 100 120" class="hand-svg">
        <!-- Palm -->
        <ellipse cx="50" cy="85" rx="35" ry="30" class="palm" />
        <!-- Pinky (leftmost) -->
        <rect x="10" y="20" width="12" height="45" rx="6" class="finger pinky" :class="{ 'finger-active': activeFinger === 'pinky' && activeHand === 'left' }" />
        <!-- Ring -->
        <rect x="24" y="8" width="13" height="55" rx="6" class="finger ring" :class="{ 'finger-active': activeFinger === 'ring' && activeHand === 'left' }" />
        <!-- Middle -->
        <rect x="39" y="2" width="14" height="60" rx="7" class="finger middle" :class="{ 'finger-active': activeFinger === 'middle' && activeHand === 'left' }" />
        <!-- Index -->
        <rect x="55" y="10" width="13" height="52" rx="6" class="finger index" :class="{ 'finger-active': activeFinger === 'index' && activeHand === 'left' }" />
        <!-- Thumb -->
        <ellipse cx="78" cy="75" rx="12" ry="20" class="finger thumb" transform="rotate(30 78 75)" :class="{ 'finger-active': activeFinger === 'thumb' && activeHand === 'left' }" />
      </svg>
      <span class="hand-label">Left</span>
    </div>

    <div class="hand right-hand" :class="{ active: activeHand === 'right' }">
      <svg viewBox="0 0 100 120" class="hand-svg">
        <!-- Palm -->
        <ellipse cx="50" cy="85" rx="35" ry="30" class="palm" />
        <!-- Index (leftmost for right hand) -->
        <rect x="32" y="10" width="13" height="52" rx="6" class="finger index" :class="{ 'finger-active': activeFinger === 'index' && activeHand === 'right' }" />
        <!-- Middle -->
        <rect x="47" y="2" width="14" height="60" rx="7" class="finger middle" :class="{ 'finger-active': activeFinger === 'middle' && activeHand === 'right' }" />
        <!-- Ring -->
        <rect x="63" y="8" width="13" height="55" rx="6" class="finger ring" :class="{ 'finger-active': activeFinger === 'ring' && activeHand === 'right' }" />
        <!-- Pinky (rightmost) -->
        <rect x="78" y="20" width="12" height="45" rx="6" class="finger pinky" :class="{ 'finger-active': activeFinger === 'pinky' && activeHand === 'right' }" />
        <!-- Thumb -->
        <ellipse cx="22" cy="75" rx="12" ry="20" class="finger thumb" transform="rotate(-30 22 75)" :class="{ 'finger-active': activeFinger === 'thumb' && activeHand === 'right' }" />
      </svg>
      <span class="hand-label">Right</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  nextKey: {
    type: String,
    default: null
  }
})

// Standard touch typing finger assignments for QWERTY keyboard
const keyToFinger = {
  // Left hand - pinky
  '`': { hand: 'left', finger: 'pinky' },
  '1': { hand: 'left', finger: 'pinky' },
  'q': { hand: 'left', finger: 'pinky' },
  'a': { hand: 'left', finger: 'pinky' },
  'z': { hand: 'left', finger: 'pinky' },
  'tab': { hand: 'left', finger: 'pinky' },
  'caps': { hand: 'left', finger: 'pinky' },
  'shift': { hand: 'left', finger: 'pinky' },

  // Left hand - ring
  '2': { hand: 'left', finger: 'ring' },
  'w': { hand: 'left', finger: 'ring' },
  's': { hand: 'left', finger: 'ring' },
  'x': { hand: 'left', finger: 'ring' },

  // Left hand - middle
  '3': { hand: 'left', finger: 'middle' },
  'e': { hand: 'left', finger: 'middle' },
  'd': { hand: 'left', finger: 'middle' },
  'c': { hand: 'left', finger: 'middle' },

  // Left hand - index (includes reach keys)
  '4': { hand: 'left', finger: 'index' },
  '5': { hand: 'left', finger: 'index' },
  'r': { hand: 'left', finger: 'index' },
  't': { hand: 'left', finger: 'index' },
  'f': { hand: 'left', finger: 'index' },
  'g': { hand: 'left', finger: 'index' },
  'v': { hand: 'left', finger: 'index' },
  'b': { hand: 'left', finger: 'index' },

  // Right hand - index (includes reach keys)
  '6': { hand: 'right', finger: 'index' },
  '7': { hand: 'right', finger: 'index' },
  'y': { hand: 'right', finger: 'index' },
  'u': { hand: 'right', finger: 'index' },
  'h': { hand: 'right', finger: 'index' },
  'j': { hand: 'right', finger: 'index' },
  'n': { hand: 'right', finger: 'index' },
  'm': { hand: 'right', finger: 'index' },

  // Right hand - middle
  '8': { hand: 'right', finger: 'middle' },
  'i': { hand: 'right', finger: 'middle' },
  'k': { hand: 'right', finger: 'middle' },
  ',': { hand: 'right', finger: 'middle' },

  // Right hand - ring
  '9': { hand: 'right', finger: 'ring' },
  'o': { hand: 'right', finger: 'ring' },
  'l': { hand: 'right', finger: 'ring' },
  '.': { hand: 'right', finger: 'ring' },

  // Right hand - pinky
  '0': { hand: 'right', finger: 'pinky' },
  '-': { hand: 'right', finger: 'pinky' },
  '=': { hand: 'right', finger: 'pinky' },
  'p': { hand: 'right', finger: 'pinky' },
  '[': { hand: 'right', finger: 'pinky' },
  ']': { hand: 'right', finger: 'pinky' },
  '\\': { hand: 'right', finger: 'pinky' },
  ';': { hand: 'right', finger: 'pinky' },
  "'": { hand: 'right', finger: 'pinky' },
  '/': { hand: 'right', finger: 'pinky' },
  'return': { hand: 'right', finger: 'pinky' },
  'delete': { hand: 'right', finger: 'pinky' },
  'shift-r': { hand: 'right', finger: 'pinky' },

  // Thumbs - space bar (can use either, typically right)
  ' ': { hand: 'right', finger: 'thumb' },
  'space': { hand: 'right', finger: 'thumb' },
}

const activeHand = computed(() => {
  if (!props.nextKey) return null
  const key = props.nextKey.toLowerCase()
  const mapping = keyToFinger[key] || keyToFinger[props.nextKey]
  return mapping?.hand || null
})

const activeFinger = computed(() => {
  if (!props.nextKey) return null
  const key = props.nextKey.toLowerCase()
  const mapping = keyToFinger[key] || keyToFinger[props.nextKey]
  return mapping?.finger || null
})
</script>

<style scoped>
.hand-indicator {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}

.hand {
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.4;
  transition: opacity 0.2s ease;
}

.hand.active {
  opacity: 1;
}

.hand-svg {
  width: 120px;
  height: 144px;
}

.palm {
  fill: var(--key-special-bg);
  stroke: var(--text-primary);
  stroke-width: 2.5;
}

.finger {
  fill: var(--key-bg);
  stroke: var(--text-primary);
  stroke-width: 2.5;
  transition: all 0.2s ease;
}

.finger-active {
  fill: #3b82f6;
  stroke: #2563eb;
  animation: finger-pulse 1s ease-in-out infinite;
}

@keyframes finger-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.hand-label {
  margin-top: 0.25rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.hand.active .hand-label {
  color: var(--text-primary);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .hand-indicator {
    gap: 1.5rem;
    padding: 0.4rem;
    margin-bottom: 0.4rem;
  }

  .hand-svg {
    width: 80px;
    height: 96px;
  }

  .hand-label {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .hand-indicator {
    gap: 1rem;
    padding: 0.3rem;
    margin-bottom: 0.3rem;
  }

  .hand-svg {
    width: 60px;
    height: 72px;
  }

  .hand-label {
    font-size: 0.7rem;
  }
}
</style>
