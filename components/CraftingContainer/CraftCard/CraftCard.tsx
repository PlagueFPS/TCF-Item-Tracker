import styles from './CraftCard.module.css'
import { Craft } from '@/interfaces/Craft'
import { getCraftCosts, getItemImage } from '@/utils/GameUtils'
import { dataTimes } from '@/functions/GlobalFunctions'

interface Props {
  craft: Craft
}

export default async function CraftCard({ craft }: Props) {
  const costs = await getCraftCosts(craft.items)

  return (
    <>
      <picture className={ styles.craftImage_Container }>
        <div className={ styles.imageFrame } />
        <source srcSet={ `${await getItemImage(craft.inGameName)}.avif` } type='image/avif' />
        <source srcSet={ `${await getItemImage(craft.inGameName)}.webp` } type='image/webp' />
        <source srcSet={ `${await getItemImage(craft.inGameName)}.png` } type='image/png' />
        <img
          src={ `${await getItemImage(craft.inGameName)}.png` } 
          alt={ craft.inGameName } 
          title={ craft.inGameName }
          className={ styles.image }
          height={ 256 }
          width={ 256 }
        />
      </picture>
      <div className={ styles.titleContainer }>
        <h2 className={ styles.title }>{ craft.inGameName }</h2>
      </div>
      <div className={ styles.craftTime_Container }>
        <p className={ styles.craftTimeText }>Craft Time:</p>
        <p className={ styles.craftTime }>{ dataTimes(craft.time) }</p>
      </div>
      <div className={ styles.craftRarity_Container }>
        <p className={ styles.craftRarityText }>Rarity:</p>
        <p className={ styles.craftRarity }>{ craft.rarity }</p>
      </div>
      <div className={ styles.craftCosts_Container }>
        { await Promise.all(costs.map(async (cost, index) => (
          <div key={ `${cost.inGameName}_${index}` } className={ styles.craftCost }>
            <picture className={ styles.costImage_Container } title={ cost.inGameName }>
              <source srcSet={ `${await getItemImage(cost.inGameName)}.avif` } type='image/avif' />
              <source srcSet={ `${await getItemImage(cost.inGameName)}.webp` } type='image/webp' />
              <source srcSet={ `${await getItemImage(cost.inGameName)}.png`} type='image/png' />
              <img 
                src={ `${await getItemImage(cost.inGameName)}.png` } 
                alt={ cost.inGameName } 
                className={ `${styles.costImage } ${ cost.inGameName.toLowerCase().replace(/\s/g, '') }` }
                height={ 256 }
                width={ 256 }
              />
            </picture>
            <p className={ styles.craftCostAmount }>{ cost.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") }</p>
          </div>
        )))}
      </div>
    </>
  )
}
