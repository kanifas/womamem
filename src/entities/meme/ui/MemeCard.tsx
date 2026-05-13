'use client'

import Link from 'next/link'
import { FC, useState } from 'react'
import { LikeButton } from '@/features'
import { FavoriteButton } from '@/features'
import { TMeme } from '@/entities'
import { MemePreview } from './MemePreview'

type TProps = {
  meme: TMeme
}

export const MemeCard: FC<TProps> = ({ meme }) => {
  const [activeVariantIndex, setActiveVariantIndex] = useState(0)
  const activeVariant = meme.variants[activeVariantIndex]

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
          <MemePreview
            variant={activeVariant}
          />
        </div>

        {meme.variants.length > 0 && (
          <div
            className="
              mt-2
              flex
              gap-2
              overflow-x-auto
              scrollbar-none
              snap-x
              px-2
            "
          >
            {meme.variants.map(
              (variant, index) => (
                <button
                  key={variant.id}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveVariantIndex(index)
                  }}
                  className={`
                    relative
                    h-14
                    w-14
                    shrink-0
                    overflow-hidden
                    rounded-lg
                    border-2
                    transition
                    ${
                      activeVariantIndex === index
                        ? 'scale-105 border-white'
                        : 'opacity-70 border-transparent'
                    }
                  `}
                >
                  <img
                    src={variant.thumbnailUrl ?? variant.fileUrl}
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                    draggable={false}
                  />

                </button>
              ),
            )}
          </div>
        )}

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