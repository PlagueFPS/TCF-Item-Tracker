// import { payloadInstance } from "./lib/payload"

// const chunkArray = <T>(arr: T[], size: number): T[][] => {
//   return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => 
//     arr.slice(i * size, i * size + size))
// }

// (async () => {
//   const payload = await payloadInstance()
//   const pagesData = pages
//   const updatesData = updates
//   payload.logger.info('migrating pages data...')
//   const pageChunks = chunkArray(pagesData, 9)
//   for (const chunk of pageChunks) {
//     await Promise.all(chunk.map(async page => {
//       await payload.create({
//         collection: 'pages',
//         data: {
//           id: page.id,
//           description: page.description,
//           featuredImage: page.featured_image_id,
//           slug: page.slug,
//           title: page.title,
//           content: page.content as any,
//           createdAt: page.created_at,
//           updatedAt: page.updated_at
//         },
//       })
//     }))
//     payload.logger.info(`Migrated chunk of ${chunk.length} pages`)
//   }
//   payload.logger.info('migrating updates data')
//   const updateChunks = chunkArray(updatesData, 9)
//   for (const chunk of updateChunks) {
//     await Promise.all(chunk.map(async update => {
//       await payload.create({
//         collection: 'updates',
//         data: {
//           id: update.id,
//           content: update.content as any,
//           date: update.date,
//           title: update.title,
//           createdAt: update.created_at,
//           updatedAt: update.updated_at
//         }
//       })
//     }))
//     payload.logger.info(`Migrated chunk of ${chunk.length} updates`)
//   }

//   payload.logger.info('All Data Migrated Sucessfully.')
// })()