import { getGameData } from "@/data/data"
import { Quarters } from '@/interfaces/Upgrade'
import UpgradesContainer from '@/components/UpgradesContainer/UpgradesContainer'

export default async function AurumGenerators() {
  const upgrades = await getGameData('personalQuarters') as Quarters[]
  const nodes = upgrades.filter(upgrade => 'upgradeAmount' in upgrade)
  const aurumNodes = nodes.filter(node => node.inGameName.includes('Aurum'))

  return <UpgradesContainer upgrades={ aurumNodes } />
}
