export type Quarters  = Level | UpgradeLevel

export interface Upgrade {
  inGameName: string
  type: string
  PQLevelRequired: number
  tier: number
  levels: UpgradeLevel[]
}

export interface Level {
  inGameName: string
  level: number
  upgradesRequired: number
  costs: { [key: string]: number }
  upgradeTime: number
}

export interface UpgradeLevel {
  inGameName: string
  upgradeAmount: number
  upgradeTime: number
  costs: { [key: string]: number }
}

export interface UpgradeCost {
  item: string
  amount: number
}