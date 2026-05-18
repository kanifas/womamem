import {
  MemeVariantFormat,
  MemeVariantStyle,
  MemeVariantRole,
} from "@/entities"

export type VariantDraft = {
  id: string

  file?: File
  fileUrl: string

  posterFile?: File
  posterUrl?: string
  thumbnailUrl?: string

  style: MemeVariantStyle

  format: MemeVariantFormat

  role: MemeVariantRole

  sortOrder: number
}