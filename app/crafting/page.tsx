import styles from './Crafting.module.css'
import { getPosts } from "@/utils/contentful-utils"
import { TypeGeneralPagesSkeleton } from "@/contentful/types/contentful-types"
import { Metadata } from "next"
import CraftingFilter from '@/components/CraftingFilter/CraftingFilter'
import ToggleListButton from "@/components/ItemList/ToggleListButton/ToggleListButton"
import CraftingContainer from '@/components/CraftingContainer/CraftingContainer'

export const generateMetadata = async () => {
  const posts = await getPosts<TypeGeneralPagesSkeleton>({ content_type: 'generalPages', 'sys.id': '1ye0YbJZKCSCTP1Eyh7Exk' })
  const { title, description } = posts.items[0].fields
  const metadata: Metadata = {
    title: title,
    description: description,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/crafting`,
      siteName: 'The Cycle: Frontier Items Tracker',
      type: 'website',
      title: title,
      description: description,
      images: [{
        url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/images/favicon.png`,
      }]
    },
    twitter: {
      title: title,
      description: description,
    }
  }

  return metadata
}

export default function UtilityCrafts() {
  return (
    <>
      <CraftingFilter />
      <ToggleListButton className={ styles.button } />
      <CraftingContainer craftType='questItem' />
    </>
  )
}
