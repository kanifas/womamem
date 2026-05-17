'use client'

import { FC } from 'react'
import { MediaRenderer } from '@/shared/ui/media/MediaRenderer'
import type { MemeVariant } from '../model/types'

type Props = {
  variant: MemeVariant
  isActive?: boolean
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
}

export const MemePreview: FC<Props> = ({
  variant,
  isActive = false,
  autoplay = false,
  muted = false,
  loop = false,
}) => {
  return (
    <MediaRenderer
      src={variant.fileUrl}
      format={variant.format}
      className="
        h-full
        w-full
      "
      fit='cover'
      isActive={isActive}
      autoPlay={autoplay}
      muted={muted}
      loop={loop}
    />
  )
}