import styles from '../Upgrades.module.css'
import { getPosts } from "@/utils/contentful-utils"
import { TypeGeneralPagesSkeleton } from "@/contentful/types/contentful-types"
import { Metadata } from "next"
import UpgradesSubFilter from '@/components/UpgradesFilter/UpgradesSubFilter/UpgradesSubFilter'
import ToggleListButton from "@/components/ItemList/ToggleListButton/ToggleListButton"

interface Props {
  children: React.ReactNode
}

export const generateMetadata = async () => {
  const posts = await getPosts<TypeGeneralPagesSkeleton>({ content_type: 'generalPages', 'sys.id': '2ZdhRo4z2RMUnml8ji2bgb' })
  const { title, description } = posts.items[0].fields
  const metadata: Metadata = {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/upgrades/generators`
    },
    twitter: {
      title: title,
      description: description
    }
  }

  return metadata
}

export default function GeneratorLayout({ children }: Props) {
  return (
    <>
      <UpgradesSubFilter />
      <ToggleListButton className={ `${styles.button} ${styles.genButton}` } />
      { children }
    </>
  )
}
