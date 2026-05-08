'use client'

import { FC, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useMemeViewerStore } from '@/widgets/meme-viewer/model/store'
import { TMeme } from '@/entities'

type Props = {
  initialSlug: string
  memes: TMeme[]
}

export const MemeModalClient: FC<Props> = ({ initialSlug, memes }) => {
  const router = useRouter()
  // const { memes: storeMemes } = useMemeViewerStore((s) => s.memes)
  const setMemes = useMemeViewerStore((s) => s.setMemes)
  const openBySlug = useMemeViewerStore((s) => s.openBySlug)
  const currentIndex = useMemeViewerStore((s) => s.currentIndex)
  const getCurrentMem = useMemeViewerStore((s) => s.getCurrentMem)
  const getNextMem = useMemeViewerStore((s) => s.getNextMem)
  const getPrevMem = useMemeViewerStore((s) => s.getPrevMem)
  const direction = useMemeViewerStore((s) => s.direction)
  const next = useMemeViewerStore((s) => s.next)
  const prev = useMemeViewerStore((s) => s.prev)

  useEffect(() => {
    setMemes(memes)
    openBySlug(initialSlug)
  }, [initialSlug, memes, openBySlug, setMemes])

  useEffect(() => {
    const currentMeme = getCurrentMem()
    setTimeout(() => {
      router.replace(`/meme/${currentMeme.slug}`)
    }, 20)
  }, [currentIndex, router, getCurrentMem])

  // const onNextClick = () => {
  //   next()
  //   const nextMeme = storeMemes[currentIndex + 1]
  //   if (nextMeme) {
  //     router.replace(`/meme/${nextMeme.slug}`)
  //   }
  // }

  // const onPrevClick = () => {
  //   prev()
  //   const prevMeme = storeMemes[currentIndex - 1]
  //   if (prevMeme) {
  //     router.replace(`/meme/${prevMeme.slug}`)
  //   }
  // }

  const currentMeme = getCurrentMem()
   // if (!meme) return null

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'Escape') router.back()
    }
    window.addEventListener('keydown', handler)

    return () => window.removeEventListener('keydown', handler)
  }, [currentMeme, next, prev, router])

  // Preload следующего и предыдущего мемов
  useEffect(() => {
    const nextMeme = getNextMem()
    const prevMeme = getPrevMem()

    if (nextMeme?.previewUrl) {
      const img = new Image()
      img.src = nextMeme.previewUrl
    }

    if (prevMeme?.previewUrl) {
      const img = new Image()
      img.src = prevMeme.previewUrl
    }
  }, [currentMeme, getNextMem, getPrevMem])

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
      <AnimatePresence initial={false} custom={direction} mode='wait'>
        <motion.div
          key={currentIndex}
          className="relative"
          onClick={(e) => e.stopPropagation()}

          layout={false}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          dragMomentum={false}

          // 👉 drag
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}

          // 👉 инерция + “резиновость”
          dragElastic={0.3}

          // говорит браузеру: “я сам обрабатываю горизонтальные жесты”
          style={{ touchAction: 'pan-y' }}

          // 👉 основной момент — snap логика
          onDragEnd={(e, info) => {
            const offset = info.offset.x
            const velocity = info.velocity.x

            if (offset < -80 || velocity < -500) {
              next()
            } else if (offset > 80 || velocity > 500) {
              prev()
            }
          }}

          // 👉 анимации входа/выхода
          transition={{
            type: 'spring',
            stiffness: 250,
            damping: 30,
          }}
        >
          <img
            src={currentMeme.previewUrl}
            className="max-h-[90vh] max-w-[90vw] object-contain select-none pointer-events-none"
            draggable={false}
          />

          {/* стрелки */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-2xl p-4 bg-black rounded-full cursor-pointer"
          >
            ←
          </button>

          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-2xl  p-4 bg-black rounded-full cursor-pointer"
          >
            →
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}