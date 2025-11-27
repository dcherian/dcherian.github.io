<template>
  <div class="app">
    <header class="header">
      <h1 class="title">typ</h1>
    </header>

    <main class="main">
      <Settings
        v-model="difficulty"
        :words-completed="wordsCompleted"
        :selected-mode="mode"
        :strict-mode="strictMode"
        :timer-value="formattedTime"
        :timer-paused="isPaused"
        @update:model-value="setDifficulty"
        @update:mode="setMode"
        @toggle-strict-mode="toggleStrictMode"
      />

      <WordDisplay
        :word="currentWord"
        :number="currentNumber"
        :number-word="currentNumberWord"
        :letter-states="letterStates"
        :is-complete="isWordComplete"
      />

      <TypingInput
        ref="typingInputRef"
        :model-value="userInput"
        @update:model-value="handleInput"
        @reset="resetInput"
      />

      <Confetti :active="isWordComplete" />

      <HandIndicator :next-key="nextKey" />

      <OnScreenKeyboard
        :next-key="nextKey"
        :should-highlight-delete="hasError"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import WordDisplay from './components/WordDisplay.vue'
import TypingInput from './components/TypingInput.vue'
import Settings from './components/Settings.vue'
import OnScreenKeyboard from './components/OnScreenKeyboard.vue'
import HandIndicator from './components/HandIndicator.vue'
import Confetti from './components/Confetti.vue'
import { useWordGame } from './composables/useWordGame'

const typingInputRef = ref(null)

const {
  difficulty,
  mode,
  strictMode,
  currentWord,
  currentNumber,
  currentNumberWord,
  userInput,
  wordsCompleted,
  letterStates,
  isWordComplete,
  nextKey,
  hasError,
  formattedTime,
  isPaused,
  loadWords,
  handleInput,
  setDifficulty,
  setMode,
  toggleStrictMode,
  resetInput
} = useWordGame()

// Refocus input when mode or difficulty changes
watch([mode, difficulty], async () => {
  await nextTick()
  typingInputRef.value?.focus()
})

onMounted(() => {
  loadWords()
})
</script>

<style>
:root {
  /* Light mode colors */
  --bg-gradient-start: #667eea;
  --bg-gradient-end: #764ba2;
  --main-bg: #ffffff;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --border-color: #e5e7eb;
  --input-bg: #ffffff;
  --button-bg: #ffffff;
  --button-border: #e5e7eb;
  --button-text: #6b7280;
  --button-active-bg: #3b82f6;
  --button-active-border: #3b82f6;
  --button-active-text: #ffffff;
  --keyboard-bg: #f9fafb;
  --key-bg: #ffffff;
  --key-border: #d1d5db;
  --key-text: #374151;
  --key-special-bg: #f3f4f6;
  --letter-pending-bg: #f0f0f0;
  --letter-pending-text: #666666;
  --letter-correct-bg: #dcfce7;
  --letter-correct-text: #22c55e;
  --letter-incorrect-bg: #fee2e2;
  --letter-incorrect-text: #ef4444;
  --shadow-color: rgba(0, 0, 0, 0.3);
  --title-color: #ffffff;
}

/* Dark mode via media query (when data-theme is not set, i.e., system preference) */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    /* Dark mode colors */
    --bg-gradient-start: #1e293b;
    --bg-gradient-end: #0f172a;
    --main-bg: #1e293b;
    --text-primary: #f1f5f9;
    --text-secondary: #94a3b8;
    --border-color: #334155;
    --input-bg: #0f172a;
    --button-bg: #334155;
    --button-border: #475569;
    --button-text: #cbd5e1;
    --button-active-bg: #3b82f6;
    --button-active-border: #3b82f6;
    --button-active-text: #ffffff;
    --keyboard-bg: #0f172a;
    --key-bg: #334155;
    --key-border: #475569;
    --key-text: #e2e8f0;
    --key-special-bg: #1e293b;
    --letter-pending-bg: #334155;
    --letter-pending-text: #94a3b8;
    --letter-correct-bg: #064e3b;
    --letter-correct-text: #34d399;
    --letter-incorrect-bg: #7f1d1d;
    --letter-incorrect-text: #f87171;
    --shadow-color: rgba(0, 0, 0, 0.5);
    --title-color: #f1f5f9;
  }
}

