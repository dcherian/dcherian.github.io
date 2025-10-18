<template>
  <div class="settings">
    <div class="left-controls">
      <button class="help-btn" @click="showHelp = true" title="Help">
        ?
      </button>
      <button
        :class="['strict-mode-btn', { active: strictMode }]"
        @click="emit('toggle-strict-mode')"
        title="Strict Mode: Only correct keys accepted"
      >
        {{ strictMode ? '🔒' : '🔓' }}
      </button>
    </div>
    <div class="difficulty-buttons">
      <button
        v-for="level in levels"
        :key="level.value"
        :class="['difficulty-btn', { active: modelValue === level.value }]"
        @click="selectDifficulty(level.value)"
      >
        {{ level.label }}
      </button>
    </div>
    <div class="mode-buttons">
      <button
        v-for="mode in modes"
        :key="mode.value"
        :class="['mode-btn', { active: selectedMode === mode.value }]"
        @click="selectMode(mode.value)"
      >
        {{ mode.label }}
      </button>
    </div>
    <div class="right-controls">
      <div class="timer" :class="{ paused: timerPaused }">
        <span class="timer-icon">⏱</span>
        <span class="timer-value">{{ timerValue }}</span>
      </div>
      <button
        class="theme-btn"
        @click="cycleTheme"
        :title="`Theme: ${theme} (click to cycle)`"
      >
        {{ themeIcon }}
      </button>
      <button
        class="fullscreen-btn"
        @click="toggleFullscreen"
        :title="isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'"
      >
        {{ isFullscreen ? '⛶' : '⛶' }}
      </button>
      <div class="stats">
        <strong>{{ wordsCompleted }}</strong>
      </div>
    </div>

    <HelpModal :show="showHelp" @close="showHelp = false" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFullscreen } from '../composables/useFullscreen'
import { useTheme } from '../composables/useTheme'
import HelpModal from './HelpModal.vue'

const showHelp = ref(false)

const { theme, cycleTheme } = useTheme()

const themeIcon = computed(() => {
  switch (theme.value) {
    case 'light': return '☀️'
    case 'dark': return '🌙'
    case 'system': return '💻'
    default: return '💻'
  }
})

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  wordsCompleted: {
    type: Number,
    default: 0
  },
  selectedMode: {
    type: String,
    default: 'word'
  },
  strictMode: {
    type: Boolean,
    default: false
  },
  timerValue: {
    type: String,
    default: '00:00'
  },
  timerPaused: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'update:mode', 'toggle-strict-mode'])

const { isFullscreen, toggleFullscreen } = useFullscreen()

const levels = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' }
]

const modes = [
  { value: 'word', label: 'Word' },
  { value: 'phrase', label: 'Phrase' },
  { value: 'numbers', label: 'Numbers' }
]

const selectDifficulty = (difficulty) => {
  emit('update:modelValue', difficulty)
}

const selectMode = (mode) => {
  emit('update:mode', mode)
}
</script>

<style scoped>
.settings {
  padding: 0.75rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid var(--border-color);
  flex-wrap: wrap;
}

.left-controls {
  display: flex;
  gap: 0.5rem;
}

.help-btn,
.strict-mode-btn {
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  border: 2px solid var(--button-border);
  border-radius: 0.5rem;
  background-color: var(--button-bg);
  color: var(--button-text);
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 2rem;
  line-height: 1;
}

.help-btn:hover,
.strict-mode-btn:hover {
  border-color: var(--button-active-bg);
  color: var(--button-active-bg);
}

.strict-mode-btn.active {
  background-color: var(--button-active-bg);
  border-color: var(--button-active-border);
  color: var(--button-active-text);
}

.difficulty-buttons,
.mode-buttons {
  display: flex;
  gap: 0.5rem;
}

.difficulty-btn,
.mode-btn {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border: 2px solid var(--button-border);
  border-radius: 0.5rem;
  background-color: var(--button-bg);
  color: var(--button-text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.difficulty-btn:hover,
.mode-btn:hover {
  border-color: var(--button-active-bg);
  color: var(--button-active-bg);
}

.difficulty-btn.active,
.mode-btn.active {
  background-color: var(--button-active-bg);
  border-color: var(--button-active-border);
  color: var(--button-active-text);
}

.right-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.timer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid var(--button-border);
  border-radius: 0.5rem;
  background-color: var(--button-bg);
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.875rem;
}

.timer.paused {
  opacity: 0.5;
}

.timer-icon {
  font-size: 1.1rem;
}

.timer-value {
  font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
  letter-spacing: 0.05em;
}

.theme-btn,
.fullscreen-btn {
  padding: 0.5rem 0.75rem;
  font-size: 1.25rem;
  border: 2px solid var(--button-border);
  border-radius: 0.5rem;
  background-color: var(--button-bg);
  color: var(--button-text);
  cursor: pointer;
  transition: all 0.2s ease;
  line-height: 1;
}

.theme-btn:hover,
.fullscreen-btn:hover {
  border-color: var(--button-active-bg);
  color: var(--button-active-bg);
}

.stats {
  font-size: 1.25rem;
  color: var(--text-secondary);
}

.stats strong {
  color: var(--button-active-bg);
  font-size: 1.5rem;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .settings {
    padding: 0.5rem;
    gap: 0.5rem;
  }

  .difficulty-buttons,
  .mode-buttons {
    gap: 0.3rem;
  }

  .difficulty-btn,
  .mode-btn {
    padding: 0.4rem 0.6rem;
    font-size: 0.75rem;
  }

  .help-btn,
  .strict-mode-btn {
    padding: 0.4rem 0.6rem;
    font-size: 0.9rem;
  }

  .timer {
    padding: 0.4rem 0.6rem;
    font-size: 0.75rem;
  }

  .theme-btn,
  .fullscreen-btn {
    padding: 0.4rem 0.6rem;
    font-size: 1rem;
  }

  .stats {
    font-size: 1rem;
  }

  .stats strong {
    font-size: 1.2rem;
  }

  .right-controls {
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .settings {
    padding: 0.4rem;
    gap: 0.4rem;
    justify-content: center;
  }

  .left-controls,
  .right-controls {
    order: 2;
    flex: 1 1 100%;
    justify-content: center;
  }

  .difficulty-buttons,
  .mode-buttons {
    flex: 1 1 100%;
    justify-content: center;
  }

  .difficulty-btn,
  .mode-btn {
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
  }

  .timer-icon {
    font-size: 1rem;
  }
}
</style>
