import styles from './ListSuggestions.module.css'
import { Material } from "@/interfaces/Material"
import { useItemsListContext } from "@/contexts/ItemsListContext"
import { useToastContext } from '@/contexts/ToastContext'

interface Props {
  items: Material[]
  inputValue: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export default function ListSuggestions({ items, inputValue, setValue }: Props) {
  const { list, addItemToList } = useItemsListContext()
  const { itemToast } = useToastContext()

  const displayValue = (item: Material) => {
    setValue('')
    const itemInList = list.items.find(i => i.key === item.key)

    if (!itemInList) {
      addItemToList(item)
      itemToast(item)
    }
  }

  const checkInput = (item: Material) => {
    let isVisible
    if (inputValue) isVisible = item.inGameName.toLowerCase().replace(/\s/g, '').includes(inputValue.toLowerCase().replace(/\s/g, ''))
    return isVisible
  }

  const classSelector = (item: Material) => {
    switch(item.rarity) {
      case 'Common':
          return `${styles.suggestedItem} ${styles.common}`
        case 'Uncommon':
          return `${styles.suggestedItem} ${styles.uncommon}`
        case 'Rare':
          return `${styles.suggestedItem} ${styles.rare}`
        case 'Epic':
          return `${styles.suggestedItem} ${styles.epic}`
        case 'Exotic':
          return `${styles.suggestedItem} ${styles.exotic}`
        case 'Legendary':
          return `${styles.suggestedItem} ${styles.legendary}`
    }
  }

  return (
    <>
      { inputValue && 
        <ul className={ styles.suggestionsList }>
          { items.map(item => {
            if (checkInput(item)) {
              return (
                <li key={ item.key } className={ classSelector(item) } onClick={ () => displayValue(item) }>
                  { item.inGameName }
                </li>
              )
            }
          })}
        </ul>
      }
    </>
  )
}
