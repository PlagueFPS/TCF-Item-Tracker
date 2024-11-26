import 'server-only'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache as cache } from 'next/cache'
import type { DataStrings } from '@/types/DataStrings'
import type { DataTypes } from '@/types/DataTypes'
import type { Location } from '@/interfaces/Location'
import type { Cosmetic } from '@/interfaces/Cosmetic'
import type { Material } from '@/interfaces/Material'
import type { Item } from '@/interfaces/Item'
import type { Quest } from '@/interfaces/Quest'
import type { Craft, RawCraft } from '@/interfaces/Craft'
import type { ForgeRecipe, RawRecipe } from '@/interfaces/ForgeRecipe'
import { Attachment } from '@/interfaces/Attachment'
import { Consumable } from '@/interfaces/Consumable'

const itemsToExclude = [
  "Inflamed Howler Ichor Gland",
  "Intact Howler Syrinx",
  "Howler Ichor Gland"
]

const tagsToExclude = [
  'Weapon.Ammo',
  'Loot.Category.MissionItem',
  'Loot.Category.Utility',
  'Loot.Category.Key',
  'Weapon.Category.Shotgun',
  'Weapon.Category.LMG',
  'Weapon.Category.SMG',
  'Weapon.Category.Pistol',
  'Weapon.Category.Sniper',
  'Weapon.Category.AR',
  'Weapon.Category.DMR',
  'Weapon.Attachment',
  'Equipment.Consumables.Healing',
  'Equipment.Consumables',
  'Weapon.Category.Launcher'
]

export const getGameData = cache(async (filename: DataStrings, filtered?: boolean): Promise<DataTypes[] | Location | Cosmetic> => {
  const data = await fetch(`https://raw.githubusercontent.com/TCF-Wiki/TCF-Information/main/array/${filename}.json`)
  
  switch(filename) {
    case 'materials': {
      const materialData = await data.json() as Material[]
      const filteredMaterials = materialData.filter(item => 
        tagsToExclude.every(tag => !item.tags.includes(tag) && item.tags.length) && 
        itemsToExclude.every(i => item.inGameName !== i))
      
      return filteredMaterials
    }
    case 'items': {
      const itemsData = await data.json() as Item[]
      const filteredItems = itemsData.filter(item => {
        return tagsToExclude.every(tag => !item.tags.includes(tag) && item.tags.length) && 
        itemsToExclude.every(i => item.inGameName !== i)
      })
      
      return filtered ? filteredItems : itemsData
    }
    case 'missions': {
      const missionData = await data.json() as Quest[]
      return missionData
    }
    case 'personalQuarters': {
      const quartersData = await data.json()
      const quarters = quartersData[0]
      const rawUpgrades = quartersData[1]
      const upgrades = []

      for (const level in quarters) {
        if (quarters[level] !== "levels" && level !== 'playerquarter_1') {
          upgrades.push(quarters[level])
        }
      }
    
      for (const node in rawUpgrades) {
        if (rawUpgrades[node] !== "nodes") {
          const tiers = rawUpgrades[node]["levels"]
          tiers.forEach((tier: any) => upgrades.push(tier))
        }
      }

      return upgrades
    }
    case 'printing': {
      const printingData = await data.json()
      const itemsData = await fetch(`https://raw.githubusercontent.com/TCF-Wiki/TCF-Information/main/array/items.json`)
      const items = await itemsData.json()
      const crafts: Craft[] = await Promise.all(printingData.map(async (craft: RawCraft) => {
        const item = items.find((item: Item) => item.key === craft.key)
        const effects = await getItemEffect(craft)

        if (item && item.type === 'attachment' || item && item.type === 'consumable') return {
          ...craft, 
          inGameName: item.inGameName, 
          rarity: item.rarity, 
          description: item.description,
          effects: effects
        }
        else if (item && item.type === 'shield' || item && item.type === 'helmet') {
          const shieldData = await (await fetch(`https://raw.githubusercontent.com/TCF-Wiki/TCF-Information/main/array/shields.json`)).json()
          const helmetData = await (await fetch(`https://raw.githubusercontent.com/TCF-Wiki/TCF-Information/main/array/helmets.json`)).json()
          const shield = shieldData.find((shield: any) => shield.key === item.key)
          const helmet = helmetData.find((helmet: any) => helmet.key === item.key)

          if (helmet || shield) return {
            ...craft,
            inGameName: item.inGameName,
            rarity: item.rarity,
            description: item.description,
            armorValue: helmet?.armorAmount || shield?.armorAmount,
            durability: helmet?.durability || shield?.durability
          }
        }
        else if (item) return {
          ...craft, 
          inGameName: item.inGameName, 
          rarity: item.rarity, 
          description: item.description,
        }
      }))

      return crafts
    }
    case 'forgePerks': {
      const perkData = await data.json() as RawRecipe[]
      const perks: ForgeRecipe[] = await Promise.all(perkData.map(async (perk) => {
        let inGameName = perk.description
        const { minValue, maxValue } = await getPerkMinMax(perk)
        const equipment = perk.equipment.map(equipment => {
          switch(equipment) {
            case 'Equipment.Back Item':
              return 'Backpack'
            case 'Equipment.Helmet':
              return 'Helmet'
            case 'Equipment.Shield':
              return 'Shield'
          }
        })

        if (inGameName === 'Extra armor') inGameName = `${inGameName} (${equipment[0]})`
        
        return {
          ...perk,
          equipment: equipment,
          inGameName: inGameName,
          attributeOverrides: {
            minValue: minValue,
            calculatedMaxValue: maxValue,
            numSteps: perk.attributeOverrides.numSteps,
            stepGranularity: perk.attributeOverrides.stepGranularity
          }
        }
      }))

      return perks
    }
    case 'locations': {
      const locationData = await fetch('https://raw.githubusercontent.com/TCF-Wiki/TCF-Information/main/min/locations.json')
      const location = await locationData.json() as Location
      return location
    }
    case 'cosmetics': {
      const cosmeticsData = await fetch('https://raw.githubusercontent.com/TCF-Wiki/TCF-Information/main/min/cosmetics.json')
      const cosmetics = await cosmeticsData.json() as Cosmetic
      return cosmetics
    }
  }
}, ['game-data'], {
  tags: ['tcf-game-data']
})

