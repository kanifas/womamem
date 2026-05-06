'use client'

import { FC, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useMemeViewerStore } from '@/widgets/meme-viewer/model/store'
import { TMeme } from '@/entities'

type Props = {
  initialSlug: string
  memes: TMeme[]
}

export const MemeModalClient: FC<Props> = ({ initialSlug, memes }) => {
  const router = useRouter()

  const {
    setMemes,
    openBySlug,
    // memes: storeMemes,
    // _currentIndex,
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

  const meme = getCurrentMem()

   // if (!meme) return null
  useEffect(() => {
    router.replace(`/meme/${meme.slug}`)
  }, [meme, router])

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

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'Escape') router.back()
    }
    window.addEventListener('keydown', handler)

    return () => window.removeEventListener('keydown', handler)
  }, [meme, next, prev, router])

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
  }, [meme, getNextMem, getPrevMem])

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center"
      onClick={() => router.back()}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <img
          src={meme.previewUrl}
          className="max-h-[90vh]"
        />

        <div className="flex justify-between mt-4">
          <button onClick={prev}>←</button>
          <button onClick={next}>→</button>
        </div>
      </div>
    </div>
  )
}