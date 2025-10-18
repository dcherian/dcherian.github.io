import { ref, watch } from 'vue'

export function useTheme() {
  const applyTheme = (themeValue) => {
    if (typeof document === 'undefined') return

    const root = document.documentElement

    if (themeValue === 'system') {
      // Remove the data-theme attribute to use CSS media query
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', themeValue)
    }
  }

  // Load theme immediately
  const savedTheme = localStorage.getItem('typ-theme')
  const initialTheme = (savedTheme && ['light', 'dark', 'system'].includes(savedTheme))
    ? savedTheme
    : 'system'

  const theme = ref(initialTheme)

  // Apply theme immediately
  applyTheme(theme.value)

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme.value)
    theme.value = themes[(currentIndex + 1) % themes.length]
  }

  watch(theme, (newTheme) => {
    localStorage.setItem('typ-theme', newTheme)
    applyTheme(newTheme)
  })

  return {
    theme,
    cycleTheme
  }
}
