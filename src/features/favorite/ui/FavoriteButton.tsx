'use client'

import { FC } from 'react'
import { TMeme } from '@/entities'
import { useFavorite } from '../model/useFavorite'

type TProps = {
  memeId: TMeme['id']
}

export const FavoriteButton: FC<TProps> = ({ memeId }) => {
  const { fav, toggle } = useFavorite()

  return (
    <button onClick={() => toggle(memeId)}>
      {fav ? '⭐' : '☆'}
    </button>
  )
}