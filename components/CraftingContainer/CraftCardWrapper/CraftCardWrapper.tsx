"use client"
import styles from '@/components/CraftingContainer/CraftCard/CraftCard.module.css'
import { Craft } from "@/interfaces/Craft"
import { Item } from "@/interfaces/Item"
import useToggleOptions from "@/hooks/useToggleOptions"
import CraftCardOptions from '../CraftCard/CraftCardOptions/CraftCardOptions'

interface Props {
  children: React.ReactNode
  craft: Craft
  crafts: Craft[]
  items: Item[]
}

export default function CraftCardWrapper({ children, craft, crafts, items }: Props) {
  const { showOptions, toggleOptionsModal } = useToggleOptions()

  const classSelector = () => {
    switch(craft.rarity) {
      case 'Uncommon':
        return `${styles.container} ${styles.uncommon}`
      case 'Rare':
        return `${styles.container} ${styles.rare}`
      case 'Epic':
        return `${styles.container} ${styles.epic}`
      case 'Exotic':
        return `${styles.container} ${styles.exotic}`
      case 'Legendary':
        return `${styles.container} ${styles.legendary}`
    }
  }

  return (
    <>
      { showOptions && <CraftCardOptions craft={ craft } crafts={ crafts } items={ items } toggleOptionsModal={ toggleOptionsModal } /> }
      <div className={ classSelector() } onClick={ toggleOptionsModal }>
        { children }
      </div>
    </>
  )
}
