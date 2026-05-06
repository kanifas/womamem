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
  // const startX = useRef(0)
  // const endX = useRef(0)
  const isSwiping = useRef(false)

  const {
    setMemes,
    openBySlug,
    // memes: storeMemes,
    _currentIndex,
    next,
    prev,
    getCurrentMem,
    getNextMem,
    getPrevMem,
  } = useMemeViewerStore()

  useEffect(() => {
    setMemes(memes)
    openBySlug(initialSlug)
  }, [initialSlug, memes, openBySlug, setMemes])

  useEffect(() => {
    const currentMeme = getCurrentMem()
    router.replace(`/meme/${currentMeme.slug}`)
  }, [_currentIndex, router, getCurrentMem])

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

  // const onTouchStart = (e: React.TouchEvent) => {
  //   startX.current = e.touches[0].clientX;
  //   isSwiping.current = false // сбрасываем
  // }

  // const onTouchMove = (e: React.TouchEvent) => {
  //   endX.current = e.touches[0].clientX

  //   if (Math.abs(startX.current - endX.current) > 10) {
  //     isSwiping.current = true
  //   }
  // }

  // const onTouchEnd = () => {
  //   const diff = startX.current - endX.current

  //   if (Math.abs(diff) < 50) return // игнор мелких движений

  //   if (diff > 0) {
  //     // свайп влево → следующий
  //     next()
  //   } else {
  //     // свайп вправо → предыдущий
  //     prev()
  //   }
  // }

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center overflow-hidden"
      onClick={() => router.back()}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={currentMeme.id}
          className="relative"
          onClick={(e) => e.stopPropagation()}

          // 👉 drag
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}

          // 👉 инерция + “резиновость”
          dragElastic={0.2}

          // 👉 основной момент — snap логика
          onDragEnd={(e, info) => {
            const offset = info.offset.x
            const velocity = info.velocity.x

            // свайп влево → следующий
            if (offset < -100 || velocity < -500) {
              next()
            }
            // свайп вправо → предыдущий
            else if (offset > 100 || velocity > 500) {
              prev()
            }
          }}

          // 👉 анимации входа/выхода
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <img
            src={currentMeme.previewUrl}
            className="max-h-[90vh] max-w-[90vw] object-contain select-none pointer-events-none"
            draggable={false}
          />

          {/* стрелки */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-2xl"
          >
            ←
          </button>

          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-2xl"
          >
            →
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}