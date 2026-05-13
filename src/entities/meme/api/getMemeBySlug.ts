import { db } from '@/shared/lib/db'
import { meme as memeTable } from '@/db/schema'
import { eq } from 'drizzle-orm'

// string | null vs string | undefined
// Правильное решение (важно)
// НЕ меняй тип под БД
// делай маппинг на уровне API
export const getMemeBySlug = async (slug: string) => {
  const result = await db.query.meme.findFirst({
    where: eq(memeTable.slug, slug),

    with: {
      variants: {
        orderBy: (v, { asc }) => [
          asc(v.sortOrder),
        ],
      },
    },
  })

  if (!result) return null

  return {
    ...result,

    description:
      result.description ?? undefined,

    previewUrl:
      result.previewUrl ?? undefined,

    previewVariantId:
      result.previewVariantId ?? undefined,

    variants: result.variants.map((v) => ({
      ...v,

      thumbnailUrl:
        v.thumbnailUrl ?? undefined,

      width: v.width ?? undefined,

      height: v.height ?? undefined,
    })),
  }
}