import { env } from "@/env";
import { revalidatePage } from "@/utils/payload-utils";
import type { CollectionConfig } from "payload";

export const Updates: CollectionConfig = {
  slug: 'updates',
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: `${env.NEXT_PUBLIC_WEBSITE_URL}/updates`,
    }
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      }
    },
    maxPerDoc: 5,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      label: 'Date',
      type: 'date',
      required: true,
    },
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
      required: true,
    }
  ],
  hooks: {
    afterChange: [revalidatePage]
  }
}