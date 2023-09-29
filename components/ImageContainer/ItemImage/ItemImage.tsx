"use client"
import { Material } from "@/interfaces/Material"
import { useItemsListContext } from "@/contexts/ItemsListContext"
import { useToastContext } from "@/contexts/ToastContext"
interface Props {
  item: Material
  className: string
  clickable?: boolean
}

export default function ItemImage({ item, className, clickable }: Props) {
  const { list, addItemToList, setList } = useItemsListContext()
  const { itemToast } = useToastContext()
  const inGameName = item.inGameName.toLowerCase().replaceAll(/\s/g, '')
  const itemImagePNG = `/images/${inGameName}.png`
  const itemImageWEBP = `/images/${inGameName}.webp`
  const itemImageAVIF = `/images/${inGameName}.avif`
  
  const clickHandler = () => {
    const itemInList = list.items.find(i => i.key === item.key)
    const currentItems = list.items
    if (itemInList && itemInList.amount) {
      let itemAmount = itemInList.amount
      const index = currentItems.indexOf(item)
      const removedItem = currentItems.splice(index, 1)[0]
      const newItem = {...removedItem, amount: itemAmount += 1 }
      currentItems.splice(index, 0, newItem)
      setList({
        ...list,
        items: [...currentItems]
      })
    }
    else if (!itemInList) {
      addItemToList(item)
      itemToast(item)
    }
  }

  return (
    <picture>
      <source srcSet={ itemImageAVIF } type='image/avif' />
      <source srcSet={ itemImageWEBP } type='image/webp' />
      <source srcSet={ itemImagePNG } type='image/png' />
      <img
        src={ itemImagePNG } 
        alt={ item.inGameName } 
        className={ `${className} ${inGameName}` } 
        title={ item.inGameName }
        width={ 105 }
        height={ 105 }
        onClick={ clickable ? clickHandler : undefined }
      />
    </picture>
  )
}
