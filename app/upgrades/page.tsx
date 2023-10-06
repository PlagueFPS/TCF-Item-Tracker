import styles from './Upgrades.module.css'
import { Quarters } from "@/interfaces/Upgrade"
import getGameData from "@/utils/getGameData"
import ToggleListButton from "@/components/ItemList/ToggleListButton/ToggleListButton"
import UpgradesContainer from '@/components/UpgradesContainer/UpgradesContainer'


export default async function QuarterUpgrades() {
  const upgrades = await getGameData('personalQuarters') as Quarters[]

  return (
    <>
      <ToggleListButton className={ styles.button } />
      <UpgradesContainer upgrades={ upgrades } />
    </>
  )
}
