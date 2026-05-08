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
    
      <Link
        href={`/meme/${meme.slug}`}
        scroll={false}
        className="
          group
          block
          overflow-hidden
          rounded-2xl
          bg-zinc-950
          border
          border-zinc-900
        "
      >
        {/* preview */}
        <div className="relative">
          <img
            src={meme.previewUrl}
            alt={meme.title}
            className="
              w-full
              object-cover
              transition-transform
              duration-300
              group-hover:scale-[1.02]
            "
            draggable={false}
            loading="lazy"
          />
        </div>

        {/* content */}
        <div className="p-3">
          {/* title */}
          <div
            className="
              line-clamp-2
              text-sm
              text-zinc-100
            "
          >
            {meme.title}
          </div>

          {/* actions */}
          <div
            className="
              mt-3
              flex
              items-center
              justify-between
              text-zinc-400
            "
          >
            <div className="flex items-center gap-4">
              <button className="transition hover:text-white">
                ❤️
              </button>

              <button className="transition hover:text-white">
                💬
              </button>

              <button className="transition hover:text-white">
                ↗️
              </button>
            </div>

            <button className="transition hover:text-white">
              ⬇️
            </button>
          </div>

          {/* <div className="flex justify-between mt-2">
            <LikeButton memeId={meme.id} />
            <FavoriteButton memeId={meme.id} />
          </div> */}
        </div>
      </Link>
  )
}