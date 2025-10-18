<template>
  <div class="word-display">
    <div class="number-word-hint-space">
      <div v-if="numberWord" class="number-word-hint">
        {{ numberWord }}
      </div>
    </div>
    <div class="word">
      <span
        v-for="(letter, index) in letters"
        :key="index"
        :class="['letter', letterStates[index], { 'space': letter === ' ' }]"
      >
        {{ letter === ' ' ? '\u00A0' : letter }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  word: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    default: null
  },
  numberWord: {
    type: String,
    default: ''
  },
  letterStates: {
    type: Array,
    required: true
  },
  isComplete: {
    type: Boolean,
    default: false
  }
})

const letters = computed(() => props.word.toLowerCase().split(''))
</script>

<style scoped>
.word-display {
  text-align: center;
  padding: 1rem 0.5rem;
}

.number-word-hint-space {
  min-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.number-word-hint {
  font-size: 2rem;
  font-weight: 500;
  color: var(--text-secondary);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-style: italic;
  opacity: 0.8;
}

.word {
  font-size: 3.5rem;
  font-weight: bold;
  font-family: 'SF Mono', 'Monaco', 'Consolas', 'Courier New', monospace;
  letter-spacing: 0.2rem;
  display: flex;
  justify-content: center;
  gap: 0.15rem;
  flex-wrap: wrap;
}

.letter {
  transition: all 0.2s ease;
  padding: 0.3rem 0.5rem;
  border-radius: 0.4rem;
}

.letter.space {
  border-bottom: 3px solid var(--letter-pending-text);
  width: 2rem;
  display: inline-block;
  background-color: transparent !important;
}

.letter.space.correct {
  border-bottom-color: var(--letter-correct-text);
}

.letter.space.incorrect {
  border-bottom-color: var(--letter-incorrect-text);
}

.letter.pending:not(.space) {
  color: var(--letter-pending-text);
  background-color: var(--letter-pending-bg);
}

.letter.correct:not(.space) {
  color: var(--letter-correct-text);
  background-color: var(--letter-correct-bg);
  transform: scale(1.05);
}

.letter.incorrect:not(.space) {
  color: var(--letter-incorrect-text);
  background-color: var(--letter-incorrect-bg);
  animation: shake 0.3s;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .word-display {
    padding: 0.75rem 0.4rem;
  }

  .number-word-hint-space {
    min-height: 2.5rem;
  }

  .number-word-hint {
    font-size: 1.5rem;
  }

  .word {
    font-size: 2.5rem;
    letter-spacing: 0.1rem;
    gap: 0.1rem;
  }

  .letter {
    padding: 0.2rem 0.4rem;
    border-radius: 0.3rem;
  }

  .letter.space {
    width: 1.5rem;
    border-bottom-width: 2px;
  }
}

@media (max-width: 480px) {
  .word-display {
    padding: 0.5rem 0.3rem;
  }

  .number-word-hint-space {
    min-height: 2rem;
    margin-bottom: 0.3rem;
  }

  .number-word-hint {
    font-size: 1.2rem;
  }

  .word {
    font-size: 2rem;
    letter-spacing: 0.05rem;
    gap: 0.08rem;
  }

  .letter {
    padding: 0.15rem 0.3rem;
    border-radius: 0.25rem;
  }

  .letter.space {
    width: 1.2rem;
  }
}
</style>
