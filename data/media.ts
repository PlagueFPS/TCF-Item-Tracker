import { payloadInstance } from "@/lib/payload";
import { createMediaDTO } from "@/utils/payload-utils";

export const getMedia = async (id: number) => {
  const payload = await payloadInstance()
  const media = await payload.findByID({
    collection: 'media',
    id
  })

  return createMediaDTO(media)
}