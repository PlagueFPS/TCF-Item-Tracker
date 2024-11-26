import styles from './Forge.module.css'
import { Metadata } from "next"
import ToggleListButton from '@/components/ItemList/ToggleListButton/ToggleListButton'
import ForgeContainer from '@/components/ForgeContainer/ForgeContainer'
import { getPage } from '@/data/pages'

export const generateMetadata = async () => {
  const page = await getPage('forge')
  const { title, description } = page
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
