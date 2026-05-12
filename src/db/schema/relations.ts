import { relations } from 'drizzle-orm'

import { memes } from './memes'
import { memeVariant } from './memeVariant'

export const memeRelations = relations(
  memes,
  ({ many }) => ({
    variants: many(memeVariant),
  }),
)

export const memeVariantRelations =
  relations(memeVariant, ({ one }) => ({
    meme: one(memes, {
      fields: [memeVariant.memeId],
      references: [memes.id],
    }),
  }))