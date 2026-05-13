'use client'

import { create } from 'zustand'
import { TMeme } from '@/entities'

type Store = {
  memes: TMeme[]

  memeIndex: number
  variantIndex: number
  setVariantIndex: (index: number) => void

  verticalDirection: 1 | -1
  horizontalDirection: 1 | -1

  setMemes: (memes: TMeme[]) => void

  openBySlug: (slug: string) => void

  nextMeme: () => void
  prevMeme: () => void

  nextVariant: () => void
  prevVariant: () => void

  setVariant: (index: number) => void

  getCurrentMeme: () => TMeme
  getCurrentVariant: () => TMeme['variants'][0]
}

export const useMemeViewerStore = create<Store>((set, get) => ({
  memes: [],

  memeIndex: 0,
  variantIndex: 0,
  setVariantIndex: (index) => set({ variantIndex: index }),

  verticalDirection: 1,
  horizontalDirection: 1,

  setMemes: (memes) => {
    set({ memes })
  },

  openBySlug: (slug) => {
    const { memes } = get()
    const index = memes.findIndex((m) => m.slug === slug)
    if (index !== -1) {
      set({
        memeIndex: index,
        variantIndex: 0,
      })
    }
  },

  nextMeme: () => {
    const { memeIndex, memes } = get()
    const nextIndex = (memeIndex + 1) % memes.length
    set({
      memeIndex: nextIndex,
      variantIndex: 0,
      verticalDirection: 1,
    })
  },

  prevMeme: () => {
    const { memeIndex, memes } = get()
    const prevIndex = (memeIndex - 1 + memes.length) % memes.length
    set({
      memeIndex: prevIndex,
      variantIndex: 0,
      verticalDirection: -1,
    })
  },

  nextVariant: () => {
    const {variantIndex, getCurrentMeme } = get()
    const meme = getCurrentMeme()
    const next = (variantIndex + 1) % meme.variants.length
    set({ variantIndex: next })
  },

  prevVariant: () => {
    const { variantIndex, getCurrentMeme } = get()
    const meme = getCurrentMeme()
    const prev = (variantIndex - 1 + meme.variants.length) % meme.variants.length
    set({ variantIndex: prev})
  },

  setVariant: (index) => {
    set({
      variantIndex: index,
    })
  },

  getCurrentMeme: () => {
    const { memeIndex, memes } = get()
    return memes[memeIndex]
  },

  getCurrentVariant: () => {
    const { getCurrentMeme, variantIndex } = get()
    const currentMeme = getCurrentMeme()
    return currentMeme.variants[variantIndex]
  },
}))