<template>
  <div class="typing-input">
    <div class="input-container">
      <input
        ref="inputRef"
        type="text"
        :value="modelValue"
        @input="handleInput"
        @blur="handleBlur"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        class="input-field"
      />
      <button
        class="reset-btn"
        @click="handleReset"
        title="Clear input"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'reset'])

const inputRef = ref(null)

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const handleReset = () => {
  emit('reset')
  // Refocus input after reset
  setTimeout(() => {
    inputRef.value?.focus()
  }, 0)
}

const handleBlur = () => {
  // Refocus after a short delay to prevent focus loss
  setTimeout(() => {
    inputRef.value?.focus()
  }, 0)
}

// Auto-focus input on mount
onMounted(() => {
  inputRef.value?.focus()
})

// Expose focus method for parent components
defineExpose({
  focus: () => inputRef.value?.focus()
})
</script>

<style scoped>
.typing-input {
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center;
}

.input-container {
  position: relative;
  width: 100%;
  max-width: 700px;
  display: flex;
  align-items: center;
}

.input-field {
  font-size: 2.5rem;
  padding: 0.75rem 1.5rem;
  padding-right: 4rem;
  border: 3px solid var(--border-color);
  border-radius: 0.75rem;
  text-align: center;
  width: 100%;
  font-family: 'SF Mono', 'Monaco', 'Consolas', 'Courier New', monospace;
  font-weight: bold;
  outline: none;
  transition: border-color 0.3s ease;
  caret-color: var(--button-active-bg);
  background-color: var(--input-bg);
  color: var(--text-primary);
  text-transform: uppercase;
}

.input-field:focus {
  border-color: var(--button-active-bg);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.reset-btn {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  border: 2px solid var(--button-border);
  border-radius: 0.5rem;
  background-color: var(--button-bg);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  line-height: 1;
  min-width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.reset-btn:hover {
  border-color: var(--letter-incorrect-text);
  color: var(--letter-incorrect-text);
  background-color: var(--letter-incorrect-bg);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .typing-input {
    padding: 0.5rem;
  }

  .input-field {
    font-size: 2rem;
    padding: 0.6rem 1rem;
    padding-right: 3.5rem;
    border-width: 2px;
  }

  .reset-btn {
    font-size: 1.2rem;
    min-width: 2rem;
    height: 2rem;
    right: 0.5rem;
  }
}

@media (max-width: 480px) {
  .typing-input {
    padding: 0.4rem;
  }

  .input-field {
    font-size: 1.5rem;
    padding: 0.5rem 0.75rem;
    padding-right: 3rem;
  }

  .reset-btn {
    font-size: 1rem;
    min-width: 1.8rem;
    height: 1.8rem;
    right: 0.4rem;
  }
}
</style>
