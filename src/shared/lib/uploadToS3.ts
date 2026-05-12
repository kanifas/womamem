import { PutObjectCommand } from '@aws-sdk/client-s3'
import { s3 } from './s3'

export const uploadToS3 = async ({
  file,
  key,
}: {
  file: File
  key: string
}) => {
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

  // Формат:
  // https://<bucket_name>.s3.cloud.ru/<object_key>
  //  <bucket_name>: Название вашего бакета.
  //  <object_key>: Путь к файлу (например, images/photo.jpg).
  return `${process.env.CLOUD_RU_PUBLIC_BUCKET_URL}/${key}`
}