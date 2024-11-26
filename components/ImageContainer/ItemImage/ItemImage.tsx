"use client"
import { Material } from "@/interfaces/Material"
import { Item } from "@/interfaces/Item"
import { useItemsListContext } from "@/contexts/ItemsListContext"
import { useToastContext } from "@/contexts/ToastContext"
import Image from "next/image"
interface Props {
  item: Material | Item
  className: string
  clickable?: boolean
}

export default function ItemImage({ item, className, clickable }: Props) {
  const { list, addItemToList, updateItemInList } = useItemsListContext()
  const { itemToast } = useToastContext()
  const inGameName = item.inGameName.toLowerCase().replaceAll(/\s/g, '')
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
      <Image
        src={ itemImageAVIF } 
        alt={ item.inGameName } 
        className={ `${className} ${inGameName}` } 
        title={ item.inGameName }
        width={ 105 }
        height={ 105 }
        sizes="105px"
        onClick={ clickable ? clickHandler : undefined }
      />
  )
}
