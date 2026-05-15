'use client'

import { create } from 'zustand'

type SheetStore = {
  isOpen: boolean
  type: BottomSheetType
  open: (type: BottomSheetType) => void
  close: () => void
}

export const useThemeStore = create<Store>((set) => ({
  theme: 'dark',

  toggleTheme: () =>
    set((state) => ({
      theme:
        state.theme === 'dark' ? 'light' : 'dark',
    })),

  setTheme: (theme) => set({ theme }),
}))