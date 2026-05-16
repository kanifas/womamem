'use client'

import Link from 'next/link'
import { FC, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
// import { LikeButton } from '@/features'
// import { FavoriteButton } from '@/features'
import { TMeme } from '@/entities'
import { MemePreview } from './MemePreview'
import { MediaRenderer } from '@/shared/ui/media/MediaRenderer'
// import { useMemeViewerStore } from '@/widgets/meme-viewer/model/store'
import { useBottomSheetStore } from '@/widgets'

type TProps = {
  meme: TMeme
}

export const MemeCard: FC<TProps> = ({ meme }) => {
  const openBottomSheet = useBottomSheetStore((s) => s.open)
  const [variantIndex, setVariantIndex] = useState(0)

  const activeVariant = meme.variants[
    Math.min(variantIndex, meme.variants.length - 1)
  ]

  return (
      <Link
        href={`/meme/${meme.slug}`}
        scroll={false}
        className="
          group
          block
          overflow-hidden
          rounded-2xl
          border
          bg-[var(--color-bg)]
          border-[var(--color-border)]
        "
      >
        {/* preview */}
        <motion.div
          layoutId={`meme-${meme.id}`}
          className="
            relative
            aspect-4/5
            overflow-hidden
            bg-black
          "
        >
          <MemePreview
            variant={activeVariant}
          />
        </motion.div>

        {meme.variants.length > 0 && (
          <div
            className="
              mt-2
              flex
              gap-2
              overflow-x-auto
              px-2
            "
          >
            {meme.variants.map(
              (variant, index) => (
                <button
                  key={variant.id}
                  onClick={(e) => {
                    e.preventDefault()
                    setVariantIndex(index)
                  }}
                  className={`
                    relative
                    h-16
                    w-16
                    shrink-0
                    overflow-hidden
                    rounded-xl
                    border-2
                    transition

                    snap-center
                    transform-gpu
                    will-change-transform

                     ${
                      variantIndex === index
                        ? `
                            border-white
                            scale-[1.08]
                            ring-2
                            ring-white/40
                          `
                        : `
                            border-transparent
                            opacity-70
                          `
                    }
                  `}
                >
                  <MediaRenderer
                    src={variant.fileUrl}
                    format={variant.format}
                    className="
                      h-full
                      w-full
                      object-cover
                    "
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

              <button
                className="transition hover:text-white"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  openBottomSheet('comments')}
                }
              >
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