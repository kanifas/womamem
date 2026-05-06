'use client'

import { FC, useEffect } from 'react'
import { useMemeViewerStore } from '@/widgets/meme-viewer/model/store'
import { MemeCard } from '@/entities'
import { TMeme } from '@/entities'

type Props = {
  memes: TMeme[]
}

export const FeedClient: FC<Props> = ({ memes }) => {
  const setMemes = useMemeViewerStore((s) => s.setMemes)

  useEffect(() => {
    setMemes(memes)
  }, [memes, setMemes])

  if (!memes.length) {
    return <div className="p-4">Нет мемов 😢</div>
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {memes.map((meme) => (
        <MemeCard key={meme.id} meme={meme} />
      ))}
    </div>
  )
}