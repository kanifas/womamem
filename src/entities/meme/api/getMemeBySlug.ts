import { db } from '@/shared/lib/db'
import { meme as memeTable } from '@/db/schema'
import { eq } from 'drizzle-orm'

// string | null vs string | undefined
// Правильное решение (важно)
// НЕ меняй тип под БД
// делай маппинг на уровне API
export const getMemeBySlug = async (slug: string) => {
  const [meme] = await db
    .select()
    .from(memeTable)
    .where(eq(memeTable.slug, slug))

  if (!meme) return null

  return {
    ...meme,
    description: meme.description ?? undefined, // меняем null на undefined
    previewUrl: meme.previewUrl ?? undefined, // меняем null на undefined
  }
}