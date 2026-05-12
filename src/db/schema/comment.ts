import { pgTable, text, integer, timestamp, uuid } from 'drizzle-orm/pg-core';
import { user } from './user';
import { meme } from './meme';

export const comment = pgTable('comment', {
  id: uuid('id').defaultRandom().primaryKey(),

  memeId: uuid('meme_id').references(() => meme.id),
  userId: uuid('user_id').references(() => user.id),

  parentId: uuid('parent_id'),

  text: text('text').notNull(),
  createdAt: timestamp('created_at').defaultNow(),

  likesCount: integer('likes_count').default(0),
});