'use client'

import { FC } from 'react'

import { TMeme } from '@/entities'

import { MediaRenderer } from '@/shared/ui/media/MediaRenderer'

type Props = {
  meme?: TMeme
  position: 'prev' | 'current' | 'next'
  active?: boolean
}

export const MemeLayer: FC<Props> = ({
  meme,
  position,
  active = false,
}) => {
  if (!meme) {
    return null
  }

  const variant =
    meme.variants[0]

  const isVertical =
    (variant.height ?? 0)
    >= (variant.width ?? 0)

  const translate =
    position === 'prev'
      ? '-100%'
      : position === 'next'
        ? '100%'
        : '0%'

  return (
    <div
      className="
        absolute
        inset-0
        flex
        items-center
        justify-center
      "
      style={{
        transform: `translate3d(0, ${translate}, 0)`,
      }}
    >
      <MediaRenderer
        src={variant.fileUrl}
        format={variant.format}
        fit={isVertical ? 'cover' : 'contain'}
        isActive={active}
        className="
          h-full
          w-full
          bg-black
        "
      />
    </div>
  )
}