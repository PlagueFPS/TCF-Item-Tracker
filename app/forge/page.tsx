import styles from './Forge.module.css'
import { getPosts } from "@/utils/contentful-utils"
import { TypeGeneralPagesSkeleton } from "@/contentful/types/contentful-types"
import { Metadata } from "next"
import ToggleListButton from '@/components/ItemList/ToggleListButton/ToggleListButton'
import ForgeContainer from '@/components/ForgeContainer/ForgeContainer'

export const generateMetadata = async () => {
  const posts = await getPosts<TypeGeneralPagesSkeleton>({ content_type: 'generalPages', 'sys.id': '1A0wz6dya7v7lhuLmg2y5S' })
  const { title, description } = posts.items[0].fields
  const metadata: Metadata = {
    title: title,
    description: description,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/forge`,
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

export default function ForgePerks() {
  return (
    <>
      <ToggleListButton className={ styles.button } />
      <ForgeContainer />
    </>
  )
}
