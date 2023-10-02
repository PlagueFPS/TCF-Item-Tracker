import { Item } from "./Item"
import { Material } from "./Material"

export interface List {
  id: string
  name: string
  items: (Material | Item)[]
}