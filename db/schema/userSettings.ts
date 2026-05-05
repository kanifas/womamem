import { pgTable, uuid, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './users';

export const themeEnum = pgEnum('theme', ['light', 'dark']);

export const userSettings = pgTable('user_settings', {
  userId: uuid('user_id').primaryKey().references(() => users.id),
  theme: themeEnum('theme').notNull().default('dark'),
});