const getItemEffect = async (craft: RawCraft) => {
  if (craft.type === 'attachment') return getAttachmentEffect(craft)
  else if (craft.type === 'consumable') return getConsumableEffect(craft)
}

const getAttachmentEffect = async (craft: RawCraft) => {
  const attachmentData = await fetch('https://raw.githubusercontent.com/TCF-Wiki/TCF-Information/main/array/attachments.json')
  const attachments = await attachmentData.json() as Attachment[]
  const attachment = attachments.find(attachment => attachment.key === craft.key)
  const rawEffects = attachment && [...attachment.effects]
  const effects = rawEffects?.map(effect => {
    let newEffect: string = ''
    let value = 0
    switch(effect.attribute) {
      default:
        return ''
      case 'WeaponClipSize':
        value = Math.round((effect.value - 1) * 100)
        newEffect = `+${value}% magazine capacity`
        break
      case 'WeaponTargetingFOV':
        value = Math.round((1 - effect.value) * 100)
        newEffect = `${value}% Targeting recoil reduction`
        break
      case 'WeaponIsSilenced':
        newEffect = `Reduces audible range`
        break
      case 'WeaponPenetration':
        newEffect = `+${effect.value} Penetration`
        break
      case 'WeaponRecoilVertical':
        value = Math.round((1 - effect.value) * 100)
        newEffect = `-${value}% vertical recoil`
        break
      case 'WeaponEquipTime':
        value = Math.round((1 - effect.value) * 100)
        newEffect = `-${value}% weapon equip time`
        break
      case 'WeaponReloadTime':
        value = Math.round((1 - effect.value) * 100)
        newEffect = `-${value}% weapon reload time`
        break
      case 'TargetingTime':
        value = Math.round((1 - effect.value) * 100)
        newEffect = `-${value}% weapon ADS time`
        break
      case 'WeaponRecoilIncreaseRate':
        value = Math.round((1 - effect.value) * 100)
        newEffect = `-${value}% weapon recoil increase rate`
        break
      case 'DamageEnemyMultiplier':
        value = Math.round((effect.value - 1) * 100)
        newEffect = `+${value}% damage against creatures`
        break
      case 'WeaponAmountOfShots':
        newEffect = `Weapon only shoots ${effect.value} projectile`
        break
      case 'WeaponDamageDirect':
        value = Math.round((1 - effect.value) * 100)
        newEffect = `+${value}% damage`
        break
      case 'WeaponDamageRange':
        newEffect = `+${effect.value}% range`
        break
      case 'WeaponTargetingSpreadMultiplier':
        newEffect = `${effect.value} ADS Spread`
    }

    return newEffect
  })

  return effects
}

const getConsumableEffect = async (craft: RawCraft) => {
  const consumablesData = await fetch('https://raw.githubusercontent.com/TCF-Wiki/TCF-Information/main/array/consumables.json')
  const consumables = await consumablesData.json() as Consumable[]
  const consumable = consumables.find(consumable => consumable.key === craft.key)
  let effect = ''
  switch(consumable?.action?.attribute) {
    case 'CurrentHealth':
      effect = `+${consumable.action.value} HP`
      break
  }

  return [effect]
}

