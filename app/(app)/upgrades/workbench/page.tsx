import styles from '../Upgrades.module.css'
import { Metadata } from "next"
import { Quarters } from "@/interfaces/Upgrade"
import { getGameData } from "@/data/data"
import UpgradesFilter from '@/components/UpgradesFilter/UpgradesFilter'
import ToggleListButton from "@/components/ItemList/ToggleListButton/ToggleListButton"
import UpgradesContainer from "@/components/UpgradesContainer/UpgradesContainer"
import { getPage } from '@/data/data'

export const generateMetadata = async () => {
  const page = await getPage('upgrades-workbench')
  const { title, description } = page.docs[0]
  const metadata: Metadata = {
    title: title,
    description: description,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/upgrades/workbench`,
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

export default async function Workbench() {
  const upgrades = await getGameData('personalQuarters') as Quarters[]
  const nodes = upgrades.filter(upgrade => 'upgradeAmount' in upgrade)
  const workbenchNodes = nodes.filter(node => node.inGameName.includes('Reduce PQ Upgrade Time'))

  return (
    <>
      <UpgradesFilter />
      <ToggleListButton className={ styles.button } />
      <UpgradesContainer upgrades={ workbenchNodes } />
    </>
  )
}
