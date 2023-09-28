"use client"
import { useItemsListContext } from "@/contexts/ItemsListContext"
interface Props {
  className: string
}

export default function ListTitle({ className }: Props) {
  const { list } = useItemsListContext()

  return <h2 className={ className }>Your { list.name }</h2>
}
