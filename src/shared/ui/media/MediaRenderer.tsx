import { FC } from 'react'
import { MemeVariantFormat } from '@/entities'

type Props = {
  src: string
  format: MemeVariantFormat
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  playsInline?: boolean
  controls?: boolean
  poster?: string
}

export const MediaRenderer: FC<Props> = ({
  src,
  format,
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = false,
  controls = false,
  poster,
}) => {
  if (format === 'video') {
    return (
      <video
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        controls={controls}
        className={className}
      />
    )
  }

  return (
    <img
      src={src}
      className={className}
      draggable={false}
    />
  )
}
