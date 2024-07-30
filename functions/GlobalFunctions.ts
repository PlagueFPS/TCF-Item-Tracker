import { Craft } from "@/interfaces/Craft";
import { Item } from "@/interfaces/Item";
import { Material } from "@/interfaces/Material";
import { Quest } from "@/interfaces/Quest";
import { DataTypes } from "@/types/DataTypes";
import { FieldHook } from "payload";

interface CompareValues {
  [key: string]: number
}

export const compareRarity = (x: Item | Material, y: Item | Material) => {
  const itemRarityValues: CompareValues = {
    Common: 5,
    Uncommon: 4,
    Rare: 3,
    Epic: 2,
    Legendary: 1,
    Exotic: 0,
}
let a = itemRarityValues[x.rarity]
let b = itemRarityValues[y.rarity]
return a === b ? 0 : a > b ? 1 : -1
}

export const compareCraftRarity = (x: Craft, y: Craft) => {
  const itemRarityValues: CompareValues = {
    Common: 0,
    Uncommon: 1,
    Rare: 2,
    Epic: 3,
    Exotic: 4,
    Legendary: 5,
  }
  let a = itemRarityValues[x.rarity]
  let b = itemRarityValues[y.rarity]
  return a === b ? 0 : a > b ? 1 : -1
}

export const comparePrice = (x: Item | Material, y: Item | Material) => {
  let a = x.sellValue
  let b = y.sellValue
  return a === b ? 0 : a < b ? 1 : -1
}

export const compareWeight = (x: Item | Material, y: Item | Material) => {
  let a = x.weight 
  let b = y.weight
  return a === b ? 0 : a < b ? 1 : -1
}

export const compareValuePerWeight = (x: Item | Material, y: Item | Material) => {
  let a = calcValuePerWeight(x)
  let b = calcValuePerWeight(y)
  return a === b ? 0 : a < b ? 1 : -1
}

export const compareName = (x: DataTypes, y: DataTypes) => {
  let a = x.inGameName.toLowerCase()
  let b = y.inGameName.toLowerCase()
  return a === b ? 0 : a > b ? 1 : -1
}

export const compareRep = (x: Item | Material, y: Item | Material) => {
  let a = x.factionRep 
  let b = y.factionRep
  return a === b ? 0 : a < b ? 1 : -1
}

export const compareCreatedAt = (x: Item | Material, y: Item | Material) => {
  if (x.createdAt && y.createdAt) {
    let a = x.createdAt
    let b = y.createdAt
    return a === b ? 0 : a > b ? 1 : -1
  } else return 0
}

export const compareKorolevChainName = (x: Quest, y: Quest) => {
  const xChainName = x.chainName.toLowerCase().replace("!", "").replace(/\s/g, '').replace(",", '')
  const yChainName = y.chainName.toLowerCase().replace("!", "").replace(/\s/g, '').replace(",", '')
  const chainNameValues: CompareValues = {
    timetopunchin: 0,
    whatatool: 1,
    goodhonestwork: 2,
    unchartedterritory: 3,
    velteciteforthemasses: 4,
    titanhunter: 5,
    focusedoncrystals: 6,
    apowerfuldiscovery: 7,
    timeformorework: 8,
    researchcosts: 9,
    inadeepdarkhole: 10,
    craftingbetterbags: 11,
    heavyconstruction: 12,
    crushhazard: 13,
    thetestrun: 14
  }

  let a = chainNameValues[xChainName]
  let b = chainNameValues[yChainName]

  return a === b ? 0 : a > b ? 1 : -1
}

export const compareICAChainName = (x: Quest, y: Quest) => {
  const xChainName = x.chainName.toLowerCase().replace("!", "").replace(/\s/g, '').replace(",", '')
  const yChainName = y.chainName.toLowerCase().replace("!", "").replace(/\s/g, '').replace(",", '')
  const chainNameValues: CompareValues = {
    yourcivicduty: 0,
    audiophilesbeware: 1,
    doingthework: 2,
    toxiclove: 3,
    projectfireball: 4,
    racetothebottom: 5,
    workingforthecommunity: 6,
    nevergiveup: 7,
    privatebusiness: 8,
    backtobasics: 9,
    aneyeforoil: 10,
    puttothetest: 11,
    thecommunityneedsyou: 12
  } 

  let a = chainNameValues[xChainName]
  let b = chainNameValues[yChainName]
  return a === b ? 0 : a > b ? 1 : -1
}

export const compareOsirisChainName = (x: Quest, y: Quest) => {
  const xChainName = x.chainName.toLowerCase().replace("!", "").replace(/\s/g, '').replace(",", '')
  const yChainName = y.chainName.toLowerCase().replace("!", "").replace(/\s/g, '').replace(",", '')
  const chainNameValues: CompareValues = {
    dangerousscience: 0,
    howlingskies: 1,
    fieldresearch: 2,
    stimulatingdevelopments: 3,
    lostknowledge: 4,
    theprogenitordevice: 5,
    explosivedelivery: 6,
    lasershow: 7,
    stormrider: 8,
    theneedsoftheone: 9,
    everythingiscrystals: 10,
    pathtostrongmedkits: 11,
    buildingabetterdeathray: 12,
    satellitemaster: 13,
    combatready: 14,
    orbitalrepairs: 15,
    breakingandentering: 16,
    awholenewecosystem: 17
  }

  let a = chainNameValues[xChainName]
  let b = chainNameValues[yChainName]
  return a === b ? 0 : a > b ? 1 : -1
}

export const calcRepPerWeight = (item: Item | Material) => {
  const repPerWeight = item.factionRep / item.weight
  return repPerWeight.toFixed(1)
}

export const calcValuePerWeight = (item: Item | Material, asString?: boolean) => {
  const valuePerWeight = item.sellValue / item.weight
  return asString ? Math.round(valuePerWeight).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") 
  : Math.round(valuePerWeight)
}

export const dataTimes = (time: number) => {
  let hours = Math.floor(time / 3600)
  let mins = Math.floor(time % 3600 / 60)

  if (hours > 0) {
    if (mins > 0) return hours + "h " + mins + "m"
    else return hours + "h"
  }

  return mins + "m"
}

export const itemAmountNeeded = (item: Item, neededFor: "quests" | "upgrades" | "crafts" | "forge") => {
  let questAmount = 0
  let upgradeAmount = 0
  let craftAmount = 0
  let forgeAmount = 0

  for (const mission in item.uses.missions) {
    questAmount += item.uses.missions[mission].amount
  }

  for (const upgrade in item.uses.quarters) {
    upgradeAmount += item.uses.quarters[upgrade].amount
  }

  for (const craft in item.uses.printing) {
    craftAmount += item.uses.printing[craft].amount
  }

  for (const forge in item.uses.forge) {
    forgeAmount += item.uses.forge[forge].amount
  }

  switch(neededFor){
    case 'quests':
      return questAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
    case 'upgrades':
      return upgradeAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
    case 'crafts':
      return craftAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
    case 'forge':
      return forgeAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
  }
}

export const formatSlug = (fallback: string): FieldHook => ({ value, originalDoc, data }) => {
  if (typeof value === 'string') {
    return value.replace(/ /g, '-').replace(/[^\w-/]+/g, '').toLowerCase()
  }
  const fallbackData = data?.[fallback] || originalDoc?.[fallback]

  if (fallbackData && typeof fallbackData === 'string') {
    return fallbackData.replace(/ /g, '-').replace(/[^\w-/]+/g, '').toLowerCase()
  }

  return value
}