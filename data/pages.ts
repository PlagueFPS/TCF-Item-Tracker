import 'server-only'
import { payloadInstance } from "@/lib/payload"
import { getMedia } from './media'
import { createMediaDTO } from '@/utils/payload-utils'
import { cache } from 'react'


export const getPage = cache(async (slug: string) => {
  const payload = await payloadInstance()
  const page = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug
      }
    }
  })
  const image = page.docs[0].featuredImage

  return {
    title: page.docs[0].title,
    description: page.docs[0].description,
    image: typeof image === 'number' ? await getMedia(image) : createMediaDTO(image)
  }
})