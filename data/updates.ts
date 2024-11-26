import { payloadInstance } from "@/lib/payload";
import { cache } from "react";

export const getUpdates = cache(async () => {
  const payload = await payloadInstance()
  const updates = await payload.find({
    collection: 'updates',  
  })

  return updates.docs.map(update => ({
    id: update.id,
    title: update.title,
    date: update.date,
    content: update.content
  }))
})