import styles from '../Crafting.module.css'
import { TypeGeneralPagesSkeleton } from "@/contentful/types/contentful-types"
import { getPosts } from "@/utils/contentful-utils"
import { Metadata } from "next"
import CraftingFilter from "@/components/CraftingFilter/CraftingFilter"
import ToggleListButton from "@/components/ItemList/ToggleListButton/ToggleListButton"
import CraftingContainer from "@/components/CraftingContainer/CraftingContainer"

export const generateMetadata = async () => {
  const posts = await getPosts<TypeGeneralPagesSkeleton>({ content_type: 'generalPages', 'sys.id': '38Ype1USYKQce94ne5fvFb' })
  const { title, description } = posts.items[0].fields
  const metadata: Metadata = {
    title: title,
    description: description,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/crafting/weapons`,
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

export default function WeaponCrafts() {
  return (
    <>
      <CraftingFilter />
      <ToggleListButton className={ styles.button } />
      <CraftingContainer craftType='weapon' />
    </>
  )
}
