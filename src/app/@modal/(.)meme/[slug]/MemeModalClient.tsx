'use client'

import { FC, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useMemeViewerStore } from '@/widgets/meme-viewer/model/store'
import { TMeme } from '@/entities'
import { MemeVariantStrip, MemeVariantContent } from '@/widgets'

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
  const horizontalDirection = useMemeViewerStore((s) => s.horizontalDirection)
  const currentMemeIndex = useMemeViewerStore((s) => s.currentMemeIndex)
  const currentVariantIndex = useMemeViewerStore((s) => s.currentVariantIndex)
  const getCurrentMeme = useMemeViewerStore((s) => s.getCurrentMeme)
  const getCurrentVariant = useMemeViewerStore((s) => s.getCurrentVariant)
  const nextMeme = useMemeViewerStore((s) => s.nextMeme)
  const prevMeme = useMemeViewerStore((s) => s.prevMeme)
  const nextVariant = useMemeViewerStore((s) => s.nextVariant)
  const prevVariant = useMemeViewerStore((s) => s.prevVariant)

  useEffect(() => {
    setMemes(memes)
    openBySlug(initialSlug)
  }, [initialSlug, memes, openBySlug, setMemes])

  useEffect(() => {
    const currentMeme = getCurrentMeme()
    if (currentMeme) {
      setTimeout(() => {
        router.replace(`/meme/${currentMeme.slug}`)
      }, 20)
    }
  }, [router, getCurrentMeme])

  // const onNextClick = () => {
  //   next()
  //   const nextMeme = storeMemes[currentMemeIndex + 1]
  //   if (nextMeme) {
  //     router.replace(`/meme/${nextMeme.slug}`)
  //   }
  // }

  // const onPrevClick = () => {
  //   prev()
  //   const prevMeme = storeMemes[currentMemeIndex - 1]
  //   if (prevMeme) {
  //     router.replace(`/meme/${prevMeme.slug}`)
  //   }
  // }

  const currentMeme = getCurrentMeme()
  const currentVariant = getCurrentVariant()
   // if (!meme) return null

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') nextMeme()
      if (e.key === 'ArrowUp') prevMeme()
      if (e.key === 'ArrowRight') nextVariant()
      if (e.key === 'ArrowLeft') prevVariant()
      if (e.key === 'Escape') router.back()
    }
    window.addEventListener('keydown', handler)

    return () => window.removeEventListener('keydown', handler)
  }, [currentMeme, nextMeme, prevMeme, nextVariant, prevVariant, router])

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

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  }

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center overflow-hidden"
      onClick={() => router.back()}
    >
      <AnimatePresence initial={false} custom={verticalDirection} mode='wait'>
        <motion.div
          key={currentMemeIndex}
          className="relative"
          onClick={(e) => e.stopPropagation()}

          layout={false}
          custom={verticalDirection}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          dragMomentum={false}
          drag
          dragConstraints={{ left: 0, right: 0 }}

          // 👉 инерция + “резиновость”
          dragElastic={0.3}

          // говорит браузеру: “я сам обрабатываю горизонтальные жесты”
          style={{ touchAction: 'pan-y' }}

          // 👉 основной момент — snap логика
          onDragEnd={(e, info) => {
            const offsetX = info.offset.x
            const offsetY = info.offset.y

            const velocityX = info.velocity.x
            const velocityY = info.velocity.y

            const isHorizontal = Math.abs(offsetX) > Math.abs(offsetY)

            if (isHorizontal) {
              if (
                offsetX < -80 ||
                velocityX < -500
              ) {
                nextVariant()
              }

              else if (
                offsetX > 80 ||
                velocityX > 500
              ) {
                prevVariant()
              }
            } else {
              if (
                offsetY < -80 ||
                velocityY < -500
              ) {
                nextMeme()
              }

              else if (
                offsetY > 80 ||
                velocityY > 500
              ) {
                prevMeme()
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
          <MemeVariantContent
            variant={currentVariant}
          />

          <MemeVariantStrip />

          {/* стрелки */}
          <button
            onClick={prevMeme}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-2xl p-4 bg-black rounded-full cursor-pointer"
          >
            ←
          </button>

          <button
            onClick={nextMeme}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-2xl  p-4 bg-black rounded-full cursor-pointer"
          >
            →
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}