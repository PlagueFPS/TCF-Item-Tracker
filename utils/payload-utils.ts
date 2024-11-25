import { env } from "@/env";
import type { Media } from "@/payload-types";

export const createMediaDTO = (media: Media) => {
  if (!media._key) throw Error('Expected media to have a key')
  return {
    url: `https://utfs.io/a/${env.UPLOADTHING_APP_ID}/${media._key}`,
    alt: media.alt,
    width: media.width,
    height: media.height,
  }
}