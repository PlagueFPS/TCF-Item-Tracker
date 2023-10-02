import styles from './ItemsSorter.module.css'
import { useState } from 'react'
import { Item } from '@/interfaces/Item'
import { compareName, comparePrice, compareRarity, compareValuePerWeight, compareWeight } from '@/utils/GameUtils'

interface Props {
  setItems: React.Dispatch<React.SetStateAction<Item[]>>
}

type Options = 'Rarity' | 'A-Z' | 'Price' | 'Value/Weight' | 'Weight'

export default function ItemsSorter({ setItems }: Props) {
  const options: Options[] = ['Rarity', 'A-Z', 'Price', 'Value/Weight', 'Weight']
  const [currentSort, setCurrentSort] = useState<Options>('Rarity')
  const [expanded, setExpanded] = useState(false)
  const sortedOptions = options.filter(option => option !== currentSort)

  const onClickHandler = (value: Options) => {
    setExpanded(prevState => !prevState)
    setCurrentSort(value)
    switch(currentSort) {
      case 'Rarity':
        setItems(prevItems => prevItems.sort(compareRarity))
        break
      case 'A-Z':
        setItems(prevItems => prevItems.sort(compareName))
        break
      case 'Price':
        setItems(prevItems => prevItems.sort(comparePrice))
        break
      case 'Value/Weight':
        setItems(prevItems => prevItems.sort(compareValuePerWeight))
        break
      case 'Weight':
        setItems(prevItems => prevItems.sort(compareWeight))
    }
  }
  

  return (
    <div className={ styles.container }>
      <div className={ expanded ? `${styles.selector} ${styles.expanded}` : styles.selector }>
        <button className={ `${styles.option} ${styles.selected}` } onClick={ () => setExpanded(prevState => !prevState) }>
          <span>{ currentSort }</span>
          <span className={ expanded ? `${styles.chevron} ${styles.expanded}` : styles.chevron }></span>
        </button>
        { sortedOptions.map((option, index) => (
          <button key={ `${option}_${index}` } className={ expanded ? `${styles.option} ${styles.expanded}` : styles.option } onClick={ () => onClickHandler(option) }>
            <span>{ option }</span>
          </button>
        ))}
      </div>
    </div>
  )
}
