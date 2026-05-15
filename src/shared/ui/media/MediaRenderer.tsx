'use client'

import clsx from 'clsx'
import { FC, useEffect, useRef } from 'react'
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
  isActive?: boolean
}

export const MediaRenderer: FC<Props> = ({
  src,
  format,
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  controls = false,
  poster,
  isActive = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isActive) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isActive])

  if (format === 'video') {
    return (
      <video
        ref={videoRef}
        src={src}
        className={clsx(
          `
            block
            max-w-full
            max-h-full
          `,
          className,
        )}

        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}

        preload="metadata" // не грузит весь mp4 сразу

        controls={controls}
      />
    )
  }

  return (
    <img
      src={src}
      className={clsx(
        `
          block
          max-w-full
          max-h-full
        `,
        className,
      )}
      draggable={false}
    />
  )
}
