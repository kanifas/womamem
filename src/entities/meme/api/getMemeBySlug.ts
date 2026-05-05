import { db } from '@/shared/lib/db'
import { memes } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const getMemeBySlug = async (slug: string) => {
  const [meme] = await db
    .select()
    .from(memes)
    .where(eq(memes.slug, slug))

  return meme
}