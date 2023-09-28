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
  const limit = 5
  let num = 0

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

  return (
    <>
      { inputValue && 
        <ul className={ styles.suggestionsList }>
          { items.map(item => {
            if (checkInput(item) && num < limit) {
              num += 1
              return (
                <li key={ item.key } className={ styles.suggestedItem } onClick={ () => displayValue(item) }>
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
