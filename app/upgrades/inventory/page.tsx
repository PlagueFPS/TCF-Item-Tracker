import styles from '../Upgrades.module.css'
import { getPosts } from "@/utils/contentful-utils"
import { TypeGeneralPagesSkeleton } from "@/contentful/types/contentful-types"
import { Metadata } from "next"
import { Quarters } from "@/interfaces/Upgrade"
import getGameData from "@/utils/getGameData"
import ToggleListButton from "@/components/ItemList/ToggleListButton/ToggleListButton"
import UpgradesContainer from "@/components/UpgradesContainer/UpgradesContainer"

export const generateMetadata = async () => {
  const posts = await getPosts<TypeGeneralPagesSkeleton>({ content_type: 'generalPages', 'sys.id': '7JuBPVi0jLeveFfymgNySh' })
  const { title, description } = posts.items[0].fields
  const metadata: Metadata = {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/upgrades/inventory`
    },
    twitter: {
      title: title,
      description: description
    }
  }

  return metadata
}

export default async function Inventory() {
  const upgrades = await getGameData('personalQuarters') as Quarters[]
  const nodes = upgrades.filter(upgrade => 'upgradeAmount' in upgrade)
  const inventoryNodes = nodes.filter(node => node.inGameName.includes('Increase'))

  return (
    <>
      <ToggleListButton className={ styles.button } />
      <UpgradesContainer upgrades={ inventoryNodes } />
    </>
  )
}
