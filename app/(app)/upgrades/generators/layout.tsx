import styles from '../Upgrades.module.css'
import { Metadata } from "next"
import UpgradesFilter from '@/components/UpgradesFilter/UpgradesFilter'
import UpgradesSubFilter from '@/components/UpgradesFilter/UpgradesSubFilter/UpgradesSubFilter'
import ToggleListButton from "@/components/ItemList/ToggleListButton/ToggleListButton"
import { getPage } from '@/data/pages'

interface Props {
  children: React.ReactNode
}

export const generateMetadata = async () => {
  const page = await getPage('generators')
  const { title, description } = page
  const metadata: Metadata = {
    title: title,
    description: description,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/upgrades/generators`,
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

export default function GeneratorLayout({ children }: Props) {
  return (
    <>
      <UpgradesFilter />
      <UpgradesSubFilter />
      <ToggleListButton className={ `${styles.button} ${styles.genButton}` } />
      { children }
    </>
  )
}
