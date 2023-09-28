import { Craft } from "@/interfaces/Craft";
import { Item } from "@/interfaces/Item";
import { Material } from "@/interfaces/Material";
import { Quest } from "@/interfaces/Quest";
import { Quarters } from "@/interfaces/Upgrade";
import getGameData from "@/utils/getGameData";

export const calcRepPerWeight = (item: Item | Material) => {
  const repPerWeight = item.factionRep / item.weight
  return repPerWeight.toFixed(1)
}

export const calcValuePerWeight = (item: Item | Material, asString?: boolean) => {
  const valuePerWeight = item.sellValue / item.weight
  return asString ? Math.round(valuePerWeight).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") 
  : Math.round(valuePerWeight)
}

export const questHrefSelector = (quest: Quest) => {
  switch(quest.faction) {
    case 'Badum': 
      return `/quests/${quest.key}`
    case 'ICA':
      return `/quests/ica/${quest.key}`
    case 'Korolev':
      return `/quests/korolev/${quest.key}`
    case 'Osiris':
      return `/quests/osiris/${quest.key}`
  }
}

export const upgradeHrefSelector = (upgrade: Quarters) => {
  if ('level' in upgrade) return `/upgrades/${upgrade.inGameName.replace(/\s/g, '')}`
  else {
    if (upgrade.inGameName.includes('Gen') || upgrade.inGameName.includes('Supply Crate')) return `/upgrades/generators/${upgrade.inGameName.replace(/\s/g, '')}`
    else if (upgrade.inGameName.includes('Increase')) return `/upgrades/inventory/${upgrade.inGameName.replace(/\s/g, '')}`
    else if (upgrade.inGameName.includes('Reduce PQ Upgrade Time')) return `/upgrades/workbench/${upgrade.inGameName.replace(/\s/g, '')}`
  }

  return ""
}

export const craftHrefSelector = (craft: Craft) => {
  switch(craft.type) {
    default: 
      return `/crafting/${craft.key}`
    case 'weapon':
      return `/crafting/weapons/${craft.key}`
    case 'shield':
      return `/crafting/armor/${craft.key}`
    case 'helmet':
      return `/crafting/armor/${craft.key}`
    case 'attachment':
      return `/crafting/attachments/${craft.key}`
    case 'consumable':
      return `/crafting/consumables/${craft.key}`
    case 'material':
      return `/crafting/materials/${craft.key}`
  }
}

export const getLink = async (name: string) => {
  const quests = await getGameData('missions') as Quest[]
  const upgrades = await getGameData('personalQuarters') as Quarters[]
  const quest = quests.find(quest => quest.inGameName === name)
  const upgrade = upgrades.find(upgrade => upgrade.inGameName === name)

  if (quest) return questHrefSelector(quest)
  else if (upgrade) return upgradeHrefSelector(upgrade)
  else return '#'
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