import { pgTable, uuid, pgEnum } from 'drizzle-orm/pg-core';
import { user } from './user';

export const themeEnum = pgEnum('theme', ['light', 'dark']);

export const userSettings = pgTable('user_settings', {
  userId: uuid('user_id').primaryKey().references(() => user.id),
  theme: themeEnum('theme').notNull().default('dark'),
});