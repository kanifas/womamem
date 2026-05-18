import {
  desc,
  eq,
  lt,
  and,
} from 'drizzle-orm'

import { db } from '@/shared/lib/db'
import { meme } from '@/db/schema/meme'

import {
  TMeme,
  MemeVariantFormat,
  MemeVariantStyle,
  MemeVariantRole,
} from '@/entities'

type Params = {
  cursor?: string
  limit?: number
}

type GetMemesResult = {
  items: TMeme[]
  nextCursor: string | null
}

export const getMemes = async ({ cursor, limit = 20 }: Params): Promise<GetMemesResult> => {
  const result = await db.query.meme.findMany({
    where: and(
      eq(meme.isActive, true),

      cursor
        ? lt(meme.createdAt, new Date(cursor))
        : undefined,
    ),

    orderBy: (m, { desc }) => [
      desc(m.createdAt),
    ],

    with: {
      variants: {
        orderBy: (v, { asc }) => [
          asc(v.sortOrder),
        ],
      },
    },

    limit: limit + 1,
  })

  const hasMore = result.length > limit

  const sliced = hasMore
    ? result.slice(0, limit)
    : result

  const items = sliced.map((m) => ({
    ...m,

    description: m.description ?? undefined,

    variants: m.variants.map((v) => ({
      ...v,
      format: v.format as MemeVariantFormat,
      style: v.style as MemeVariantStyle,
      role: v.role as MemeVariantRole,
      thumbnailUrl: v.thumbnailUrl ?? undefined,
      posterUrl: v.posterUrl ?? undefined,
      width: v.width ?? undefined,
      height: v.height ?? undefined,
      fps: v.fps ?? undefined,
      duration: v.duration ?? undefined,
    })),
  }))

  const nextCursor = hasMore
    ? sliced[sliced.length - 1]?.createdAt.toISOString()
    : null

  return {
    items,
    nextCursor
  }
}