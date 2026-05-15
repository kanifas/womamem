'use client'

import { create } from 'zustand'

export type BottomSheetType =
  | 'comments'
  | 'share'
  | 'info'
  | null

type Store = {
  isOpen: boolean
  type: BottomSheetType

  open: (type: BottomSheetType) => void
  close: () => void
}

export const useBottomSheetStore = create<Store>((set) => ({
  isOpen: false,
  type: null,

  open: (type) => {
    set({
      isOpen: true,
      type,
    })
  },

  close: () => {
    set({
      isOpen: false,
      type: null,
    })
  },
}))