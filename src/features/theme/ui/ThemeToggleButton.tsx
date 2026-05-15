'use client'

import { useThemeStore } from '../model/store'

export const ThemeToggleButton = () => {
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)

  return (
    <button
      onClick={toggleTheme}
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
        border
        bg-[var(--color-card)]
        border-[var(--color-border)]
      "
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}