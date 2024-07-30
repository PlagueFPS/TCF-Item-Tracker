import { getGameData } from "@/data/data"
import { Quarters } from '@/interfaces/Upgrade'
import UpgradesContainer from '@/components/UpgradesContainer/UpgradesContainer'

export default async function SupplyCrateGenerators() {
  const upgrades = await getGameData('personalQuarters') as Quarters[]
  const nodes = upgrades.filter(upgrade => 'upgradeAmount' in upgrade)
  const supplyCrateNodes = nodes.filter(node => node.inGameName.includes('Supply Crate'))

  return <UpgradesContainer upgrades={ supplyCrateNodes } />
}
