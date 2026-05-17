'use client'

import {
  FC,
  useEffect,
  useRef,
  useState,
} from 'react'

import { useRouter } from 'next/navigation'

import { useMemeViewerStore } from '@/widgets'

import { TMeme } from '@/entities'

import { MemeLayer } from '@/entities/meme/ui/MemeLayer'

import { useVerticalSwipe } from '@/shared/lib/gestures/useVerticalSwipe'

type Props = {
  initialSlug: string
  memes: TMeme[]
}

export const MemeModalClient: FC<Props> = ({
  initialSlug,
  memes,
}) => {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  const toNextMeme =
    useMemeViewerStore(
      (s) => s.toNextMeme,
    )

  const toPrevMeme =
    useMemeViewerStore(
      (s) => s.toPrevMeme,
    )

    const {
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useVerticalSwipe({
    containerRef,
    onNext: toNextMeme,
    onPrev: toPrevMeme,
  })

  const setMemes =
    useMemeViewerStore(
      (s) => s.setMemes,
    )

  const openBySlug =
    useMemeViewerStore(
      (s) => s.openBySlug,
    )

  const memeIndex =
    useMemeViewerStore(
      (s) => s.memeIndex,
    )

  const getCurrentMeme =
    useMemeViewerStore(
      (s) => s.getCurrentMeme,
    )

  useEffect(() => {
    setMemes(memes)

    openBySlug(initialSlug)
  }, [
    initialSlug,
    memes,
    openBySlug,
    setMemes,
  ])

  useEffect(() => {
    const currentMeme =
      getCurrentMeme()

    if (!currentMeme) {
      return
    }

    router.replace(
      `/meme/${currentMeme.slug}`,
    )
  }, [
    memeIndex,
    getCurrentMeme,
    router,
  ])

  const currentMeme =
    getCurrentMeme()

  const nextMeme =
    memes[
      Math.min(
        memeIndex + 1,
        memes.length - 1,
      )
    ]

  const prevMeme =
    memes[
      Math.max(
        memeIndex - 1,
        0,
      )
    ]

  useEffect(() => {
    const handler = (
      e: KeyboardEvent,
    ) => {
      if (e.key === 'ArrowDown') {
        toNextMeme()
      }

      if (e.key === 'ArrowUp') {
        toPrevMeme()
      }

      if (e.key === 'Escape') {
        router.back()
      }
    }

    window.addEventListener(
      'keydown',
      handler,
    )

    return () => {
      window.removeEventListener(
        'keydown',
        handler,
      )
    }
  }, [
    toNextMeme,
    toPrevMeme,
    router,
  ])

  const preloadMedia = (
    url: string,
    format: string,
  ) => {
    if (!url) {
      return
    }

    if (
      format === 'mp4'
      || format === 'webm'
      || format === 'video'
    ) {
      const video =
        document.createElement(
          'video',
        )

      video.src = url

      video.preload = 'metadata'
    } else {
      const img = new Image()

      img.src = url
    }
  }

  useEffect(() => {
    const preloadVariants = (
      meme?: TMeme,
    ) => {
      if (!meme) {
        return
      }

      meme.variants
        .slice(0, 3)
        .forEach((variant) => {
          preloadMedia(
            variant.fileUrl,
            variant.format,
          )

          if (
            variant.thumbnailUrl
          ) {
            preloadMedia(
              variant.thumbnailUrl,
              'image',
            )
          }
        })
    }

    preloadVariants(nextMeme)

    preloadVariants(prevMeme)
  }, [
    memeIndex,
    nextMeme,
    prevMeme,
  ])

  if (!currentMeme) {
    return null
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-100
        overflow-hidden
        bg-black
        touch-none
      "
      onPointerDown={
        handlePointerDown
      }
      onPointerMove={
        handlePointerMove
      }
      onPointerUp={
        handlePointerUp
      }
      onPointerCancel={
        handlePointerUp
      }
    >
      <div
        ref={containerRef}
        className="
          absolute
          inset-0
          will-change-transform
        "
      >
        <MemeLayer
          meme={prevMeme}
          position="prev"
        />

        <MemeLayer
          meme={currentMeme}
          position="current"
          active
        />

        <MemeLayer
          meme={nextMeme}
          position="next"
        />
      </div>

      <button
        onClick={() => {
          router.back()
        }}
        className="
          absolute
          left-4
          top-4
          z-50
          rounded-full
          bg-black/60
          px-4
          py-2
          text-white
          backdrop-blur
        "
      >
        ✕
      </button>
    </div>
  )
}