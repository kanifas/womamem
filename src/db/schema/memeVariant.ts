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

  style: text('style').notNull(), // 'original' 'sketch' 'pixel-art' 'animated' 'sticker' 'ai'

  format: text('format').notNull(), // 'image' 'video' 'gif' 'webp' 'apng'

  role: text('role').notNull().default('content'), // 'content' 'preview' 'sticker'

  fileUrl: text('file_url').notNull(),

  thumbnailUrl: text('thumbnail_url'),

  width: integer('width'),
  height: integer('height'),

  /*
  Потому что потом:
    compression
    transcoding
    adaptive delivery
    analytics
  */
  duration: integer('duration'),
  fps: integer('fps'),
  sizeKb: integer('sizeKb'),
  mimeType: text('mimeType'),

  sortOrder: integer('sort_order')
    .notNull()
    .default(0),

  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),
})