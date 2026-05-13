import { MemeVariantFormat } from '@/entities';

export const getFileFormat = (file: File): MemeVariantFormat => {
  const type = file.type

  if (type.startsWith('video/')) {
    return 'video'
  }

  if (type.includes('gif')) {
    return 'gif'
  }

  if (type.includes('webp')) {
    return 'webp'
  }

  if (type.includes('png')) {
    return 'apng'
  }

  return 'image'
}