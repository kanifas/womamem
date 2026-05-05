'use client'

import { FC } from 'react'
import { TMeme } from '@/entities'
import { useLike } from '../model/useLike'

type TProps = {
  memeId: TMeme['id']
}

export const LikeButton: FC<TProps> = ({ memeId }) => {
  const { liked, toggle } = useLike()

  return (
    <button onClick={() => toggle(memeId)}>
      {liked ? '❤️' : '🤍'}
    </button>
  )
}