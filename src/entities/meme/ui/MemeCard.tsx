'use client'

import Link from 'next/link'
import { FC } from 'react'
import { LikeButton } from '@/features'
import { FavoriteButton } from '@/features'
import { TMeme } from '@/entities'

type TProps = {
  meme: TMeme
}

export const MemeCard: FC<TProps> = ({ meme }) => {
  return (
    <div className="border rounded-xl p-2">
      <Link href={`/meme/${meme.slug}`} scroll={false}>
        <img
          src={meme.previewUrl}
          className="w-full rounded-lg"
        />
      </Link>

      <div className="flex justify-between mt-2">
        <LikeButton /*memeId={meme.id}*/ />
        <FavoriteButton /*memeId={meme.id}*/ />
      </div>
    </div>
  )
}