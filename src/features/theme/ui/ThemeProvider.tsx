'use client'

import { useEffect } from 'react'
import { useThemeStore } from '../model/store'

export const ThemeProvider = ({ children }: {children: React.ReactNode}) => {
  const theme = useThemeStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return children
}