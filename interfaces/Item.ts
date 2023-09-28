export interface Item {
  inGameName:  string;
  description: string;
  type:        Type;
  rarity:      Rarity;
  weight:      number;
  cost:        Cost;
  unlock:      Unlock;
  sellValue:   number;
  factionRep:  number;
  tags:        string[];
  stackSize:   number;
  uses:        Uses;
  key:         string;
  amount?:     number;
  createdAt?:  number;
}

export interface Cost {
  CraftingStation?: CraftingStation;
  ICA?:             Ica;
  Korolev?:         Korolev;
  Osiris?:          Osiris;
  QuickShop?:       QuickShop;
}

export interface CraftingStation {
  time:  number;
  items: { [key: string]: Forge };
}

export interface Forge {
  inGameName: string;
  amount:     number;
}

export interface Ica {
  time:  number;
  items: ICAItems;
}

export interface ICAItems {
  SoftCurrency: Forge;
  ICAScrip?:    Forge;
}

export interface Korolev {
  time:  number;
  items: KorolevItems;
}

export interface KorolevItems {
  SoftCurrency:  Forge;
  KorolevScrip?: Forge;
}

export interface Osiris {
  time:  number;
  items: OsirisItems;
}

export interface OsirisItems {
  SoftCurrency: Forge;
  OsirisScrip?: Forge;
}

export interface QuickShop {
  time:  number;
  items: QuickShopItems;
}

export interface QuickShopItems {
  SoftCurrency: Forge;
}

export type Rarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary" | "Exotic";

export type Type = "material" | "questItem" | "weapon" | "consumable" | "backpack" | "shield" | "helmet" | "attachment";

export interface Unlock {
  factions:           FactionElement[];
  contractToPurchase: ContractToPurchase;
  contractToCraft:    ContractToCraft;
}

export type ContractToCraft = "None" | "Main-KOR-BuildLaserDrill-8" | "Main-Osiris-SatelliteRepairs-4" | "Main-ICA-OilPump-8" | "Main-ICA-GasGrenades-2" | "Main-Osiris-Howler-8" | "Main-Osiris-Caverns-13" | "Main-KOR-CraftingBackpack-2";

export type ContractToPurchase = "None" | "Main-Osiris-StrongStims-2" | "Main-Osiris-CombatStims-3" | "Main-Osiris-StrongMedkits-3" | "Main-Osiris-TestRun-1" | "Main-ICA-AudioDecoys-3" | "Main-Osiris-Caverns-10" | "Main-KOR-Caverns-2" | "Main-KOR-FocusCrystals-1" | "Main-KOR-TitanOre-2" | "Main-KOR-Veltecite-1" | "Main-ICA-OilScanModule-2";

export interface FactionElement {
  faction: FactionEnum;
  level:   number;
}

export type FactionEnum = "Korolev" | "ICA" | "Osiris";

export interface Uses {
  missions: { [key: string]: Forge };
  jobs:     { [key: string]: Forge };
  quarters: { [key: string]: Forge };
  printing: { [key: string]: Forge };
  forge:    { [key: string]: Forge };
}
