import { FC } from 'react'
import { getMemes } from '@/entities'
import { MemeCard } from '@/entities'
import { TMeme } from '@/entities'

export const Feed: FC = async () => {
  const memes = await getMemes()

  console.log('memes:', memes)

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