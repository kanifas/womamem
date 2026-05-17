'use client'
import { FC, useState } from 'react'

import { VirtuosoGrid } from 'react-virtuoso'
import { type TMeme, MemeCard } from '@/entities'
import { FeedSkeleton } from './FeedSkeleton'

type Props = {
  initialItems: TMeme[]
  initialCursor: string | null
}

export const FeedGrid: FC<Props> = ({
  initialItems,
  initialCursor
}) => {
  const [items, setItems] = useState(initialItems)
  const [nextCursor, setNextCursor] = useState(initialCursor)
  const [loading, setLoading] = useState(false)

  const loadMore = async () => {
    if (loading) return
    if (!nextCursor) return

    setLoading(true)

    try {
      const response = await fetch(`/api/memes?cursor=${nextCursor}`)
      const data = await response.json()

      setItems((prev) => {
        const merged = [
          ...prev,
          ...data.items,
        ]

        return Array.from(
          new Map(
            merged.map((meme) => [
              meme.id,
              meme,
            ])
          ).values()
        )
      })

      setNextCursor(data.nextCursor)
    } finally {
      setLoading(false)
    }
  }

  return (
    <VirtuosoGrid
      useWindowScroll
      totalCount={items.length}
      overscan={6}
      increaseViewportBy={800}
      endReached={loadMore}
      itemContent={(index) => {
        const meme = items[index]
        return (
          <MemeCard meme={meme} />
        )
      }}

      listClassName="
        grid
        grid-cols-1

        gap-3
        px-2
        pb-24

        sm:grid-cols-2
        sm:px-3

        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-5
      "

      components={{
        Footer: () =>
          loading
            ? <FeedSkeleton />
            : null,
      }}
    />
  )
}