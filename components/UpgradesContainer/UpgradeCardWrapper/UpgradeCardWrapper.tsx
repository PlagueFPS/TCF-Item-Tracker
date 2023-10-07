'use client'
import styles from '../UpgradeCard/UpgradeCard.module.css'
import { Quarters, UpgradeCost } from "@/interfaces/Upgrade"
import { Item } from "@/interfaces/Item"
import useToggleOptions from "@/hooks/useToggleOptions"
import UpgradeCardOptions from '../UpgradeCard/UpgradeCardOptions/UpgradeCardOptions'

interface Props {
  children: React.ReactNode
  upgrade: Quarters
  upgrades: Quarters[]
  costs: UpgradeCost[]
  items: Item[]
}

export default function UpgradeCardWrapper({ children, upgrade, upgrades, costs, items }: Props) {
  const { showOptions, toggleOptionsModal } = useToggleOptions()

  return (
    <>
      { showOptions && 
        <UpgradeCardOptions 
          upgrade={ upgrade } 
          upgrades={ upgrades } 
          costs={ costs } 
          items={ items } 
          toggleOptionsModal={ toggleOptionsModal }  
        /> 
      }
      <div className={ styles.container } onClick={ toggleOptionsModal }>
        { children }
      </div>
    </>
  )
}
