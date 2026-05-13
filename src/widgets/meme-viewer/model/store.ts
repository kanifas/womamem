'use client'

import { create } from 'zustand'
import { TMeme } from '@/entities'

type Store = {
  memes: TMeme[]

  currentMemeIndex: number
  currentVariantIndex: number

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

  currentMemeIndex: 0,
  currentVariantIndex: 0,

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
        currentMemeIndex: index,
        currentVariantIndex: 0,
      })
    }
  },

  nextMeme: () => {
    const { currentMemeIndex, memes } = get()
    const nextIndex = (currentMemeIndex + 1) % memes.length
    set({
      currentMemeIndex: nextIndex,
      currentVariantIndex: 0,
      verticalDirection: 1,
    })
  },

  prevMeme: () => {
    const { currentMemeIndex, memes } = get()
    const prevIndex = (currentMemeIndex - 1 + memes.length) % memes.length
    set({
      currentMemeIndex: prevIndex,
      currentVariantIndex: 0,
      verticalDirection: -1,
    })
  },

  nextVariant: () => {
    const { currentVariantIndex, currentMemeIndex, memes } = get()
    const variants = memes[currentMemeIndex]?.variants ?? []

    if (!variants.length) return

    const nextIndex = (currentVariantIndex + 1) % variants.length

    set({
      currentVariantIndex: nextIndex,
      horizontalDirection: 1,
    })
  },

  prevVariant: () => {
    const { currentVariantIndex, currentMemeIndex, memes } = get()
    const variants = memes[currentMemeIndex]?.variants ?? []

    if (!variants.length) return

    const prevIndex = (currentVariantIndex - 1 + variants.length) % variants.length

    set({
      currentVariantIndex: prevIndex,
      horizontalDirection: -1,
    })
  },

  setVariant: (index) => {
    set({
      currentVariantIndex: index,
    })
  },

  getCurrentMeme: () => {
    const { currentMemeIndex, memes } = get()
    return memes[currentMemeIndex]
  },

  getCurrentVariant: () => {
    const { currentMemeIndex, currentVariantIndex, memes } = get()
    return memes[currentMemeIndex]?.variants[currentVariantIndex]
  },

  // toNextMeme: () => {
  //   const { currentMemeIndex, memes } = get()
  //   const nextIndex = (currentMemeIndex + 1) % memes.length
  //   set({
  //     currentMemeIndex: nextIndex,
  //     direction: 1,
  //     currentVariantIndex: 0,
  //   })
  // },

  // toPrevMeme: () => {
  //   const { currentMemeIndex, memes } = get()
  //   const prevIndex =
  //     (currentMemeIndex - 1 + memes.length) % memes.length

  //   set({
  //     currentMemeIndex: prevIndex,
  //     direction: -1,
  //     currentVariantIndex: 0,
  //   })
  // },
}))