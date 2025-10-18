import { ref, computed, watch } from 'vue'
import { useActivityTimer } from './useActivityTimer'
import { numberToWords, generateNumber } from '../utils/numberToWords'

export function useWordGame() {
  const words = ref({ easy: [], medium: [], hard: [], phrases: { easy: [], medium: [], hard: [] } })
  const difficulty = ref('easy')
  const mode = ref('word')
  const currentWord = ref('')
  const currentNumber = ref(null)
  const currentNumberWord = ref('')
  const userInput = ref('')
  const wordsCompleted = ref(0)

  // Activity timer
  const { formattedTime, isPaused, recordActivity } = useActivityTimer()

  // Load difficulty and mode from localStorage
  const loadSettings = () => {
    const savedDifficulty = localStorage.getItem('typ-difficulty')
    if (savedDifficulty && ['easy', 'medium', 'hard'].includes(savedDifficulty)) {
      difficulty.value = savedDifficulty
    }
    const savedMode = localStorage.getItem('typ-mode')
    if (savedMode && ['word', 'phrase', 'numbers'].includes(savedMode)) {
      mode.value = savedMode
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
    if (userInput.value.length < currentWord.value.length) {
      return currentWord.value[userInput.value.length]
    }
    return null
  })

  // Check if the last character typed was incorrect
  const hasError = computed(() => {
    if (userInput.value.length === 0) return false
    const lastIndex = userInput.value.length - 1
    return userInput.value[lastIndex] !== currentWord.value[lastIndex]
  })

  // Handle typing
  const handleInput = (value) => {
    userInput.value = value.toLowerCase()

    // Record activity for timer
    recordActivity()

    // Auto-advance when word is complete
    if (isWordComplete.value) {
      wordsCompleted.value++
      setTimeout(() => {
        nextWord()
      }, 500)
    }
  }

  // Change difficulty
  const setDifficulty = (newDifficulty) => {
    difficulty.value = newDifficulty
    nextWord()
  }

  return {
    difficulty,
    mode,
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
    setMode
  }
}
