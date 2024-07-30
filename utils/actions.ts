"use server"
import { getGameData } from "@/data/data";
import { Craft, CraftItem } from "@/interfaces/Craft";
import { ForgeRecipe } from "@/interfaces/ForgeRecipe";
import { Forge, Item } from "@/interfaces/Item";
import { Objective, Quest } from "@/interfaces/Quest";
import { Quarters } from "@/interfaces/Upgrade";
import { getCosts, getCraftCosts, getItemImage, getTaskItems as getRawTaskItems } from "./GameUtils";
import { optionItem } from "@/components/QuestsContainer/QuestCard/QuestCardOptions/QuestCardOptions";
import { optionCost } from "@/components/UpgradesContainer/UpgradeCard/UpgradeCardOptions/UpgradeCardOptions";
import { optionCost as optionCraftCost } from "@/components/CraftingContainer/CraftCard/CraftCardOptions/CraftCardOptions";

export async function getLinks(currentData: Forge[]) {
  const questsData = getGameData('missions') as Promise<Quest[]>
  const upgradesData = getGameData('personalQuarters') as Promise<Quarters[]>
  const craftsData = getGameData('printing') as Promise<Craft[]>
  const forgeRecipesData = getGameData('forgePerks') as Promise<ForgeRecipe[]>
  const itemsData = getGameData('items', true) as Promise<Item[]>
  const [
    quests, 
    upgrades, 
    crafts, 
    forgeRecipes, 
    items
  ] = await Promise.all([questsData, upgradesData, craftsData, forgeRecipesData, itemsData])

  const links = currentData.map(data => {
    const quest = quests.find(quest => quest.inGameName === data.inGameName)
    const upgrade = upgrades.find(upgrade => upgrade.inGameName === data.inGameName)
    const craft = crafts.find(craft => craft.inGameName === data.inGameName)
    const recipe = forgeRecipes.find(recipe => recipe.inGameName === data.inGameName)
    const item = items.find(item => item.inGameName === data.inGameName)

    if (quest) return { inGameName: data.inGameName, link: `/quests/${quest.key}` }
    else if (upgrade) return { inGameName: data.inGameName, link: `/upgrades/${upgrade.inGameName.replace(/\s/g, '')}`}
    else if (craft) return { inGameName: data.inGameName, link: `/crafting/${craft.key}` }
    else if (recipe) return { inGameName: data.inGameName, link: `/forge/${recipe.key}` }
    else if (item) return { inGameName: data.inGameName, link: `/item-info/${item.key}` }
    else return { inGameName: data.inGameName, link: '#' }
  })

  return links
}

export async function getTaskItems(objectives: Objective[]) {
  const rawTaskItems = await getRawTaskItems(objectives)
  const taskItems = await Promise.all(rawTaskItems.map(async (item: optionItem) => {
    const itemImage = await getItemImage(item.inGameName)
    return {...item, image: itemImage }
  }))

  return taskItems
}

export async function fetchCurrentCosts(currentCosts: { [key: string]: number | undefined }) {
  const rawCosts = await getCosts(currentCosts)
  const costs = await Promise.all(rawCosts.map(async (cost: optionCost) => {
    const itemImage = await getItemImage(cost.item)
    return {...cost, image: itemImage}
  }))

  return costs
}

export async function fetchCraftCosts(currentCosts: {[key: string]: CraftItem }) {
  const rawCosts = await getCraftCosts(currentCosts)
  const costs = await Promise.all(rawCosts.map(async (cost: optionCraftCost) => {
    const itemImage = await getItemImage(cost.inGameName)
    cost.image = itemImage
    return cost
  }))

  return costs
}

export async function fetchCurrentImage(name: string) {
  const image = await getItemImage(name)
  return image
}