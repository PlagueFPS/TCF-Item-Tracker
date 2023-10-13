import styles from './ItemCard.module.css'
import { Item } from "@/interfaces/Item"
import useToggleOptions from '@/hooks/useToggleOptions'
import ItemCardOptions from './ItemCardOptions/ItemCardOptions'
import FavoriteButton from './FavoriteButton/FavoriteButton'
import { calcValuePerWeight, itemAmountNeeded } from '@/functions/GlobalFunctions'

interface Props {
  item: Item
  items: Item[]
}

export default function ItemCard({ item, items }: Props) {
  const { showOptions, toggleOptionsModal } = useToggleOptions()
  const inGameName = item.inGameName.toLowerCase().replaceAll(/\s/g, '')
  const itemImageAVIF = `/images/${inGameName}.avif`
  const itemImageWEBP = `/images/${inGameName}.webp`
  const itemImagePNG = `/images/${inGameName}.png`

  const classSelector = () => {
    switch(item.rarity) {
      case 'Common':
        return `${styles.container} ${styles.commonContainer}`
      case 'Uncommon':
        return `${styles.container} ${styles.uncommonContainer}`
      case 'Rare':
        return `${styles.container} ${styles.rareContainer}`
      case 'Epic':
        return `${styles.container} ${styles.epicContainer}`
      case 'Exotic':
        return `${styles.container} ${styles.exoticContainer}`
      case 'Legendary':
        return `${styles.container} ${styles.legendaryContainer}`
    }
  }

  return (
    <>
      { showOptions && 
        <ItemCardOptions 
          item={ item }
          items={ items }
          toggleOptionsModal={ toggleOptionsModal }
        /> 
      }
      <div className={ classSelector() } onClick={ toggleOptionsModal }>
        <FavoriteButton className={ styles.favorite } item={ item } />
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
          <p className={ styles.valuePerWeight }>{ calcValuePerWeight(item, true) }</p>
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
      </div>
    </>
  )
}
