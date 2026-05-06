import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core'

// если используешь relations
// import { relations } from 'drizzle-orm'

// ---- TABLE ----

export const memes = pgTable(
  'meme',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    title: text('title').notNull(),

    slug: text('slug').notNull(),

    description: text('description'),

    previewUrl: text('preview_url'),

    createdAt: timestamp('created_at').defaultNow().notNull(),

    // денормализованные счётчики (важно для перфоманса)
    viewsCount: integer('views_count').default(0).notNull(),
    likesCount: integer('likes_count').default(0).notNull(),
    commentsCount: integer('comments_count').default(0).notNull(),

    isActive: boolean('is_active').default(true).notNull(),
  },
  (t) => ({
    slugIdx: uniqueIndex('meme_slug_idx').on(t.slug),

    createdAtIdx: index('meme_created_at_idx').on(t.createdAt),

    likesIdx: index('meme_likes_idx').on(t.likesCount),

    activeIdx: index('meme_active_idx').on(t.isActive),
  })
)