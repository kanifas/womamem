'use client'

import { useState } from "react"

export const useLike = () => {
  const [liked, setLiked] = useState(false)

  const toggle = async (memeId: string) => {
    setLiked(prev => !prev)

    await fetch('/api/like', {
      method: 'POST',
      body: JSON.stringify({ memeId }),
    })
  }

  return { liked, toggle }
}