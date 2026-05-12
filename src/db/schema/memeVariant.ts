import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

import { meme } from './meme'

export const memeVariant = pgTable('meme_variant', {
  id: uuid('id').defaultRandom().primaryKey(),

  memeId: uuid('meme_id')
    .notNull()
    .references(() => meme.id, {
      onDelete: 'cascade',
    }),

  type: text('type').notNull(),
  // image | video | sketch | pixel | gif

  fileUrl: text('file_url').notNull(),

  thumbnailUrl: text('thumbnail_url'),

  width: integer('width'),
  height: integer('height'),

  sortOrder: integer('sort_order')
    .notNull()
    .default(0),

  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),
})