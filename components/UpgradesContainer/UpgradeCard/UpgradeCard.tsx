import styles from './UpgradeCard.module.css'
import { Quarters } from "@/interfaces/Upgrade"
import { getCosts, getItemImage } from "@/utils/GameUtils"
import { dataTimes } from '@/functions/GlobalFunctions'

interface Props {
  upgrade: Quarters
}

export default async function UpgradeCard({ upgrade }: Props) {
  const costs = await getCosts(upgrade.costs)
  return (
    <>
      <div className={ styles.titleContainer }>
        <h2 className={ styles.title }>{ upgrade.inGameName }</h2>
      </div>
      { 'upgradesRequired' in upgrade &&
        <div className={ styles.upgradesRequired_Container }>
          <p className={ styles.upgradesRequiredText }>Upgrade Required:</p>
          <p className={ styles.upgradesRequired }>{ upgrade.upgradesRequired }</p>
        </div>
      }
      { 'upgradeAmount' in upgrade && 
        <div className={ styles.upgradeAmount_Container }>
          <p className={ styles.upgradeAmountText }>Upgrade Amount:</p>
          <p className={ styles.upgradeAmount }>{ upgrade.upgradeAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") }</p>
        </div>
      }
      <div className={ styles.upgradeTime_Container }>
        <p className={ styles.upgradeTimeText }>Upgrade Time:</p>
        <p className={ styles.upgradeTime }>{ dataTimes(upgrade.upgradeTime) }</p>
      </div>
      <div className={ styles.upgradeCosts_Container }>
        { await Promise.all(costs.map(async (cost, index) => (
          <div key={ `${cost.item}_${index}` } className={ styles.upgradeCost }>
            <picture>
              <source srcSet={ `${await getItemImage(cost.item)}.avif` } type='image/avif' />
              <source srcSet={ `${await getItemImage(cost.item)}.webp` } type='image/webp' />
              <source srcSet={ `${await getItemImage(cost.item)}.png` } type='image/png' />
              <img 
                src={ `${await getItemImage(cost.item)}.png` } 
                alt={ cost.item } 
                className={ `${styles.upgradeCostImage } ${ cost.item.toLowerCase().replace(/\s/g, '') }` } 
                height={ 40 }
                width={ 40 }
                title={ cost.item }
              />
            </picture>
            <p className={ styles.upgradeCostAmount }>{ cost.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") }</p>
          </div>
        )))}
      </div>
    </>
  )
}
