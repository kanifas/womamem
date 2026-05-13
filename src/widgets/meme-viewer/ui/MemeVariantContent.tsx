'use client'

import { FC } from 'react'
import { MemeVariant } from '@/entities'
import { MediaRenderer } from '@/shared/ui/media/MediaRenderer'

type Props = {
  variant: MemeVariant
}

export const MemeVariantContent: FC<Props> = ({
  variant,
}) => {
  return (
    <MediaRenderer
      src={variant.fileUrl}
      format={variant.format}
      className="
        max-h-[90vh]
        max-w-[90vw]
        object-contain
        select-none
        pointer-events-none
      "
    />
  )
}