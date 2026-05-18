CREATE TABLE "meme_variant" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"meme_id" uuid NOT NULL,
	"style" text NOT NULL,
	"format" text NOT NULL,
	"role" text DEFAULT 'content' NOT NULL,
	"file_url" text NOT NULL,
	"thumbnail_url" text,
	"poster_url" text,
	"width" integer,
	"height" integer,
	"duration" integer,
	"fps" integer,
	"sizeKb" integer,
	"mimeType" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" RENAME TO "user";--> statement-breakpoint
ALTER TABLE "user_settings" DROP CONSTRAINT "user_settings_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "comment" DROP CONSTRAINT "comment_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "reaction" DROP CONSTRAINT "reaction_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "favorite" DROP CONSTRAINT "favorite_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "meme" ADD COLUMN "preview_variant_id" uuid;--> statement-breakpoint
ALTER TABLE "meme_variant" ADD CONSTRAINT "meme_variant_meme_id_meme_id_fk" FOREIGN KEY ("meme_id") REFERENCES "public"."meme"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;