import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'description',
      type: 'text',
    }
  ],
  upload: {
    staticDir: '/public/images',
  },
}