import type { Unlock } from "./Item";

export interface Attachment {
  key:         string;
  inGameName:  string;
  description: string;
  type:        string;
  compatible:  string[];
  rarity:      string;
  tags:        string[];
  weight:      number;
  stackSize:   number;
  sellValue:   number;
  factionRep:  number;
  effects:     Effect[];
  cost:        Cost;
  unlock:      Unlock;
}

export interface Cost {
  Korolev: Korolev;
}

export interface Korolev {
  time:  number;
  items: Items;
}

export interface Items {
  SoftCurrency: SoftCurrency;
}

export interface SoftCurrency {
  inGameName: string;
  amount:     number;
}

export interface Effect {
  attribute:    string;
  modifierType: string;
  value:        number;
}