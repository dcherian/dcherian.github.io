<template>
  <div class="keyboard">
    <div v-for="(row, rowIndex) in keyboardLayout" :key="rowIndex" class="keyboard-row">
      <button
        v-for="key in row"
        :key="key.key"
        :class="[
          'key',
          key.class,
          {
            'highlight': key.key.toLowerCase() === nextKey?.toLowerCase(),
            'highlight-delete': shouldHighlightDelete && key.key === 'delete'
          }
        ]"
        :style="{ width: key.width || '2.5rem' }"
      >
        {{ key.display }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  nextKey: {
    type: String,
    default: null
  },
  shouldHighlightDelete: {
    type: Boolean,
    default: false
  }
})

// Mobile-style QWERTY keyboard layout (similar to iOS/Android)
const keyboardLayout = [
  [
    { key: 'q', display: 'Q' },
    { key: 'w', display: 'W' },
    { key: 'e', display: 'E' },
    { key: 'r', display: 'R' },
    { key: 't', display: 'T' },
    { key: 'y', display: 'Y' },
    { key: 'u', display: 'U' },
    { key: 'i', display: 'I' },
    { key: 'o', display: 'O' },
    { key: 'p', display: 'P' }
  ],
  [
    { key: 'a', display: 'A' },
    { key: 's', display: 'S' },
    { key: 'd', display: 'D' },
    { key: 'f', display: 'F' },
    { key: 'g', display: 'G' },
    { key: 'h', display: 'H' },
    { key: 'j', display: 'J' },
    { key: 'k', display: 'K' },
    { key: 'l', display: 'L' }
  ],
  [
    { key: 'z', display: 'Z' },
    { key: 'x', display: 'X' },
    { key: 'c', display: 'C' },
    { key: 'v', display: 'V' },
    { key: 'b', display: 'B' },
    { key: 'n', display: 'N' },
    { key: 'm', display: 'M' },
    { key: 'delete', display: '⌫', class: 'delete-key' }
  ],
  [
    { key: '123', display: '123', class: 'number-key' },
    { key: 'space', display: 'space', class: 'space-key' },
    { key: 'return', display: 'return', class: 'return-key' }
  ]
]
</script>

<style scoped>
.keyboard {
  padding: 0.5rem 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: center;
  background-color: var(--keyboard-bg);
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  max-width: 100%;
}

.keyboard-row {
  display: flex;
  gap: 0.35rem;
  justify-content: center;
  width: 100%;
  max-width: 600px;
}

.keyboard-row:nth-child(2) {
  padding: 0 1.5rem;
}

.keyboard-row:nth-child(3) {
  padding: 0 3rem;
}

.key {
  flex: 1;
  min-width: 0;
  height: 3.5rem;
  border: none;
  border-radius: 0.35rem;
  background-color: var(--key-bg);
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--key-text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  transition: all 0.15s ease;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
  text-transform: lowercase;
}

.delete-key,
.number-key,
.return-key {
  background-color: var(--key-special-bg);
  font-size: 1rem;
  font-weight: 600;
  text-transform: none;
}

.space-key {
  flex: 5;
  font-size: 1rem;
  text-transform: none;
}

.number-key,
.return-key {
  flex: 1.5;
}

.key.highlight {
  background-color: #3b82f6;
  color: white;
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
  animation: pulse 1s ease-in-out infinite;
}

.key.highlight-delete {
  background-color: #ef4444;
  color: white;
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

/* Tablet/Desktop - slightly larger */
@media (min-width: 769px) {
  .keyboard {
    padding: 0.75rem 0.5rem;
    gap: 0.5rem;
  }

  .keyboard-row {
    gap: 0.5rem;
  }

  .key {
    height: 4rem;
    font-size: 1.75rem;
  }

  .delete-key,
  .number-key,
  .return-key {
    font-size: 1.1rem;
  }

  .space-key {
    font-size: 1.1rem;
  }
}

/* Hide keyboard on mobile - they'll use native keyboard */
@media (max-width: 768px) {
  .keyboard {
    display: none;
  }
}
</style>
