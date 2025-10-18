<template>
  <Transition name="modal">
    <div v-if="show" class="modal-overlay" @click="close">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>How to Use Typ</h2>
          <button class="close-btn" @click="close">×</button>
        </div>

        <div class="modal-body">
          <section>
            <h3>🎯 Modes</h3>
            <ul>
              <li><strong>Word:</strong> Practice typing single words</li>
              <li><strong>Phrase:</strong> Practice typing short phrases (spaces shown as _)</li>
              <li><strong>Numbers:</strong> See the word form and type the number (e.g., "forty-two" → 42)</li>
            </ul>
          </section>

          <section>
            <h3>📊 Difficulty Levels</h3>
            <ul>
              <li><strong>Easy:</strong> Short words (3 letters) or numbers under 30</li>
              <li><strong>Medium:</strong> Medium words (4 letters) or numbers under 100</li>
              <li><strong>Hard:</strong> Longer words (5+ letters) or numbers under 5,000</li>
            </ul>
          </section>

          <section>
            <h3>⏱ Activity Timer</h3>
            <p>The timer tracks active practice time. It automatically pauses after 15 seconds of inactivity to measure focused practice time only.</p>
          </section>

          <section>
            <h3>⌨️ On-Screen Keyboard</h3>
            <p>The keyboard highlights the next letter to type in blue. If you make a mistake, the delete key highlights in red.</p>
          </section>

          <section>
            <h3>🔒 Strict Mode</h3>
            <p>When strict mode is enabled (lock icon 🔒), only correct keystrokes are accepted. Wrong keys are ignored, forcing you to type accurately. You can only use backspace to delete. This helps develop proper typing technique and muscle memory.</p>
          </section>

          <section>
            <h3>⛶ Fullscreen Mode</h3>
            <p>Click the fullscreen button to enter immersive mode for distraction-free practice.</p>
          </section>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background-color: var(--main-bg);
  border-radius: 1rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px var(--shadow-color);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 2px solid var(--border-color);
}

.modal-header h2 {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.75rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background-color: var(--button-bg);
  color: var(--text-primary);
}

.modal-body {
  padding: 1.5rem;
}

section {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

section:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

h3 {
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

ul {
  margin: 0.5rem 0 0 0;
  padding-left: 1.75rem;
  color: var(--text-secondary);
  list-style-type: disc;
}

li {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

li:last-child {
  margin-bottom: 0;
}

p {
  margin: 0.5rem 0 0 0;
  color: var(--text-secondary);
  line-height: 1.6;
}

strong {
  color: var(--text-primary);
  font-weight: 600;
}

/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9);
}
</style>
