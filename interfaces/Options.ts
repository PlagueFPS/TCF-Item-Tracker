import { CraftItem } from "./Craft"
import { Item } from "./Item"
import { UpgradeCost } from "./Upgrade"

export interface OptionItem extends Item {
  image?: string
}

export interface OptionCost extends UpgradeCost {
  image?: string
}

export interface OptionCraftCost extends CraftItem {
  image?: string
}