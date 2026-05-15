'use client'

import { FC } from 'react'
import { MediaRenderer } from '@/shared/ui/media/MediaRenderer'
import type { MemeVariant } from '../model/types'

type Props = {
  variant: MemeVariant
}

export const MemePreview: FC<Props> = ({ variant }) => {
  return (
    <MediaRenderer
      src={variant.fileUrl}
      format={variant.format}
      className="
        h-full
        w-full
        object-cover
      "
      isActive
      autoPlay
    />
  )
}