const getPerkMinMax = async (recipe: RawRecipe) => {
  const perkData = await fetch('https://raw.githubusercontent.com/TCF-Wiki/TCF-Information/main/array/forgePerks.json')
  const perks = await perkData.json() as RawRecipe[]
  const perk = perks.find(perk => recipe.key === perk.key)
  let minValue = ''
  let maxValue = ''

  switch(perk?.attributes[0].attribute.replace("EYGameplayAttribute::", '')) {
    default:
      return { minValue, maxValue }
    case 'HealthRegenerationRate':
      minValue = `+${perk.attributeOverrides.minValue} HP/s`
      maxValue = `+${perk.attributeOverrides.calculatedMaxValue} HP/s`
      break
    case 'HealingAmountScaling':
      minValue = `+${perk.attributeOverrides.minValue} HP`
      maxValue = `+${perk.attributeOverrides.calculatedMaxValue} HP`
      break
    case 'MaxHealth':
      minValue = `+${perk.attributeOverrides.minValue} HP`
      maxValue = `+${perk.attributeOverrides.calculatedMaxValue} HP`
      break
    case 'HealingApplicationTimeScaling':
      minValue = `${(+perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Duration`
      maxValue = `${(+perk.attributeOverrides.minValue * 100) - 100}% Duration`
      break
    case 'MaxStamina':
      minValue = `+${perk.attributeOverrides.minValue} Stamina`
      maxValue = `+${perk.attributeOverrides.calculatedMaxValue} Stamina`
      break
    case 'StaminaConsumptionRate':
      minValue = `${(+perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Stamina Consumption`
      maxValue = `${(+perk.attributeOverrides.minValue * 100) - 100}% Stamina Consumption`
      break
    case 'DamageScalingReceivedFromStorm':
      minValue = `${(+perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Damage`
      maxValue = `${(+perk.attributeOverrides.minValue * 100) - 100}% Damage`
      break
    case 'DamageScalingReceivedFromAI':
      minValue = `${(+perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Damage`
      maxValue = `${(+perk.attributeOverrides.minValue * 100) - 100}% Damage`
      break
     case 'FallingDamageReduction':
      minValue = `${(+perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Damage`
      maxValue = `${(+perk.attributeOverrides.minValue * 100) - 100}% Damage`
      break
    case 'HelmetArmorScaling':
      minValue = `+${perk.attributeOverrides.minValue} Armor`
      maxValue = `+${perk.attributeOverrides.calculatedMaxValue} Armor`
      break
    case 'StaminaRegenerationDelayScaling':
      minValue = `${(+perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Delay`
      maxValue = `${(+perk.attributeOverrides.minValue * 100) - 100}% Delay`
      break
    case 'AIDetectionHearingModifier':
      minValue = `${(+perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Creature Sight and Audio Range`
      maxValue = `${(+perk.attributeOverrides.minValue * 100) - 100}% Creature Sight and Audio Range`
      break
    case 'ItemWeightReduction':
      minValue = `${(+perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Item Weight`
      maxValue = `${(+perk.attributeOverrides.minValue * 100) - 100}% Item Weight`
      break
    case 'BagSizeIncrease':
      minValue = `+${perk.attributeOverrides.minValue} Capacity`
      maxValue = `+${perk.attributeOverrides.calculatedMaxValue} Capacity`
      break
    case 'ExplosiveDamageScaling':
      minValue = `${(+perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Damage`
      maxValue = `${(+perk.attributeOverrides.minValue * 100) - 100}% Damage`
      break
    case 'CarriedWeightReduction':
      minValue = `${(+perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Weight`
      maxValue = `${(+perk.attributeOverrides.minValue * 100) - 100}% Weight`
      break
    case 'CarriedWeightReductionFauna':
      minValue = `${(+perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Weight`
      maxValue = `${(+perk.attributeOverrides.minValue * 100) - 100}% Weight`
      break
    case 'CarriedWeightReductionAmmo':
      minValue = `${(+perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Weight`
      maxValue = `${(+perk.attributeOverrides.minValue * 100) - 100}% Weight`
      break
    case 'CarriedWeightReductionWeapons':
      minValue = `${(+perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Weight`
      maxValue = `${(+perk.attributeOverrides.minValue * 100) - 100}% Weight`
      break
    case 'MaxWalkSpeedScaling':
      minValue = `${Math.round((+perk.attributeOverrides.minValue - 1) * 100)}% Walk Speed`
      maxValue = `${Math.round((+perk.attributeOverrides.calculatedMaxValue - 1) * 100)}% Walk Speed`
      break
    case 'ShieldArmorScaling':
      minValue = `+${perk.attributeOverrides.minValue} Armor`
      maxValue = `+${perk.attributeOverrides.calculatedMaxValue} Armor`
      break
  }

  return { minValue, maxValue }
}