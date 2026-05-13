'use client'

import { FC } from 'react'

import { useMemeViewerStore } from '../model/store'

export const MemeVariantStrip: FC = () => {
  const meme = useMemeViewerStore((s) =>
    s.getCurrentMeme(),
  )

  const currentVariantIndex =
    useMemeViewerStore(
      (s) => s.currentVariantIndex,
    )

  const setVariant = useMemeViewerStore(
    (s) => s.setVariant,
  )

  if (!meme?.variants?.length) return null

  return (
    <div
      className="
        absolute
        bottom-4
        left-1/2
        z-50
        flex
        max-w-[90vw]
        -translate-x-1/2
        gap-2
        overflow-x-auto
        rounded-2xl
        bg-black/40
        p-2
        backdrop-blur-md
      "
    >      {meme.variants.map((variant, index) => (
        <button
          key={variant.id}
          onClick={() => setVariant(index)}
          className={`
            relative
            h-16
            w-16
            shrink-0
            overflow-hidden
            rounded-xl
            border-2
            transition
            ${
              currentVariantIndex === index
                ? 'border-white scale-105'
                : 'border-transparent opacity-70'
            }
          `}
        >
          <img
            src={variant.thumbnailUrl ?? variant.fileUrl}
            className="h-full w-full object-cover"
            draggable={false}
          />
        </button>
      ))}
    </div>
  )
}