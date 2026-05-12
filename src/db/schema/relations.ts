import { relations } from 'drizzle-orm'

import { meme } from './meme'
import { memeVariant } from './memeVariant'

export const memeRelations = relations(
  meme,
  ({ many }) => ({
    variants: many(memeVariant),
  }),
)

export const memeVariantRelations =
  relations(memeVariant, ({ one }) => ({
    meme: one(meme, {
      fields: [memeVariant.memeId],
      references: [meme.id],
    }),
  }))