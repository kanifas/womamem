'use client'
import { TMeme } from '@/entities'
import { create } from 'zustand'

type Store = {
  memes: TMeme[]
  currentIndex: number
  currentVariantIndex: number
  setVariantIndex: (index: number) => void
  direction: 1 | -1
  setMemes: (memes: TMeme[]) => void
  openBySlug: (slug: string) => void
  next: () => void
  prev: () => void
  getCurrentMem: () => TMeme
  getNextMem: () => TMeme
  getPrevMem: () => TMeme
}

export const useMemeViewerStore = create<Store>((set, get) => ({
  memes: [],
  currentIndex: 0,
  currentVariantIndex: 0,
  direction: 1,

  setVariantIndex: () => {},

  setMemes: (memes) => {
    set({memes})
  },

  next: () => {
    const { currentIndex, memes } = get()
    const nextIndex = (currentIndex + 1) % memes.length
    set({
      currentIndex: nextIndex,
      direction: 1,
    })
  },

  prev: () => {
    const { currentIndex, memes } = get()
    const prevIndex =
      (currentIndex - 1 + memes.length) % memes.length

    set({
      currentIndex: prevIndex,
      direction: -1,
    })
  },

  getCurrentMem: () => {
    const { currentIndex, memes } = get()
    return memes[currentIndex]
  },

  getNextMem: () => {
    const { currentIndex, memes } = get()
    return memes[currentIndex + 1] ? memes[currentIndex + 1] : memes[0]
  },

  getPrevMem: () => {
    const { currentIndex, memes } = get()
    return memes[currentIndex - 1] ? memes[currentIndex - 1] : memes[memes.length - 1]
  },

  openBySlug: (slug) => {
    const { memes } = get()
    const index = memes.findIndex((m) => m.slug === slug)
    if (index !== -1) {
      set({ currentIndex: index })
    }
  },
}))