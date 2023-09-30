import styles from './ItemCard.module.css'
import { Item } from "@/interfaces/Item"
import { calcValuePerWeight, itemAmountNeeded } from '@/functions/GlobalFunctions'

interface Props {
  item: Item
}

export default function ItemCard({ item }: Props) {
  const inGameName = item.inGameName.toLowerCase().replaceAll(/\s/g, '')
  const itemImageAVIF = `/images/${inGameName}.avif`
  const itemImageWEBP = `/images/${inGameName}.webp`
  const itemImagePNG = `/images/${inGameName}.png`

  return (
    <>
      <picture className={ styles.imageContainer }>
        <div className={ styles.itemFrame } />
        <source srcSet={ itemImageAVIF } type='image/avif' />
        <source srcSet={ itemImageWEBP } type='image/webp' />
        <source srcSet={ itemImagePNG } type='image/png' />
        <img 
          src={ itemImagePNG }
          alt={ item.inGameName }
          className={ `${styles.image } ${inGameName}` }
          height={ 95 }
          width={ 95 }
        />
      </picture>
      <div className={ styles.titleContainer }>
        <p className={ styles.title }>{ item.inGameName }</p>
      </div>
      <div className={ styles.weightContainer }>
        <p className={ styles.weightText }>Weight:</p>
        <p className={ styles.weight }>{ item.weight }</p>
      </div>
      <div className={ styles.repContainer }>
        <p className={ styles.repText }>Faction Rep:</p>
        <p className={ styles.rep }>{ item.factionRep.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") }</p>
      </div>
      <div className={ styles.valuePerWeight_Container }>
        <p className={ styles.valuePerWeight_Text }>Value/Weight:</p>
        <p className={ styles.valuePerWeight }>{ calcValuePerWeight(item) }</p>
      </div>
      <div className={ styles.priceContainer }>
        <p className={ styles.priceText }>Sell Price:</p>
        <p className={ styles.price }>{ item.sellValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") }</p>
      </div>
      <div className={ styles.amountContainer }>
        <p className={ styles.amountText }>Quest Amount:</p>
        <p className={ styles.amount }>{ itemAmountNeeded(item, 'quests') }</p>
      </div>
      <div className={ styles.descriptionContainer }>
        <p className={ styles.rarity }>{ item.rarity }</p>
      </div>
    </>
  )
}
