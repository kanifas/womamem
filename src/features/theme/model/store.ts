'use client'

import { create } from 'zustand'

type Theme = 'light' | 'dark'

type Store = {
  theme: Theme

  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<Store>((set) => ({
  theme: 'dark',

  toggleTheme: () =>
    set((state) => ({
      theme:
        state.theme === 'dark' ? 'light' : 'dark',
    })),

  setTheme: (theme) =>set({ theme }),
}))