import type { Media } from "@/payload-types";
import type { CollectionAfterChangeHook, FieldHook } from "payload";
import { expirePath } from "next/cache";

export const createMediaDTO = (media: Media) => {
  if (!media.url) throw Error('Expected media to have a url')
  return {
    url: media.url,
    alt: media.alt,
    width: media.width,
    height: media.height,
  }
}

export const slugify = (value: string) => 
  value.replace(/ /g, '-').replace(/[^\w-]+/g, '').toLowerCase()

export const formatSlug = (fallback: string): FieldHook => ({ data, operation, originalDoc, value }) => {
  if (typeof value === 'string') return slugify(value)
  if (operation === 'create') {
    const fallbackData = data?.[fallback] || originalDoc?.[fallback]
    
    if (fallbackData && typeof fallbackData === 'string') return slugify(fallbackData)
  }

  return value
}