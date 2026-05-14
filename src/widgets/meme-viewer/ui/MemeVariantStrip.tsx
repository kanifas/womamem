'use client'

import { FC, useEffect, useRef, } from 'react'

// import { useMemeViewerStore } from '../model/store'
import { MediaRenderer } from '@/shared/ui/media/MediaRenderer'
import { TMeme } from '@/entities'

type Props = {
  meme: TMeme
  variantIndex: number
  setVariantIndex: (index: number) => void
}

export const MemeVariantStrip: FC<Props> = ({
  meme,
  variantIndex,
  setVariantIndex,
}) => {
  // const meme = useMemeViewerStore((s) => s.getCurrentMeme())
  // const variantIndex = useMemeViewerStore((s) => s.variantIndex)
  // const setVariant = useMemeViewerStore((s) => s.setVariant)
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})

  useEffect(() => {
    const active = meme?.variants?.[variantIndex]
    if (!active) return

    refs.current[active.id]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [meme, variantIndex])

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
        touch-pan-x
        scroll-smooth
        snap-x
        snap-mandatory
        rounded-2xl
        bg-black/40
        p-2
        backdrop-blur-md

        [-ms-overflow-style:none]
        [scrollbar-width:none]
      "
      onPointerDown={(e) => e.stopPropagation()} // Чтобы thumbnails не участвовали в swipe drag
    >
      {meme.variants.map((variant, index) => (
        <button
          key={variant.id}
          ref={(node) => {refs.current[variant.id] = node}}
          onClick={(e) => {
            e.stopPropagation()
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
            src={variant.thumbnailUrl ?? variant.fileUrl}
            format={variant.format}
            className="
              h-full
              w-full
              object-cover
            "
            isActive={false}
          />
        </button>
      ))}
    </div>
  )
}