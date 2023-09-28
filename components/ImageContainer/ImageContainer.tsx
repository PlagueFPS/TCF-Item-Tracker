import styles from './ImageContainer.module.css'
import getGameData from "@/utils/getGameData"
import { Material, Rarity } from "@/interfaces/Material"
import { compareRarity } from '@/utils/GameUtils'
import ItemImage from './ItemImage/ItemImage'


export default async function ImageContainer() {
  const items = await getGameData('materials') as Material[]

  const classSelector = (rarity: Rarity) => {
    switch(rarity) {
      default:
        return `${styles.image} ${styles.common}`
      case 'Uncommon':
        return `${styles.image} ${styles.uncommon}`
      case 'Rare':
        return `${styles.image} ${styles.rare}`
      case 'Epic':
        return `${styles.image} ${styles.epic}`
      case 'Exotic':
        return `${styles.image} ${styles.exotic}`
      case 'Legendary':
        return `${styles.image} ${styles.legendary}`
    }
  }

  return (
    <section className={ styles.container }>
      <h2 className={ styles.title }>The Cycle Materials List</h2>
      { items.sort(compareRarity).map(item => (
        <ItemImage key={ item.key } item={ item } className={ classSelector(item.rarity) } clickable />
      )) }
    </section>
  )
}
