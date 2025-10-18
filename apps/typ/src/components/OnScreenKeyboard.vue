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
            'highlight': isKeyHighlighted(key.key, nextKey),
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

// Helper function to check if a key should be highlighted
const isKeyHighlighted = (keyName, nextKeyChar) => {
  if (!nextKeyChar) return false

  // Special case: if nextKeyChar is a space, match with 'space' key
  if (nextKeyChar === ' ' && keyName === 'space') {
    return true
  }

  // Default case: direct character comparison
  return keyName.toLowerCase() === nextKeyChar.toLowerCase()
}

// Mac QWERTY keyboard layout
const keyboardLayout = [
  [
    { key: '`', display: '`' },
    { key: '1', display: '1' },
    { key: '2', display: '2' },
    { key: '3', display: '3' },
    { key: '4', display: '4' },
    { key: '5', display: '5' },
    { key: '6', display: '6' },
    { key: '7', display: '7' },
    { key: '8', display: '8' },
    { key: '9', display: '9' },
    { key: '0', display: '0' },
    { key: '-', display: '-' },
    { key: '=', display: '=' },
    { key: 'delete', display: 'delete', width: '3.5rem', class: 'special-key' }
  ],
  [
    { key: 'tab', display: 'tab', width: '3.2rem', class: 'special-key' },
    { key: 'q', display: 'Q' },
    { key: 'w', display: 'W' },
    { key: 'e', display: 'E' },
    { key: 'r', display: 'R' },
    { key: 't', display: 'T' },
    { key: 'y', display: 'Y' },
    { key: 'u', display: 'U' },
    { key: 'i', display: 'I' },
    { key: 'o', display: 'O' },
    { key: 'p', display: 'P' },
    { key: '[', display: '[' },
    { key: ']', display: ']' },
    { key: '\\', display: '\\', width: '2.8rem' }
  ],
  [
    { key: 'caps', display: 'caps lock', width: '3.5rem', class: 'special-key' },
    { key: 'a', display: 'A' },
    { key: 's', display: 'S' },
    { key: 'd', display: 'D' },
    { key: 'f', display: 'F' },
    { key: 'g', display: 'G' },
    { key: 'h', display: 'H' },
    { key: 'j', display: 'J' },
    { key: 'k', display: 'K' },
    { key: 'l', display: 'L' },
    { key: ';', display: ';' },
    { key: "'", display: "'" },
    { key: 'return', display: 'return', width: '3.8rem', class: 'special-key' }
  ],
  [
    { key: 'shift', display: 'shift', width: '4.2rem', class: 'special-key' },
    { key: 'z', display: 'Z' },
    { key: 'x', display: 'X' },
    { key: 'c', display: 'C' },
    { key: 'v', display: 'V' },
    { key: 'b', display: 'B' },
    { key: 'n', display: 'N' },
    { key: 'm', display: 'M' },
    { key: ',', display: ',' },
    { key: '.', display: '.' },
    { key: '/', display: '/' },
    { key: 'shift-r', display: 'shift', width: '4.2rem', class: 'special-key' }
  ],
  [
    { key: 'fn', display: 'fn', width: '2.5rem', class: 'special-key' },
    { key: 'control', display: 'ctrl', width: '2.8rem', class: 'special-key' },
    { key: 'option', display: 'opt', width: '2.8rem', class: 'special-key' },
    { key: 'command', display: '⌘', width: '3.5rem', class: 'special-key' },
    { key: 'space', display: '', width: '12rem', class: 'space-key' },
    { key: 'command-r', display: '⌘', width: '3.5rem', class: 'special-key' },
    { key: 'option-r', display: 'opt', width: '2.8rem', class: 'special-key' },
    { key: 'left', display: '◀', class: 'arrow-key' },
    { key: 'up-down', display: '▲▼', class: 'arrow-key' },
    { key: 'right', display: '▶', class: 'arrow-key' }
  ]
]
</script>

<style scoped>
.keyboard {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: center;
  background-color: var(--keyboard-bg);
  border-radius: 1rem;
  margin-top: 0.5rem;
}

.keyboard-row {
  display: flex;
  gap: 0.4rem;
  justify-content: center;
}

.key {
  height: 3.5rem;
  border: 2px solid var(--key-border);
  border-radius: 0.5rem;
  background-color: var(--key-bg);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--key-text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.special-key {
  background-color: var(--key-special-bg);
  font-size: 0.9rem;
}

.space-key {
  background-color: var(--key-bg);
}

.arrow-key {
  font-size: 1.4rem;
}

.key.highlight {
  background-color: #3b82f6;
  border-color: #2563eb;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  animation: pulse 1s ease-in-out infinite;
}

.key.highlight-delete {
  background-color: #ef4444;
  border-color: #dc2626;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Hide keyboard on mobile - they'll use native keyboard */
@media (max-width: 768px) {
  .keyboard {
    display: none;
  }
}
</style>
