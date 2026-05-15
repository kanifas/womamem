import { FC } from 'react'

import { type TMeme } from '@/entities'
import { MemeCard } from '@/entities'

type Props = {
  memes: TMeme[]
}

export const FeedGrid: FC<Props> = ({
  memes,
}) => {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4

        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-5

        pb-24
      "
    >
      {memes.map((meme) => (
        <MemeCard
          key={meme.id}
          meme={meme}
        />
      ))}
    </div>
  )
}