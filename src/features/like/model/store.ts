'use client'

import { create } from 'zustand'

type Store = {
  likedIds: Set<string>
  toggle: (id: string) => void
}

export const useLikeStore = create<Store>((set) => ({
  likedIds: new Set(),

  toggle: (id) =>
    set((state) => {
      const next = new Set(state.likedIds)

      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }

      return {
        likedIds: next,
      }
    }),
}))