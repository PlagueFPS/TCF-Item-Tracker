import { Rarity } from "./Item";

export interface RawCraft {
  time:  number;
  items: { [key: string]: CraftItem };
  type:  Type;
  key:   string;
}

export interface Craft extends RawCraft {
  inGameName: string
  rarity: Rarity
  description: string
  effects?: string[]
  armorValue?: number
  durability?: number
}

export interface CraftItem {
  inGameName: string;
  amount:     number;
}

type Type = "material" | "questItem" | "weapon" | "consumable" | "backpack" | "shield" | "helmet" | "attachment";

