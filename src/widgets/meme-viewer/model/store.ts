'use client'

import { create } from 'zustand'
import { TMeme } from '@/entities'

type Store = {
  memes: TMeme[]

  memeIndex: number

  verticalDirection: 1 | -1
  horizontalDirection: 1 | -1

  setMemes: (memes: TMeme[]) => void

  openBySlug: (slug: string) => void

  toNextMeme: () => void
  toPrevMeme: () => void

  // nextVariant: () => void
  // prevVariant: () => void
  // getCurrentVariant: () => TMeme['variants'][0]

  getCurrentMeme: () => TMeme | undefined
}

export const useMemeViewerStore = create<Store>((set, get) => ({
  memes: [],

  memeIndex: 0,

  verticalDirection: 1,
  horizontalDirection: 1,

  setMemes: (memes) => {
    set({ memes })
  },

  openBySlug: (slug) => {
    const { memes } = get()
    const index = memes.findIndex((m) => m.slug === slug)
    if (index !== -1) {
      set({memeIndex: index})
    }
  },

  toNextMeme: () =>
    set((state) => ({
      memeIndex: (state.memeIndex + 1) % state.memes.length,
    })),

  toPrevMeme: () =>
    set((state) => ({
      memeIndex: Math.max(state.memeIndex - 1, 0,),
    })),

  // nextVariant: () => {
  //   const {variantIndex, getCurrentMeme } = get()
  //   const meme = getCurrentMeme()
  //   const next = (variantIndex + 1) % meme.variants.length
  //   set({ variantIndex: next })
  // },

  // prevVariant: () => {
  //   const { variantIndex, getCurrentMeme } = get()
  //   const meme = getCurrentMeme()
  //   const prev = (variantIndex - 1 + meme.variants.length) % meme.variants.length
  //   set({ variantIndex: prev})
  // },

  getCurrentMeme: () => {
    const { memeIndex, memes } = get()
    return memes[memeIndex]
  },

  // getCurrentVariant: () => {
  //   const { getCurrentMeme, variantIndex } = get()
  //   const currentMeme = getCurrentMeme()
  //   return currentMeme.variants[variantIndex]
  // },
}))