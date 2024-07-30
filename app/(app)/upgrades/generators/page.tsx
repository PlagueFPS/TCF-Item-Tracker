import { getGameData } from "@/data/data"
import { Quarters } from '@/interfaces/Upgrade'
import UpgradesContainer from '@/components/UpgradesContainer/UpgradesContainer'

export default async function KmarksGenerators() {
  const upgrades = await getGameData('personalQuarters') as Quarters[]
  const nodes = upgrades.filter(upgrade => 'upgradeAmount' in upgrade)
  const kmarksNodes = nodes.filter(node => node.inGameName.includes('K-Marks'))

  return <UpgradesContainer upgrades={ kmarksNodes } />
}
