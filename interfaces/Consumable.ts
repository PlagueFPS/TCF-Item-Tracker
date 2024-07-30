export interface Consumable {
  key:         string;
  inGameName:  string;
  description: string;
  rarity:      string;
  tags:        string[];
  weight:      number;
  stackSize:   number;
  sellValue:   number;
  factionRep:  number;
  action:      Action;
  tuning:      Tuning;
  cost:        Cost;
  unlock:      Unlock;
}

export interface Action {
  attribute:    string;
  modifierType: string;
  value:        number;
  duration:     number;
}

export interface Cost {
  Korolev:   Ica;
  Osiris:    Ica;
  ICA:       Ica;
  QuickShop: Ica;
}

export interface Ica {
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

export interface Tuning {
  damageType:                   string;
  penetration:                  number;
  directDamage:                 number;
  radialDamage:                 number;
  cooldownTime:                 number;
  actionTime:                   number;
  refireTime:                   number;
  reloadTime:                   number;
  movementSpeedMultiplier:      number;
  weakDamageMultiplier:         number;
  weakDamageMultiplierEnemy:    number;
  directDamagePlayerMultiplier: number;
  directDamageEnemyMultiplier:  number;
  radialDamagePlayerMultiplier: number;
  radialDamageEnemyMultiplier:  number;
  unequipTime:                  number;
  equipTime:                    number;
  spinupTime:                   number;
}

export interface Unlock {
  factions:           any[];
  contractToPurchase: string;
  contractToCraft:    string;
}