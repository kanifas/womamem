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
    <div className="
      columns-1
      sm:columns-2
      lg:columns-3
      xl:columns-4
      2xl:columns-5
      gap-4
      p-4"
    >
      {memes.map((meme, index) => (
        <div
          key={meme.id}
          className="mb-4 break-inside-avoid"
        >
          <MemeCard key={meme.id} meme={meme} />

          {/* пример рекламной вставки */}
          {(index + 1) % 12 === 0 && (
            <div
              className="
                mt-4
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900
                p-6
                text-center
                text-zinc-400
              "
            >
              Ad block
            </div>
          )}
        </div>
      ))}
    </div>
  )
}