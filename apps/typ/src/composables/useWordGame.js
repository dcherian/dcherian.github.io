import { ref, computed, watch } from 'vue'
import { useActivityTimer } from './useActivityTimer'
import { numberToWords, generateNumber } from '../utils/numberToWords'

export function useWordGame() {
  const words = ref({ easy: [], medium: [], hard: [], phrases: { easy: [], medium: [], hard: [] } })
  const difficulty = ref('easy')
  const mode = ref('word')
  const strictMode = ref(true)
  const currentWord = ref('')
  const currentNumber = ref(null)
  const currentNumberWord = ref('')
  const userInput = ref('')
  const wordsCompleted = ref(0)

  // Activity timer
  const { formattedTime, isPaused, recordActivity } = useActivityTimer()

  // Load difficulty, mode, and strict mode from localStorage
  const loadSettings = () => {
    const savedDifficulty = localStorage.getItem('typ-difficulty')
    if (savedDifficulty && ['easy', 'medium', 'hard'].includes(savedDifficulty)) {
      difficulty.value = savedDifficulty
    }
    const savedMode = localStorage.getItem('typ-mode')
    if (savedMode && ['word', 'phrase', 'numbers'].includes(savedMode)) {
      mode.value = savedMode
    }
    const savedStrictMode = localStorage.getItem('typ-strict-mode')
    if (savedStrictMode !== null) {
      strictMode.value = savedStrictMode === 'true'
    }
  }

  // Save difficulty to localStorage
  watch(difficulty, (newDifficulty) => {
    localStorage.setItem('typ-difficulty', newDifficulty)
  })

  // Save mode to localStorage
  watch(mode, (newMode) => {
    localStorage.setItem('typ-mode', newMode)
  })

  // Save strict mode to localStorage
  watch(strictMode, (newStrictMode) => {
    localStorage.setItem('typ-strict-mode', newStrictMode)
  })

  // Load words from JSON
  const loadWords = async () => {
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}words.json`)
      words.value = await response.json()
      loadSettings()
      nextWord()
    } catch (error) {
      console.error('Failed to load words:', error)
    }
  }

  // Get random word/phrase from current difficulty and mode
  const nextWord = () => {
    if (mode.value === 'numbers') {
      // Generate a number - user types the number, word is shown as hint
      const num = generateNumber(difficulty.value)
      currentNumber.value = num
      currentNumberWord.value = numberToWords(num)
      currentWord.value = num.toString() // User types the number
      userInput.value = ''
    } else {
      let wordList
      if (mode.value === 'phrase') {
        wordList = words.value.phrases?.[difficulty.value]
      } else {
        wordList = words.value[difficulty.value]
      }

      if (wordList && wordList.length > 0) {
        const randomIndex = Math.floor(Math.random() * wordList.length)
        currentWord.value = wordList[randomIndex]
        currentNumber.value = null
        currentNumberWord.value = ''
        userInput.value = ''
      }
    }
  }

  // Change mode
  const setMode = (newMode) => {
    mode.value = newMode
    nextWord()
  }

  // Get letter status for each character
  const letterStates = computed(() => {
    return currentWord.value.split('').map((letter, index) => {
      const userLetter = userInput.value[index]
      if (userLetter === undefined) {
        // In strict mode, show the next letter as incorrect if user tried wrong key
        if (strictMode.value && hasStrictModeError.value && index === userInput.value.length) {
          return 'incorrect'
        }
        return 'pending'
      }
      return userLetter === letter ? 'correct' : 'incorrect'
    })
  })

  // Check if word is complete
  const isWordComplete = computed(() => {
    return userInput.value === currentWord.value && currentWord.value.length > 0
  })

  // Get the next key that should be typed
  const nextKey = computed(() => {
    // Don't highlight next key if there's an error (in any mode)
    if (hasError.value) {
      return null
    }
    if (userInput.value.length < currentWord.value.length) {
      return currentWord.value[userInput.value.length]
    }
    return null
  })

  // Check if the last character typed was incorrect or strict mode error occurred
  const hasError = computed(() => {
    // In strict mode, show error if user tried to type wrong key
    if (strictMode.value && hasStrictModeError.value) {
      return true
    }
    // In non-strict mode, check if last character was wrong
    if (!strictMode.value && userInput.value.length > 0) {
      const lastIndex = userInput.value.length - 1
      return userInput.value[lastIndex] !== currentWord.value[lastIndex]
    }
    return false
  })

  // Track if user tried to type a wrong key in strict mode
  const hasStrictModeError = ref(false)

  // Handle typing
  const handleInput = (value) => {
    const newValue = value.toLowerCase()

    // In strict mode, only allow backspace or correct input
    if (strictMode.value && newValue.length > userInput.value.length) {
      // User is adding a character (not deleting)
      const newCharIndex = userInput.value.length
      const newChar = newValue[newCharIndex]
      const expectedChar = currentWord.value[newCharIndex]

      // Only accept the input if the new character is correct
      if (newChar !== expectedChar) {
        // Reject the input - keep the old value, but show error state
        hasStrictModeError.value = true
        return
      }
    }

    // Clear error state when user types anything (correct char or backspace)
    hasStrictModeError.value = false
    userInput.value = newValue

    // Record activity for timer
    recordActivity()

    // Auto-advance when word is complete
    if (isWordComplete.value) {
      wordsCompleted.value++
      setTimeout(() => {
        nextWord()
        hasStrictModeError.value = false
      }, 500)
    }
  }

  // Toggle strict mode
  const toggleStrictMode = () => {
    strictMode.value = !strictMode.value
  }

  // Change difficulty
  const setDifficulty = (newDifficulty) => {
    difficulty.value = newDifficulty
    nextWord()
  }

  return {
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
    nextWord,
    handleInput,
    setDifficulty,
    setMode,
    toggleStrictMode
  }
}
