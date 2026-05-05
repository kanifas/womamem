'use client'

import { useState } from 'react'

export const useFavorite = () => {
  const [fav, setFav] = useState(false)

  const toggle = async (memeId: string) => {
    setFav(prev => !prev)

    await fetch('/api/favorite', {
      method: 'POST',
      body: JSON.stringify({ memeId }),
    })
  }

  return { fav, toggle }
}