/* Explicit dark theme */
:root[data-theme="dark"] {
  /* Dark mode colors */
  --bg-gradient-start: #1e293b;
  --bg-gradient-end: #0f172a;
  --main-bg: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --border-color: #334155;
  --input-bg: #0f172a;
  --button-bg: #334155;
  --button-border: #475569;
  --button-text: #cbd5e1;
  --button-active-bg: #3b82f6;
  --button-active-border: #3b82f6;
  --button-active-text: #ffffff;
  --keyboard-bg: #0f172a;
  --key-bg: #334155;
  --key-border: #475569;
  --key-text: #e2e8f0;
  --key-special-bg: #1e293b;
  --letter-pending-bg: #334155;
  --letter-pending-text: #94a3b8;
  --letter-correct-bg: #064e3b;
  --letter-correct-text: #34d399;
  --letter-incorrect-bg: #7f1d1d;
  --letter-incorrect-text: #f87171;
  --shadow-color: rgba(0, 0, 0, 0.5);
  --title-color: #f1f5f9;
}

/* Explicit light theme (overrides system dark preference if set) */
:root[data-theme="light"] {
  /* Light mode colors (same as default) */
  --bg-gradient-start: #667eea;
  --bg-gradient-end: #764ba2;
  --main-bg: #ffffff;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --border-color: #e5e7eb;
  --input-bg: #ffffff;
  --button-bg: #ffffff;
  --button-border: #e5e7eb;
  --button-text: #6b7280;
  --button-active-bg: #3b82f6;
  --button-active-border: #3b82f6;
  --button-active-text: #ffffff;
  --keyboard-bg: #f9fafb;
  --key-bg: #ffffff;
  --key-border: #d1d5db;
  --key-text: #374151;
  --key-special-bg: #f3f4f6;
  --letter-pending-bg: #f0f0f0;
  --letter-pending-text: #666666;
  --letter-correct-bg: #dcfce7;
  --letter-correct-text: #22c55e;
  --letter-incorrect-bg: #fee2e2;
  --letter-incorrect-text: #ef4444;
  --shadow-color: rgba(0, 0, 0, 0.3);
  --title-color: #ffffff;
}

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  min-height: 100vh;
  height: 100vh;
  background: linear-gradient(135deg, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%);
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
}

.header {
  padding: 0.25rem;
  text-align: center;
  flex-shrink: 0;
}

.title {
  font-size: 2rem;
  color: var(--title-color);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  font-weight: bold;
  letter-spacing: 0.2rem;
  margin: 0;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  background-color: var(--main-bg);
  border-radius: 1rem;
  box-shadow: 0 20px 60px var(--shadow-color);
  padding: 0.5rem;
  overflow-y: auto;
  overflow-x: hidden;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .app {
    padding: 0;
  }

  .header {
    padding: 0.15rem;
  }

  .title {
    font-size: 1.5rem;
    letter-spacing: 0.15rem;
  }

  .main {
    padding: 0.4rem;
    border-radius: 0.75rem;
  }
}

@media (max-width: 480px) {
  .app {
    padding: 0;
  }

  .header {
    padding: 0.1rem;
  }

  .title {
    font-size: 1.2rem;
    letter-spacing: 0.1rem;
  }

  .main {
    padding: 0.3rem;
    border-radius: 0.5rem;
  }
}

/* Improve touch targets on mobile */
@media (hover: none) and (pointer: coarse) {
  button {
    min-height: 44px;
    min-width: 44px;
  }
}
</style>
