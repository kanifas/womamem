import { pgTable, text, integer, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';
import { memes } from './memes';

export const comments = pgTable('comment', {
  id: uuid('id').defaultRandom().primaryKey(),

  memeId: uuid('meme_id').references(() => memes.id),
  userId: uuid('user_id').references(() => users.id),

  parentId: uuid('parent_id'),

  text: text('text').notNull(),
  createdAt: timestamp('created_at').defaultNow(),

  likesCount: integer('likes_count').default(0),
});