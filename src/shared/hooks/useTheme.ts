'use client'

export const useTheme = () => {
  const setTheme = (theme: 'dark' | 'light') => {
    document.documentElement.className = theme
    localStorage.setItem('theme', theme)
  }

  return { setTheme }
}