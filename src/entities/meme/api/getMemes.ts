import { eq, desc } from 'drizzle-orm'
import { db } from '@/shared/lib/db'
import { memes } from '@/db/schema'

export const getMemes = async () => {
  const result = await db
    .select()
    .from(memes)
    .where(eq(memes.isActive, true))
    .orderBy(desc(memes.createdAt))
    .limit(20)

  return result.map((meme) => ({
    ...meme,
    description: meme.description ?? undefined,
    previewUrl: meme.previewUrl ?? undefined,
    }))
}