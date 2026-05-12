import { PutObjectCommand } from '@aws-sdk/client-s3'

import { s3 } from './s3'

export const uploadToS3 = async (
  file: File,
  key: string,
) => {
  const buffer = Buffer.from(
    await file.arrayBuffer(),
  )

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,

      Key: key,

      Body: buffer,

      ContentType: file.type,
    }),
  )

  // Стандартный формат URL (Virtual-hosted style): https://<bucket-name>.s3.<region>.cloud.ru/<object-key>
  // Основные компоненты:
  //   https://: Безопасный протокол доступа.
  //   <bucket-name>: Имя вашего бакета в Cloud.ru.s3.
  //   <region>.cloud.ru: Эндпоинт S3-хранилища (зависит от региона, например, s3.example-region.cloud.ru).
  //   <object-key>: Путь к файлу внутри бакета (например, images/photo.jpg).
  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.cloud.ru/${key}`

  // S3_ENDPOINT=https://s3.cloud.ru/womem-ru
  // S3_REGION=ru-central-1
  // S3_ACCESS_KEY_ID=de0a095a015b374f2a402ba1bb7cc646
  // S3_SECRET_ACCESS_KEY=fe8f01f9c061431321f0e307f6685e7b
  // S3_BUCKET_NAME=womem-ru

  // return `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET_NAME}/${key}`
}