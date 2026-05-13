'use server'

import { eq } from 'drizzle-orm'
import { db } from '@/shared/lib/db'
import { meme } from '@/db/schema/meme'
import { memeVariant } from '@/db/schema/memeVariant'
import { uploadToS3 } from '@/shared/lib/uploadToS3'

type Input = {
  title: string
  slug: string
  description?: string

  variants: {
    file: File
    style: string
    format: string
    role: string
  }[]
}

export const createMemeAction = async (input: Input) => {
  try {
    const inserted = await db
    .insert(meme)
    .values({
      title: input.title,
      slug: input.slug,
      description: input.description,
    })
    .returning()

    const createdMeme = inserted[0]
    const insertedVariants = []
    for (let i = 0; i < input.variants.length; i++) {
      const variant = input.variants[i]

      const extension = variant.file.name.split('.').pop()

      const key = `${process.env.CLOUD_RU_BUCKET_FOLDER_PATH}/${createdMeme.id}/${crypto.randomUUID()}.${extension}`

      const fileUrl = await uploadToS3({
        file: variant.file,
        key,
      })

      console.log(fileUrl)
      const insertedVariant = await db
        .insert(memeVariant)
        .values({
          memeId: createdMeme.id,

          style: variant.style,
          format: variant.format,
          role: variant.role,

          fileUrl,

          sortOrder: i,
        })
        .returning()

      insertedVariants.push(insertedVariant[0])
    }

    if (insertedVariants.length > 0) {
      const firstVariant = insertedVariants[0]

      await db
        .update(meme)
        .set({
          previewUrl:
            firstVariant.fileUrl,

          previewVariantId:
            firstVariant.id,
        })
        .where(
          eq(meme.id, createdMeme.id),
        )
    }

    return { success: true }
  } catch(error) {
    return { error }
  }
}