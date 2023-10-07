import styles from './Crafting.module.css'
import { getPosts } from "@/utils/contentful-utils"
import { TypeGeneralPagesSkeleton } from "@/contentful/types/contentful-types"
import { Metadata } from "next"
import getGameData from "@/utils/getGameData"
import { Craft } from "@/interfaces/Craft"
import { compareCraftRarity } from "@/functions/GlobalFunctions"
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
      title: title,
      description: description,
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/crafting`
    },
    twitter: {
      title: title,
      description: description,
    }
  }

  return metadata
}

export default async function UtilityCrafts() {
  const crafts = await getGameData('printing') as Craft[]
  const utilities = crafts.filter(craft => craft.type === 'questItem' || craft.type === 'backpack').sort(compareCraftRarity)

  return (
    <>
      <CraftingFilter />
      <ToggleListButton className={ styles.button } />
      <CraftingContainer crafts={ utilities } />
    </>
  )
}
