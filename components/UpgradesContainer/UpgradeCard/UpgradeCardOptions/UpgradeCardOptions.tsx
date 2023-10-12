import styles from './UpgradeCardOptions.module.css'
import { Quarters, UpgradeCost } from "@/interfaces/Upgrade"
import { Item } from "@/interfaces/Item"
import { useState, useEffect } from 'react'
import useButtonOptions from '@/hooks/useButtonOptions'
import useCycleState from '@/hooks/useCycleState'
import useLargeScreen from '@/hooks/useLargeScreen'
import { getCosts, getItemImage } from '@/utils/GameUtils'
import { FaAngleDown, FaAngleLeft, FaAngleRight, FaAngleUp } from 'react-icons/fa6'
import CopyButton from '@/components/CopyButton/CopyButton'
import Link from 'next/link'

interface Props {
  upgrade: Quarters
  upgrades: Quarters[]
  costs: UpgradeCost[]
  items: Item[]
  toggleOptionsModal: () => void
}

interface optionCost extends UpgradeCost {
  image?: string
}

export default function UpgradeCardOptions({ upgrade, upgrades, costs, items, toggleOptionsModal }: Props) {
  const [currentUpgrade, setCurrentUpgrade] = useState(upgrade)
  const [currentCosts, setCurrentCosts] = useState<optionCost[]>(costs)
  const { closing, handleAddButtonClick, handleCloseButtonClick } = useButtonOptions(currentCosts, toggleOptionsModal, items)
  const { cyclePrevState, cycleNextState } = useCycleState<Quarters>(upgrades, currentUpgrade, setCurrentUpgrade)
  const { largeScreen } = useLargeScreen()

  useEffect(() => {
    const getCurrentCosts = async () => {
      const rawCosts = await getCosts(currentUpgrade.costs)
      const costs = await Promise.all(rawCosts.map(async (cost: optionCost) => {
        const itemImage = await getItemImage(cost.item)
        return {...cost, image: itemImage}
      }))
      setCurrentCosts(costs)
    }

    getCurrentCosts()
  }, [currentUpgrade])

  return (
    <div className={ styles.container }>
      <div className={ styles.blur } />
      <div className={ closing ? `${styles.contentContainer} ${styles.closing}` : styles.contentContainer }>
        <CopyButton className={ styles.copy } title='Copy Link To Upgrade' link={ `/upgrades/${currentUpgrade.inGameName.replace(/\s/g, '')}` } />
        <button className={ styles.prevBtn } onClick={ cyclePrevState }>
         { largeScreen ? <FaAngleLeft /> : <FaAngleUp /> }
        </button>
        <button className={ styles.nextBtn } onClick={ cycleNextState }>
          { largeScreen ? <FaAngleRight /> : <FaAngleDown /> }
        </button>
        <div className={ styles.titleContainer }>
          <h2 className={ styles.title }>{ currentUpgrade.inGameName }</h2>
        </div>
        <div className={ styles.descriptionContainer }>
          <p className={ styles.description }>{ currentCosts.length > 1 ? "Items Needed for Upgrade:" : "No Items Needed" }</p>
        </div>
        <div className={ styles.costsContainer }>
          { currentCosts.map((cost, index) => {
            if (cost.item !== 'Kmarks') {
              return (
                <div className={ styles.cost } key={ `${cost.item}_${index}` }>
                  <picture>
                    <source srcSet={ `${cost.image}.avif` } type='image/avif' />
                    <source srcSet={ `${cost.image}.webp` } type='image/webp' />
                    <source srcSet={ `${cost.image}.png` } type='image/png' />
                    <img 
                      src={ `${cost.image}.png` }
                      alt={ cost.item } 
                      className={ `${styles.costImage } ${ cost.item.toLowerCase().replace(/\s/g, '') }` }
                      title={ cost.item }
                    />
                  </picture>
                  <p className={ styles.costAmount }>{ cost.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") }</p>
                </div>
              )
            }
          })}
        </div>
        <div className={ styles.btnContainer }>
          <button className={ styles.yesBtn } onClick={ handleAddButtonClick }>
            <span className={ styles.yesText }>Add Items to List</span>
          </button>
          <button className={ styles.noBtn } onClick={ handleCloseButtonClick }>
            <span className={ styles.noText }>Close</span>
          </button>
        </div>
        <Link href={ `/upgrades/${currentUpgrade.inGameName.replace(/\s/g, '')}` } className={ styles.link }>
          <p className={ styles.linkText }>View Upgrade Details</p>
        </Link>
      </div>
    </div>
  )
}
