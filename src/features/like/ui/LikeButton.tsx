'use client'

import { FC } from 'react'
import { useLikeStore } from '../model/store'

type Props = {
  memeId: string
}

export const LikeButton: FC<Props> = ({ memeId }) => {
  const likedIds = useLikeStore((s) => s.likedIds)
  const toggle = useLikeStore((s) => s.toggle)

  const liked = likedIds.has(memeId)

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(memeId)
      }}
      className="
        transition
        active:scale-90
      "
    >
      {/* 🤘 */}
      {liked ? '❤️' : '🤍'}
    </button>
  )
}