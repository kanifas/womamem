'use client'
import { TMeme } from '@/entities'
import { create } from 'zustand'

type Store = {
  memes: TMeme[]
  _currentIndex: number
  _nextIndex: number
  _prevIndex: number
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

  _currentIndex: 0,
  _nextIndex: 0,
  _prevIndex: 0,

  setMemes: (memes) => {
    if (memes.length === 0) {
      return
    }

    if (memes.length == 1) {
      set({
        memes,
        _currentIndex: 0,
        _nextIndex: 0,
        _prevIndex: 0,
      })
    } else {
      set({
        memes,
        _currentIndex: 0,
        _nextIndex: 1,
        _prevIndex: memes.length - 1,
      })
    }
  },

  next: () => {
    const { _currentIndex, _nextIndex, memes } = get()
    if (memes.length < 2) {
      set({
        _currentIndex: 0,
        _nextIndex: 0,
        _prevIndex: 0
      })
    } else {
      set({
        _currentIndex: memes[_currentIndex + 1] ? _currentIndex + 1 : 0,
        _nextIndex: memes[_nextIndex + 1] ? _nextIndex + 1 : 0,
        _prevIndex: _currentIndex
      })
    }
  },

  prev: () => {
    const { _currentIndex, _prevIndex, memes } = get()
    if (memes.length < 2) {
      set({
        _currentIndex: 0,
        _nextIndex: 0,
        _prevIndex: 0
      })
    } else {
      set({
        _currentIndex: memes[_currentIndex - 1] ? _currentIndex - 1 : memes.length -1,
        _nextIndex: _currentIndex,
        _prevIndex: memes[_prevIndex - 1] ? _prevIndex - 1 : memes.length -1
      })
    }
  },

  getCurrentMem: () => {
    const { _currentIndex, memes } = get()
    return memes[_currentIndex]
  },

  getNextMem: () => {
    const { _nextIndex, memes } = get()
    return memes[_nextIndex]
  },

  getPrevMem: () => {
    const { _prevIndex, memes } = get()
    return memes[_prevIndex]
  },

  openBySlug: (slug) => {
    const { memes } = get()
    const index = memes.findIndex((m) => m.slug === slug)
    if (index !== -1) {
      set({ _currentIndex: index })
    }
  },
}))