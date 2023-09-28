export interface Material {
  inGameName:  string;
  description: string;
  rarity:      Rarity;
  tags:        string[];
  weight:      number;
  stackSize:   number;
  sellValue:   number;
  factionRep:  number;
  questItem:   boolean;
  cost:        Cost;
  unlock:      Unlock;
  key:         string;
  createdAt?:  number;
  amount?:     number;
}

export interface Cost {
  CraftingStation?: CraftingStation;
  ICA?:             Ica;
  Korolev?:         Korolev;
  Osiris?:          Osiris;
  QuickShop?:       Ica;
}

export interface CraftingStation {
  time:  number;
  items: { [key: string]: Item };
}

export interface Item {
  inGameName: string;
  amount:     number;
}

export interface Ica {
  time:  number;
  items: ICAItems;
}

export interface ICAItems {
  SoftCurrency: Item;
}

export interface Korolev {
  time:  number;
  items: KorolevItems;
}

export interface KorolevItems {
  SoftCurrency:  Item;
  KorolevScrip?: Item;
}

export interface Osiris {
  time:  number;
  items: OsirisItems;
}

export interface OsirisItems {
  SoftCurrency: Item;
  OsirisScrip?: Item;
}

export type Rarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary" | "Exotic";

export interface Unlock {
  factions:           Faction[];
  contractToPurchase: ContractTo;
  contractToCraft:    ContractTo;
}

export type ContractTo = "None" | "Main-KOR-BuildLaserDrill-8" | "Main-Osiris-SatelliteRepairs-4" | "Main-ICA-OilPump-8";

export interface Faction {
  faction: string;
  level:   number;
}
