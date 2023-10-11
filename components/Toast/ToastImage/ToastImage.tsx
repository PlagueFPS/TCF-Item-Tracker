import { Item } from '@/interfaces/Item'
import styles from './ToastImage.module.css'
import { Material } from "@/interfaces/Material"
import { BsCheck } from 'react-icons/bs'

interface Props {
  item: (Material | Item)
}

export default function ToastImage({ item }: Props) {
  const inGameName = item.inGameName.toLowerCase().replace(/\s/g, '')
  const itemImagePNG = `/images/${inGameName}.png`
  const itemImageWEBP = `/images/${inGameName}.webp`
  const itemImageAVIF = `/images/${inGameName}.avif`

  const classSelector = () => {
    switch(item.rarity) {
      case 'Common':
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
    <div className={ styles.imageStatus }>
      <picture className={ styles.imageContainer }>
        <source srcSet={ itemImageAVIF } type="image/avif" />
        <source srcSet={ itemImageWEBP } type="image/webp" />
        <source srcSet={ itemImagePNG } type="image/png" />
        <img 
          src={ itemImagePNG } 
          alt={ item.inGameName } 
          className={ classSelector() }
          />
      </picture>
      <div className={ `${styles.statusContainer} ${styles.success}`}>
        <div className={ styles.statusIcon }>
          <BsCheck />
        </div>
      </div>
    </div>
  )
}
