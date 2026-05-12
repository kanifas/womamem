import { desc, eq } from 'drizzle-orm'

import { db } from '@/shared/lib/db'
import { meme } from '@/db/schema/meme'

export const getMemes = async () => {
  const result = await db.query.meme.findMany({
    where: eq(meme.isActive, true),

    orderBy: (m, { desc }) => [
      desc(m.createdAt),
    ],

    with: {
      // variants: true,
      variants: {
        orderBy: (v, { asc }) => [
          asc(v.sortOrder),
        ],
      },
    },

    limit: 20,
  })

  return result.map((m) => ({
    ...m,

    description: m.description ?? undefined,

    variants: m.variants.map((v) => ({
      ...v,

      thumbnailUrl:
        v.thumbnailUrl ?? undefined,
    })),
  }))
}