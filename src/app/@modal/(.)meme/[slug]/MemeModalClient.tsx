'use client'

import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useMemeViewerStore } from '@/widgets/meme-viewer/model/store'
import { TMeme } from '@/entities'
import { MemeVariantStrip } from '@/widgets'
import { MediaRenderer } from '@/shared/ui/media/MediaRenderer'

type Props = {
  initialSlug: string
  memes: TMeme[]
}

export const MemeModalClient: FC<Props> = ({ initialSlug, memes }) => {
  const router = useRouter()
  // const { memes: storeMemes } = useMemeViewerStore((s) => s.memes)
  const setMemes = useMemeViewerStore((s) => s.setMemes)
  const openBySlug = useMemeViewerStore((s) => s.openBySlug)
  const verticalDirection = useMemeViewerStore((s) => s.verticalDirection)
  const memeIndex = useMemeViewerStore((s) => s.memeIndex)
  const getCurrentMeme = useMemeViewerStore((s) => s.getCurrentMeme)
  // const getCurrentVariant = useMemeViewerStore((s) => s.getCurrentVariant)
  const toNextMeme = useMemeViewerStore((s) => s.toNextMeme)
  const toPrevMeme = useMemeViewerStore((s) => s.toPrevMeme)
  // const nextVariant = useMemeViewerStore((s) => s.nextVariant)
  // const prevVariant = useMemeViewerStore((s) => s.prevVariant)

  const [showLikeBurst, setShowLikeBurst] = useState(false) // state heart animation
  const lastTapRef = useRef(0)
  // Сейчас double tap trigger'ится даже после swipe. Нужно защититься
  const draggingRef = useRef(false)

  const [variantIndex, setVariantIndex] = useState(0)

  const [variantDirection, setVariantDirection] = useState<1 | -1>(1)

  const swipeConfidenceThreshold = 10000

  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  useEffect(() => {
    setMemes(memes)
    openBySlug(initialSlug)
  }, [initialSlug, memes, openBySlug, setMemes])

  useEffect(() => {
    const currentMeme = getCurrentMeme()
    if (!currentMeme) return
    router.replace(`/meme/${currentMeme.slug}`)
  }, [memeIndex, getCurrentMeme, router])

  const currentMeme = getCurrentMeme()
  const safeVariants = currentMeme?.variants ?? []
  const safeVariantIndex = Math.min(
    variantIndex,
    Math.max(safeVariants.length - 1, 0),
  )
  const currentVariant = safeVariants[safeVariantIndex]

  const nextMeme = memes[(memeIndex + 1) % memes.length]
  const prevMeme = memes[(memeIndex - 1 + memes.length) % memes.length]

  const toNextVariant = useCallback(() => {
    if (!currentMeme) {
      return
    }
    setVariantDirection(1)
    setVariantIndex(prevVariantIndex => (prevVariantIndex + 1) % currentMeme.variants.length)
  }, [currentMeme])

  const toPrevVariant = useCallback(() => {
    if (!currentMeme) {
      return
    }
    setVariantDirection(-1)
    setVariantIndex(prevVariantIndex => (prevVariantIndex - 1 + currentMeme.variants.length) % currentMeme.variants.length)
  }, [currentMeme])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') toNextMeme()
      if (e.key === 'ArrowUp') toPrevMeme()
      if (e.key === 'ArrowRight') toNextVariant()
      if (e.key === 'ArrowLeft') toPrevVariant()
      if (e.key === 'Escape') router.back()
    }
    window.addEventListener('keydown', handler)

    return () => window.removeEventListener('keydown', handler)
  }, [toNextMeme, toPrevMeme, router, toNextVariant, toPrevVariant])

  const preloadMedia = (url: string, format: string) => {
    if (!url) return
    if (format === 'mp4' || format === 'webm') {
      const video = document.createElement('video')
      video.src = url
      video.preload = 'metadata'
    } else {
      const img = new Image()
      img.src = url
    }
  }

  useEffect(() => {
    const preloadVariants = (meme?: TMeme) => {
      if (!meme) return

      meme.variants
        .slice(0, 3)
        .forEach((variant) => {
          preloadMedia(
            variant.fileUrl,
            variant.format,
          )

          if (variant.thumbnailUrl) {
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

  useEffect(() => {
    // Отключил прдупреждение. Здесь можно
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVariantIndex(0)
  }, [currentMeme])

  // TODO: ОБЯЗАТЕЛЬНО ДОДЕЛАТЬ!! - ЭТО ПРЯМ ОСНОВНОЕ!
  // Preload следующего и предыдущего мемов
  // useEffect(() => {
  //   const nextMeme = getNextMem()
  //   const prevMeme = getPrevMem()

  //   if (nextMeme.variants[0]?.fileUrl) {
  //     const img = new Image()
  //     img.src = nextMeme.variants[0]?.fileUrl
  //   }

  //   if (prevMeme.variants[0]?.fileUrl) {
  //     const img = new Image()
  //     img.src = prevMeme.variants[0]?.fileUrl
  //   }
  // }, [currentMeme, getNextMem, getPrevMem])

  const memeMotionVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 300 : -300,
      opacity: 0,
    }),

    center: {
      y: 0,
      opacity: 1,
    },

    exit: (direction: number) => ({
      y: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  }

  const variantMotionVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),

    center: {
      x: 0,
      opacity: 1,
    },

    exit: (direction: number) => ({
      x: direction > 0 ? -200 : 200,
      opacity: 0,
    }),
  }

  const onDoubleTap = () => {
    if (draggingRef.current) return

    const now = Date.now()

    if (now - lastTapRef.current < 250) {
      setShowLikeBurst(true)

      setTimeout(() => {
        setShowLikeBurst(false)
      }, 700)

      // TODO:
      // optimistic like
      // server action
    }

    lastTapRef.current = now
  }

  if (!currentMeme || !currentVariant) {
    return null
  }

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center overflow-hidden"
      onClick={() => router.back()}
    >
      <AnimatePresence
        initial={false}
        custom={verticalDirection}
        mode='wait'
      >
        <motion.div
          key={memeIndex}
          className="
            relative
            flex
            w-full
            flex-col
            items-center
            justify-center
          "
          onClick={(e) => {
            e.stopPropagation()
            onDoubleTap()
          }}

          layout={false}
          custom={verticalDirection}
          variants={memeMotionVariants}
          initial="enter"
          animate="center"
          exit="exit"

          drag
          dragMomentum={false}
          dragElastic={0.2} // 👉 инерция + “резиновость”
          dragSnapToOrigin // Это заставит элемент: получать drag gestures, вызывать onDragEnd, НО всегда возвращаться в центр.
          dragConstraints={{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}

          style={{ touchAction: 'none' }}

          onDragStart={() => {
            draggingRef.current = true
          }}

          // 👉 основной момент — snap логика
          onDragEnd={(e, info) => {
            setTimeout(() => {
              draggingRef.current = false
            }, 50)

            const offsetX = info.offset.x
            const offsetY = info.offset.y

            const velocityX = info.velocity.x
            const velocityY = info.velocity.y

            const horizontalPower = swipePower(offsetX, velocityX)
            const verticalPower = swipePower(offsetY, velocityY)

            const absX = Math.abs(offsetX)
            const absY = Math.abs(offsetY)

            // Вертикальный swipe может trigger'иться при horizontal gesture и наоборот
            // Нужно добавить deadzone
            if (absX < 10 && absY < 10) {
              return
            }

            const isHorizontal = Math.abs(offsetX) > Math.abs(offsetY)
            const isVertical = Math.abs(offsetY) > Math.abs(offsetX)

            if (isHorizontal) {
              if (horizontalPower < -swipeConfidenceThreshold) {
                toNextVariant()
              } else if (horizontalPower > swipeConfidenceThreshold) {
                toPrevVariant()
              }

              return
            }

            if (isVertical) {
              if (verticalPower < -swipeConfidenceThreshold) {
                toNextMeme()
              } else if (verticalPower > swipeConfidenceThreshold) {
                toPrevMeme()
              }
            }
          }}

          // 👉 анимации входа/выхода
          transition={{
            type: 'spring',
            stiffness: 250,
            damping: 30,
          }}
        >
          <AnimatePresence
            initial={false}
            custom={variantDirection}
            mode="wait"
          >
            <motion.div
              key={currentVariant.id}
              className="
                relative
                flex
                w-full
                items-center
                justify-center
              "
              variants={variantMotionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={variantDirection}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
            >
              <MediaRenderer
                src={currentVariant.fileUrl}
                format={currentVariant.format}
                className="
                  max-h-[90vh]
                  max-w-[90vw]
                  object-contain
                  select-none
                "
                isActive
              />

              <MemeVariantStrip
                meme={currentMeme}
                variantIndex={safeVariantIndex}
                setVariantIndex={setVariantIndex}
              />

              {/* стрелки */}
              <button
                onClick={toPrevMeme}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-2xl p-4 bg-black rounded-full cursor-pointer"
              >
                ←
              </button>

              <button
                onClick={toNextMeme}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-2xl  p-4 bg-black rounded-full cursor-pointer"
              >
                →
              </button>

              <AnimatePresence>
                {showLikeBurst && (
                  <motion.div
                    initial={{scale: 0.5, opacity: 0,}}
                    animate={{scale: 1.4,opacity: 0.8}}
                    exit={{scale: 2, opacity: 0}}
                    transition={{duration: 0.4}}
                    className="
                      pointer-events-none
                      absolute
                      left-1/2
                      top-1/2
                      z-50
                      -translate-x-1/2
                      -translate-y-1/2
                      text-7xl
                    "
                  >
                    🤘
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}