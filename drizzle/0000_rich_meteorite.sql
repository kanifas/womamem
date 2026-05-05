CREATE TYPE "public"."theme" AS ENUM('light', 'dark');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"is_anonymous" boolean DEFAULT true,
	"email" text,
	"name" text,
	"avatar_url" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_settings" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"theme" "theme" DEFAULT 'dark' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "comment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"meme_id" uuid,
	"user_id" uuid,
	"parent_id" uuid,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"likes_count" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "reaction" (
	"user_id" uuid,
	"meme_id" uuid,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "reaction_user_id_meme_id_pk" PRIMARY KEY("user_id","meme_id")
);
--> statement-breakpoint
CREATE TABLE "favorite" (
	"user_id" uuid,
	"meme_id" uuid,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "favorite_user_id_meme_id_pk" PRIMARY KEY("user_id","meme_id")
);
--> statement-breakpoint
CREATE TABLE "meme" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"views_count" integer DEFAULT 0 NOT NULL,
	"likes_count" integer DEFAULT 0 NOT NULL,
	"comments_count" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_meme_id_meme_id_fk" FOREIGN KEY ("meme_id") REFERENCES "public"."meme"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_meme_id_meme_id_fk" FOREIGN KEY ("meme_id") REFERENCES "public"."meme"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_meme_id_meme_id_fk" FOREIGN KEY ("meme_id") REFERENCES "public"."meme"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "meme_slug_idx" ON "meme" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "meme_created_at_idx" ON "meme" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "meme_likes_idx" ON "meme" USING btree ("likes_count");--> statement-breakpoint
CREATE INDEX "meme_active_idx" ON "meme" USING btree ("is_active");