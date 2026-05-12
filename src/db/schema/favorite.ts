import { pgTable, primaryKey, timestamp, uuid } from 'drizzle-orm/pg-core';
import { user } from './user';
import { meme } from './meme';

export const favorite = pgTable('favorite', {
  userId: uuid('user_id').references(() => user.id),
  memeId: uuid('meme_id').references(() => meme.id),

  createdAt: timestamp('created_at').defaultNow(),
}, (t) => ({
  pk: primaryKey(t.userId, t.memeId),
}));