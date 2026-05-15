'use client'

import { create } from 'zustand'

type BottomSheetType =
  | 'comments'
  | 'share'
  | 'info'
  | null

export const useThemeStore = create<Store>((set) => ({
  theme: 'dark',

  toggleTheme: () =>
    set((state) => ({
      theme:
        state.theme === 'dark' ? 'light' : 'dark',
    })),

  setTheme: (theme) => set({ theme }),
}))