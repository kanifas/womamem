import { FC } from 'react'
import { getMemes } from '@/entities'
import { MemeCard } from '@/entities'
import { TMeme } from '@/entities'

export const Feed: FC = async () => {
  const memes = await getMemes()

  return (
    <div className="grid grid-cols-2 gap-4">
      {memes.map((meme) => (
        <MemeCard key={meme.id} meme={meme} />
      ))}
    </div>
  )
}