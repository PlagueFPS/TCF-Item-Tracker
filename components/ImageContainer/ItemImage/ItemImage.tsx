"use client"
import { Material } from "@/interfaces/Material"
import { Item } from "@/interfaces/Item"
import { useItemsListContext } from "@/contexts/ItemsListContext"
import { useToastContext } from "@/contexts/ToastContext"
interface Props {
  item: Material | Item
  className: string
  clickable?: boolean
}

export default function ItemImage({ item, className, clickable }: Props) {
  const { list, addItemToList, updateItemInList } = useItemsListContext()
  const { itemToast } = useToastContext()
  const inGameName = item.inGameName.toLowerCase().replaceAll(/\s/g, '')
  const itemImagePNG = `/images/${inGameName}.png`
  const itemImageWEBP = `/images/${inGameName}.webp`
  const itemImageAVIF = `/images/${inGameName}.avif`
  
  const clickHandler = () => {
    const itemInList = list.items.find(i => i.key === item.key)
    if (itemInList) updateItemInList(item, 1)
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
