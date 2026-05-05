import { pgTable, primaryKey, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';
import { memes } from './memes';

export const reactions = pgTable('reaction', {
  userId: uuid('user_id').references(() => users.id),
  memeId: uuid('meme_id').references(() => memes.id),

  createdAt: timestamp('created_at').defaultNow(),
}, (t) => ({
  pk: primaryKey(t.userId, t.memeId),
}));