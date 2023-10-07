import styles from '../Crafting.module.css'
import { TypeGeneralPagesSkeleton } from "@/contentful/types/contentful-types"
import { getPosts } from "@/utils/contentful-utils"
import { Metadata } from "next"
import getGameData from "@/utils/getGameData"
import { Craft } from "@/interfaces/Craft"
import { compareCraftRarity } from "@/functions/GlobalFunctions"
import CraftingFilter from "@/components/CraftingFilter/CraftingFilter"
import ToggleListButton from "@/components/ItemList/ToggleListButton/ToggleListButton"
import CraftingContainer from "@/components/CraftingContainer/CraftingContainer"

export const generateMetadata = async () => {
  const posts = await getPosts<TypeGeneralPagesSkeleton>({ content_type: 'generalPages', 'sys.id': '55lUGGZf5YWfTuFyxVhFoI' })
  const { title, description } = posts.items[0].fields
  const metadata: Metadata = {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/crafting/attachments`
    },
    twitter: {
      title: title,
      description: description
    }
  }

  return metadata
}

export default async function AttachmentCrafts() {
  const crafts = await getGameData('printing') as Craft[]
  const attachments = crafts.filter(craft => craft.type === 'attachment').sort(compareCraftRarity)

  return (
    <>
      <CraftingFilter />
      <ToggleListButton className={ styles.button } />
      <CraftingContainer crafts={ attachments } />
    </>
  )
}
