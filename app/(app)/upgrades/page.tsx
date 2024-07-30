import styles from './Upgrades.module.css'
import { Quarters } from "@/interfaces/Upgrade"
import { getGameData } from "@/data/data"
import UpgradesFilter from '@/components/UpgradesFilter/UpgradesFilter'
import ToggleListButton from "@/components/ItemList/ToggleListButton/ToggleListButton"
import UpgradesContainer from '@/components/UpgradesContainer/UpgradesContainer'


export default async function QuarterUpgrades() {
  const upgrades = await getGameData('personalQuarters') as Quarters[]
  const levels = upgrades.filter(upgrade => 'level' in upgrade)

  return (
    <>
      <UpgradesFilter />
      <ToggleListButton className={ styles.button } />
      <UpgradesContainer upgrades={ levels } />
    </>
  )
}
