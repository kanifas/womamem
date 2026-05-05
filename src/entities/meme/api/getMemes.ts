import { eq, desc } from 'drizzle-orm'
import { db } from '@/shared/lib/db'
import { memes } from '@/db/schema'
import { TMeme } from '@/entities'

export const getMemes = async () => {
  return db
    .select()
    .from(memes)
    .where(eq(memes.isActive, true))
    .orderBy(desc(memes.createdAt))
    .limit(20)
}