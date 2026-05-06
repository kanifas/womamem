'use client'

import { FC, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useMemeViewerStore } from '@/widgets/meme-viewer/model/store'
import { TMeme } from '@/entities'

type Props = {
  initialSlug: string
  memes: TMeme[]
}

export const MemeModalClient: FC<Props> = ({ initialSlug, memes }) => {
  const router = useRouter()
  const startX = useRef(0)
  const endX = useRef(0)
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

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    isSwiping.current = false // сбрасываем
  }

  const onTouchMove = (e: React.TouchEvent) => {
    endX.current = e.touches[0].clientX

    if (Math.abs(startX.current - endX.current) > 10) {
      isSwiping.current = true
    }
  }

  const onTouchEnd = () => {
    const diff = startX.current - endX.current

    if (Math.abs(diff) < 50) return // игнор мелких движений

    if (diff > 0) {
      // свайп влево → следующий
      next()
    } else {
      // свайп вправо → предыдущий
      prev()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center"
      onClick={() => {
        if (isSwiping.current) return
        router.back()
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <img
          src={currentMeme.previewUrl}
          className="max-h-[90vh]"
        />

        <div className="flex justify-between">
          <button className="text-emerald-400 font-bold text-4xl bg-amber-50 cursor-pointer" onClick={prev}>←</button>
          <button className="text-emerald-400 font-bold text-4xl bg-amber-50  cursor-pointer" onClick={next}>→</button>
        </div>
      </div>
    </div>
  )
}