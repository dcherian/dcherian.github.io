<template>
  <div class="typing-input">
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

const emit = defineEmits(['update:modelValue'])

const inputRef = ref(null)

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
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

.input-field {
  font-size: 2.5rem;
  padding: 0.75rem 1.5rem;
  border: 3px solid var(--border-color);
  border-radius: 0.75rem;
  text-align: center;
  width: 100%;
  max-width: 700px;
  font-family: 'SF Mono', 'Monaco', 'Consolas', 'Courier New', monospace;
  font-weight: bold;
  outline: none;
  transition: border-color 0.3s ease;
  caret-color: var(--button-active-bg);
  background-color: var(--input-bg);
  color: var(--text-primary);
}

.input-field:focus {
  border-color: var(--button-active-bg);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .typing-input {
    padding: 0.5rem;
  }

  .input-field {
    font-size: 2rem;
    padding: 0.6rem 1rem;
    border-width: 2px;
  }
}

@media (max-width: 480px) {
  .typing-input {
    padding: 0.4rem;
  }

  .input-field {
    font-size: 1.5rem;
    padding: 0.5rem 0.75rem;
  }
}
</style>
