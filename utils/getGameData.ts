import { DataStrings } from "@/types/DataStrings";
import { Craft, RawCraft } from "@/interfaces/Craft";
import { ForgeRecipe, RawRecipe } from "@/interfaces/ForgeRecipe";
import { Item } from "@/interfaces/Item";
import { Material } from "@/interfaces/Material";
import { Quest } from "@/interfaces/Quest";
import { Cosmetic } from "@/interfaces/Cosmetic";
import { Location } from "@/interfaces/Location";
import { DataTypes } from "@/types/DataTypes";
import materials from '@/data/materials.json'
import items from '@/data/items.json'
import missions from '@/data/missions.json'
import personalQuarters from '@/data/personalQuarters.json'
import locations from '@/data/locations.json'
import cosmetics from '@/data/cosmetics.json'
import printing from '@/data/printing.json'
import attachments from '@/data/attachments.json'
import shields from '@/data/shields.json'
import helmets from '@/data/helmets.json'
import consumables from '@/data/consumables.json'
import forgePerks from '@/data/forgePerks.json'

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

export default async function getGameData(filename: DataStrings, filtered?: boolean): Promise<DataTypes[] | Location | Cosmetic> {
  switch(filename) {
    case 'materials': {
      const materialData = materials as Material[]
      const filteredMaterials = materialData.filter(item => 
        tagsToExclude.every(tag => !item.tags.includes(tag) && item.tags.length) && 
        itemsToExclude.every(i => item.inGameName !== i))
      
      return filteredMaterials
    }
    case 'items': {
      const itemsData = items as Item[]
      const filteredItems = itemsData.filter(item => {
        return tagsToExclude.every(tag => !item.tags.includes(tag) && item.tags.length) && 
        itemsToExclude.every(i => item.inGameName !== i)
      })
      
      return filtered ? filteredItems : itemsData
    }
    case 'missions': {
      const missionData = missions as Quest[]
      return missionData
    }
    case 'personalQuarters': {
      const quarters: any = personalQuarters[0]
      const rawUpgrades: any = personalQuarters[1]
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
      const printingData: any = printing
      const itemsData = items as Item[]
      const crafts: Craft[] = printingData.map((craft: RawCraft) => {
        const item = itemsData.find((item: Item) => item.key === craft.key)
        const effects = getItemEffect(craft)

        if (item && item.type === 'attachment' || item && item.type === 'consumable') return {
          ...craft, 
          inGameName: item.inGameName, 
          rarity: item.rarity, 
          description: item.description,
          effects: effects
        }
        else if (item && item.type === 'shield' || item && item.type === 'helmet') {
          const shieldData = shields
          const helmetData = helmets
          const shield = shieldData.find(shield => shield.key === item.key)
          const helmet = helmetData.find(helmet => helmet.key === item.key)

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
      })

      return crafts
    }
    case 'forgePerks': {
      const perkData = forgePerks as RawRecipe[]
      const perks: ForgeRecipe[] = perkData.map(perk => {
        let inGameName = perk.description
        const { minValue, maxValue } = getPerkMinMax(perk)
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
      })

      return perks
    }
    case 'locations': {
      const locationData = locations as Location
      return locationData
    }
    case 'cosmetics': {
      const cosmeticsData = cosmetics as Cosmetic
      return cosmeticsData
    }
  }
}

const getItemEffect = (craft: RawCraft) => {
  if (craft.type === 'attachment') return getAttachmentEffect(craft)
  else if (craft.type === 'consumable') return getConsumableEffect(craft)
}

const getAttachmentEffect = (craft: RawCraft) => {
  const attachmentData = attachments
  const attachment = attachmentData.find(attachment => attachment.key === craft.key)
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

const getConsumableEffect = (craft: RawCraft) => {
  const consumablesData = consumables
  const consumable = consumablesData.find(consumable => consumable.key === craft.key)
  let effect = ''
  switch(consumable?.action?.attribute) {
    case 'CurrentHealth':
      effect = `+${consumable.action.value} HP`
      break
  }

  return [effect]
}

const getPerkMinMax = (recipe: RawRecipe) => {
  const perkData = forgePerks
  const perk = perkData.find(perk => recipe.key === perk.key)
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
      minValue = `${(perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Duration`
      maxValue = `${(perk.attributeOverrides.minValue * 100) - 100}% Duration`
      break
    case 'MaxStamina':
      minValue = `+${perk.attributeOverrides.minValue} Stamina`
      maxValue = `+${perk.attributeOverrides.calculatedMaxValue} Stamina`
      break
    case 'StaminaConsumptionRate':
      minValue = `${(perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Stamina Consumption`
      maxValue = `${(perk.attributeOverrides.minValue * 100) - 100}% Stamina Consumption`
      break
    case 'DamageScalingReceivedFromStorm':
      minValue = `${(perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Damage`
      maxValue = `${(perk.attributeOverrides.minValue * 100) - 100}% Damage`
      break
    case 'DamageScalingReceivedFromAI':
      minValue = `${(perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Damage`
      maxValue = `${(perk.attributeOverrides.minValue * 100) - 100}% Damage`
      break
     case 'FallingDamageReduction':
      minValue = `${(perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Damage`
      maxValue = `${(perk.attributeOverrides.minValue * 100) - 100}% Damage`
      break
    case 'HelmetArmorScaling':
      minValue = `+${perk.attributeOverrides.minValue} Armor`
      maxValue = `+${perk.attributeOverrides.calculatedMaxValue} Armor`
      break
    case 'StaminaRegenerationDelayScaling':
      minValue = `${(perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Delay`
      maxValue = `${(perk.attributeOverrides.minValue * 100) - 100}% Delay`
      break
    case 'AIDetectionHearingModifier':
      minValue = `${(perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Creature Sight and Audio Range`
      maxValue = `${(perk.attributeOverrides.minValue * 100) - 100}% Creature Sight and Audio Range`
      break
    case 'ItemWeightReduction':
      minValue = `${(perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Item Weight`
      maxValue = `${(perk.attributeOverrides.minValue * 100) - 100}% Item Weight`
      break
    case 'BagSizeIncrease':
      minValue = `+${perk.attributeOverrides.minValue} Capacity`
      maxValue = `+${perk.attributeOverrides.calculatedMaxValue} Capacity`
      break
    case 'ExplosiveDamageScaling':
      minValue = `${(perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Damage`
      maxValue = `${(perk.attributeOverrides.minValue * 100) - 100}% Damage`
      break
    case 'CarriedWeightReduction':
      minValue = `${(perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Weight`
      maxValue = `${(perk.attributeOverrides.minValue * 100) - 100}% Weight`
      break
    case 'CarriedWeightReductionFauna':
      minValue = `${(perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Weight`
      maxValue = `${(perk.attributeOverrides.minValue * 100) - 100}% Weight`
      break
    case 'CarriedWeightReductionAmmo':
      minValue = `${(perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Weight`
      maxValue = `${(perk.attributeOverrides.minValue * 100) - 100}% Weight`
      break
    case 'CarriedWeightReductionWeapons':
      minValue = `${(perk.attributeOverrides.calculatedMaxValue * 100) - 100}% Weight`
      maxValue = `${(perk.attributeOverrides.minValue * 100) - 100}% Weight`
      break
    case 'MaxWalkSpeedScaling':
      minValue = `${Math.round((perk.attributeOverrides.minValue - 1) * 100)}% Walk Speed`
      maxValue = `${Math.round((perk.attributeOverrides.calculatedMaxValue - 1) * 100)}% Walk Speed`
      break
    case 'ShieldArmorScaling':
      minValue = `+${perk.attributeOverrides.minValue} Armor`
      maxValue = `+${perk.attributeOverrides.calculatedMaxValue} Armor`
      break
  }

  return { minValue, maxValue }
}

