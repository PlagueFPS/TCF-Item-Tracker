import { CraftItem } from "@/interfaces/Craft";
import { Item } from "@/interfaces/Item";
import { Faction, MMapName, Objective, Reward } from "@/interfaces/Quest";
import { UpgradeCost } from "@/interfaces/Upgrade";
import getGameData from "./getGameData";
import { Location } from "@/interfaces/Location";

interface Cosmetics {
  [key: string]: any
}

interface Containers {
  [key: string]: string
}

export const getObjectives = async (objective: Objective) => {
  const items = await getGameData('items') as Item[]

  switch(objective.type) {
    case 'OwnNumOfItem':
      const numOfItem = await OwnNumOfItem(objective)
      return numOfItem
    case 'VisitArea':
      const areaToVisit = await getLocation(objective.locationConditions[0])
      return areaToVisit
    case 'DeadDrop':
      const itemToStash = items.find(item => item.key === objective.deadDropItem)?.inGameName
      return `Stash ${objective.maxProgress.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")} ${itemToStash} in the dead drop at ${objective.deadDropLocation}`
    case 'Kills': 
      const tasks = await killTasks(objective)
      return tasks
    case 'LootContainer': 
      return lootContainerTask(objective)
    case 'FactionLevel':
      const faction = objective.faction
      if (faction) return `Reach level ${objective.maxProgress} with ${faction}`
  }
}

export const getTaskItems = async (objectives: Objective[]) => {
  const items = await getGameData('items') as Item[]
  const taskItems: Item[] = []
  objectives.forEach(objective => {
    
    // finds matching item and assigns in-game amount required to item's amount
    switch(objective.type) {
      case 'OwnNumOfItem':
        const itemToOwn = items.find(item => item.key === objective.itemToOwn)
        if (itemToOwn) {
          itemToOwn.amount = objective.maxProgress
          taskItems.push(itemToOwn)
        }
        break
      case 'DeadDrop':
        const deadDropItem = items.find(item => item.key === objective.deadDropItem)
        if (deadDropItem) {
          deadDropItem.amount = objective.maxProgress
          taskItems.push(deadDropItem)
        }
        break
    }
  })

  return taskItems
}

export const getItemImage = async (itemName: string) => {
  const items = await getGameData('items') as Item[]
  const item = items.find(item => item.inGameName === itemName || item.key === itemName)

  // after finding matching item converts itemName into an image suitable format
  let image = itemName.toLowerCase().replace(/\s/g, '')
    .replace("basictacticalshields", "basicshields")
    .replace("basicrestorativeshields", "basicshields")
    .replace("basictacticalhelmet", "basichelmet")
    .replace("basicrestorativehelmet", "basichelmet")
    .replace("standardtacticalshields", "standardshields")
    .replace("standardrestorativeshields", "standardshields")
    .replace("standardtacticalhelmet", "standardhelmet")
    .replace("standardrestorativehelmet", "standardhelmet")
    .replace("reinforcedtacticalshields", "reinforcedshields")
    .replace("reinforcedrestorativeshields", "reinforcedshields")
    .replace("reinforcedrestorativehelmet", "reinforcedhelmet")
    .replace("reinforcedtacticalhelmet", "reinforcedhelmet")
    .replace("combattacticalshields", "combatshields")
    .replace("combatrestorativeshields", "combatshields")
    .replace("combatrestorativehelmet", "combathelmet")
    .replace("combattacticalhelmet", "combathelmet")
    .replace("enhancedtacticalhelmet", "enhancedhelmet")
    .replace("enhancedrestorativehelmet", "enhancedhelmet")
    .replace("enhancedshields", "combatshields")
    .replace("enhancedrestorativeshields", "combatshields")
    .replace("enhancedtacticalshields", "combatshields")
    .replace("#2f53", "")
    .replace("#d027", "")
    .replace("#a45d", "")
    .replace("hugeforgedbackpack", "forgedbackpack")
    .replace("#473-d", "")
    .replace("extraarmor(shield)", "extraarmor")
    .replace("extraarmor(helmet)", "extraarmor")
    .replace("reducedweightofallitemscarriedinbackpack", "weight")

  if (item?.key.includes('Map01')) image = 'yellowkeycard'
  else if (item?.key.includes('Map02')) image = 'bluekeycard'
  else if (item?.key.includes('Map03')) image = 'blackkeycard'

  return `/images/${image}`
}

export const getRewards = async (faction: Faction, rewards: Reward[]) => {
  const items = await getGameData('items') as Item[]
  const cosmetics = await getGameData('cosmetics') as Cosmetics
  const newRewards: Reward[] = []

  // orders rewards as in-game
  rewards.forEach((reward) => {
    if (reward.item === 'SoftCurrency') newRewards.splice(0, 0, reward)
    else if (reward.item.includes('Reputation') && reward.amount > 0) newRewards.splice(1, 0, reward)
    else if (reward.item.includes('Scrip')) newRewards.splice(2, 0, reward)
    else if (reward.amount > 0) newRewards.push(reward)
  })

  // convert reward items to in-game names
  newRewards.map(reward => {
    const item = items.find(item => item.key === reward.item)?.inGameName
    let cosmeticItem

    for (const keys in cosmetics) {
        for (const cosmetic in cosmetics[keys]) {
            if (cosmetic === reward.item) cosmeticItem = cosmetics[keys][cosmetic]
        }
    }

    if (item) reward.item = item
    else if (reward.item === 'Banner_SynthFace_Anim') reward.item = 'Powered Up Banner'
    else if (reward.item === 'SyndicateEnforcer02_Gloves') reward.item = 'Wrangler Gloves'
    else if (reward.item === 'DarkUnboundSynth') reward.item = 'Tempest Archetype'
    else if (reward.item === 'Melee_Karambit01') reward.item = "Tempest's Strike Melee"
    else if (cosmeticItem) reward.item = cosmeticItem.ingamename
    else if (reward.item.includes('Reputation')) reward.item = `${faction} Reputation`
    else if (reward.item === 'SoftCurrency') reward.item = 'Kmarks'
    else if (reward.item === 'ShockGrenade_02') reward.item = 'Light Grenade'
    else if (reward.item === 'TOOL_Mining_01') reward.item = 'Heavy Mining Tool'
  })

  return newRewards
}

export const getCosts = async (costs: { [key: string]: number | undefined }) => {
  const items = await getGameData('items') as Item[]
  const newCosts: UpgradeCost[] = []

  // convert items to in-game names and structure objects for each cost
  for (const cost in costs) {
    const item = items.find(item => item.key === cost || item.inGameName === cost)?.inGameName

    if (item) newCosts.push({ item: item, amount: costs[cost] ?? 0 })
    else if (cost === 'SoftCurrency') newCosts.splice(0, 0, { item: 'Kmarks', amount: costs[cost] ?? 0 })
    else newCosts.push({ item: `[${cost}]`, amount: costs[cost] ?? 0 })
  }

  return newCosts
}

export const getCraftCosts = async (costs: { [key: string]: CraftItem }) => {
  const items = await getGameData('items') as Item[]
  const newCosts: CraftItem[] = []

  // convert items to in-game names and structures object for each cost
  for (const cost in costs) {
    const item = items.find(item => item.key === cost || item.inGameName === cost)?.inGameName

    if (item) newCosts.push({ inGameName: costs[cost].inGameName, amount: costs[cost].amount })
    else if (cost === 'SoftCurrency') newCosts.splice(0, 0, { inGameName: 'Kmarks', amount: costs[cost].amount })
    else newCosts.push({ inGameName: `[${cost}]`, amount: costs[cost].amount })
  }

  return newCosts
}

const OwnNumOfItem = async (objective: Objective) => {
  // finds matching item and constructs our output sentence using it's in-game name
  const items = await getGameData('items') as Item[]
  const itemKey = objective.itemToOwn
  const item = items.find(item => item.key === itemKey)

  return `Deliver ${objective.maxProgress.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")} ${item?.inGameName}`
}

const killTasks = async (objective: Objective) => {
  const items = await getGameData('items') as Item[]
  const killConditions = objective.killConditions
  const killAmount = objective.maxProgress
  const locationToKill = await getLocation(objective.locationConditions[0], true)
  const onlyDuringStorm = killConditions?.m_onlyDuringStorm
  const weaponCategoryToKillWith = killConditions?.m_allowedWeaponCategories && getWeaponCategory(killConditions.m_allowedWeaponCategories)
  const mapToKill = killConditions?.m_mapName && getMap(killConditions?.m_mapName)
  let target = killConditions?.m_killTarget
  let targetString = ''
  let amountString = killAmount > 1 ? 's' : ''

  // Gather target to kill information
  switch(target) {
    case 'EYKillTypeAction::Creatures':
      let specificCreature = killConditions?.m_specificAIEnemyTypeToKill.replace('EYEnemyType::', '')
      let specificCreatureVariant = killConditions?.m_specificVariationToKill.RowName

      if (specificCreature === 'None' && specificCreatureVariant !== 'None' && killConditions?.m_specificVariationToKill.DataTable !== null) {
        specificCreature = specificCreatureVariant?.replace('_2', '').replace('_3', '')
      }

      // constructs kill creature information
      switch(specificCreature) {
        default: 
          targetString = specificCreature + amountString
        case 'None':
          targetString = 'Creature' + amountString
          break
        case 'Weremole':
          if (specificCreatureVariant && specificCreatureVariant.includes('2')) targetString = 'Savage Marauder' + amountString
          if (!targetString) targetString = 'Marauder' + amountString
          break
        case 'GlowBeetle_Blast':
          targetString = 'Blast Tick' + amountString
          break
        case 'GlowBeetle_Acid':
          targetString = 'Acid Tick' + amountString
          break
        case 'Rattler':
          if (specificCreatureVariant && specificCreatureVariant.includes('2')) targetString = 'Mature Rattler' + amountString
          if (!targetString) targetString = 'Rattler' + amountString
          break
        case 'Strider':
          if (specificCreatureVariant && specificCreatureVariant.includes('3')) targetString = 'Heavy Strider' + amountString
          if (!targetString) targetString = 'Strider' + amountString
          break
        case 'Crusher':
          if (specificCreatureVariant && specificCreatureVariant.includes('2')) targetString = 'Alpha Crusher' + amountString
          if (!targetString) targetString = 'Crusher' + amountString
          break
      }
    break
    case 'EYKillTypeAction::Players':
      // constructs kill player information
      targetString = 'Prospector' + amountString
      break
    case 'EYKillTypeAction::All':
      // constructs kill all information
      targetString = 'Creatures or Prospectors' + amountString
  }

  // Gather weapon to kill with information
  let weaponString = ''

  if (killConditions && killConditions.m_allowedWeaponCategories.length > 0) weaponString = 'with a' + weaponCategoryToKillWith
  else if (killConditions && killConditions.m_allowedSpecificWeapons.length > 4) {
    let weapons = killConditions.m_allowedSpecificWeapons
    const weapon = items.find(item => item.key === weapons[0].RowName)?.inGameName

    if (weapons.length === 1 && weapon) weaponString = weapon
    else if (weapons[0].RowName.includes('WP_A')) weaponString = 'with an Korolev weapon'
    else if (weapons[0].RowName.includes('WP_G')) weaponString = 'with an Osiris weapon'
    else if (weapons[0].RowName.includes('WP_D')) weaponString = 'with an ICA weapon'
  }
  else if (killConditions && killConditions.m_allowedSpecificWeapons.length === 1) {
    weaponString = ' with the ' + items.find(item => item.key === killConditions.m_allowedSpecificWeapons[0].RowName)?.inGameName
  }
  else if (killConditions && killConditions.m_allowedSpecificWeapons.length < 5 && killConditions.m_allowedSpecificWeapons.length > 0) {
    let weapons = killConditions.m_allowedSpecificWeapons
    weaponString += ' with any of: '
    weapons.forEach((weapon, index) => {
      weaponString += items.find(item => item.key === weapon.RowName)?.inGameName
      if (index !== weapons.length - 1) weaponString += ', '
    })
  }

  // Gather location to kill in information
  let locationString = ''
  let stormString = ''

  if (onlyDuringStorm) stormString = 'during an active storm'

  if (objective.locationConditions.length) locationString = ' at ' + locationToKill
  else if (killConditions?.m_mapName) {
      locationString = 'on ' + mapToKill
  }

  // constructed output string
  const killString = `Kill ${killAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")} ${targetString} ${weaponString} ${locationString} ${stormString}`
  return killString
}

const lootContainerTask = (objective: Objective) => {
  let container = objective.container
  let containerAmount = objective.maxProgress > 1 ? 's' : ''
  let locationToLoot = ''

  if (container === 'PowerupContainer') return `Loot ${objective.maxProgress} Powerup Container${containerAmount}`

  // if the container isn't a puzzle room container searches for it's name, other wise uses a default
  container = container ? alphabeticalContainers[container] : 'Container'

  // constructs our output sentence
  if (objective.locationConditions.length > 0) locationToLoot = ` at ${objective.locationConditions[0]}`
  return `Loot ${objective.maxProgress.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")} ${container}${containerAmount} ${locationToLoot}`
}

const getWeaponCategory = (categories: string[]) => {
  const convertedCategories = categories.map(category => {
    
    // converts categories raw name into in-game name
    switch(category) {
        case 'EYDeviceCategory::AssaultRifle':
            return 'Assault Rifle'
        case 'EYDeviceCategory::SMG':
            return 'SMG'
        case 'EYDeviceCategory::LMG':
            return 'LMG'
        case 'EYDeviceCategory::SniperRifle':
            return 'Sniper'
        case 'EYDeviceCategory::Shotgun':
            return 'Shotgun'
        case 'EYDeviceCategory::Pistol':
            return 'Pistol'
    }
})

return convertedCategories[0]
}

const getMap = (mapName: MMapName) => {
  let map = ''

  // converts maps code name into the in-game name
  switch(mapName) {
    case 'MP_Map01_P':
      return map = 'Bright Sands'
    case 'MP_Map02_P':
      return map = 'Crescent Falls'
    case 'MP_AlienCaverns_P':
      return map = 'Tharis Island'
  }

  return map
}

const getLocation = async (location: string, killLocation?: boolean) => {
  const locationData = await getGameData('locations') as Location
    const itemsToFind = [
        "Old Howler Data",
        "Korolev Prospector Pods",
        "Korolev Prospectors",
        "Howler Dossier",
        "Gregor's Dossier",
        "Audio Decoy Schematics",
        "Missing Wildlife Photographer",
        "assassinated Osiris Head Scientist",
        "Chief Engineer",
        "Advanced Analysis Toolkit",
        "Osiris Door Fragment",
        "Tharis Caverns Holo-Map",
        "SOS Sign",
        "Howler Combat Tips",
        "Security Camera Footage",
        "Flora Sample",
        "Med Stims Formula",
        "Crystalline Material Research",
        "Fossil Area in East Caverns",
        "Extinct Creatures Lab",
        "the Lost Scientist",
        "the Frozen Scientist",
        "Osiris Researchers",
        "Surveyor Pod 1",
        "Surveyor Pod 2",
        "Surveyor Pod 3",
        "First Cave Marking",
        "Second Cave Marking",
        "Third Cave Marking",
        "and Inspect the Forge Console",
        "Cultist Scribblings",
        "Shredded Armor Panel",
        "the Feeding Grounds east of Water Facility",
        "the Feeding Grounds between Woodcutter Camp and Waterfall Labs",
        "the Feeding Grounds on the south end of Dig Site",
        "Auditory Organ",
    ]

    // if the location passed is empty or doesn't exist exit the function
    if (!location) return ""

    // replaces locations raw name to either the in-game name or the codename within locations.json
    location = location
        .replace("Map", "MAP")
        .replace("StarportPad", "StarportLandingPad")
        .replace("VaccineLabs", "VaccineLab")
        .replace("JungleFallenTree", "FallenTree")
        .replace("JungleFavela", "Favela")
        .replace("SkeletonObservation", "SkeletonObservatory")
        .replace("AlienQuarry", "CrystalCave")
        .replace("Contracts_LetiumLocations", "Letium Vent")
        .replace("PowerPlant", "Powerplant")
        .replace("OsirisWildlife", "Wildlife")
        .replace("KorolevOutpost2", "KorolevCoreOutpost")
        .replace("OsirisOutpost2", "OsirisOffices")
        .replace("GlowingWaterCave", "SparklingWaters")
        .replace("DesertPinnacleLabs", "PinnacleLabs")
        .replace("UniqueMissionLocation_", "")
        .replace("VadimPreItem", "Gregor's Dossier")
        .replace("SlaughteredResearcher", "Osiris Researchers")
        .replace("AbandonedOilField", "Abandoned Oil Field")
        .replace("MissingEngineerBody", "the Missing Engineer")
        .replace("MAP01_EastKorolevStation_PowerUpLoot", "East Collection Point Loot Room")
        .replace("GlowWormCave", "CaveofStars")
        .replace("KORHowlerEvidence2", "Old Howler Data")
        .replace("KORHowlerProspectorPods", "Korolev Prospector Pods")
        .replace("KORHowlerProspector1", "Korolev Prospectors")
        .replace("KORHowlerEvidence1", "Howler Dossier")
        .replace("Visit4Wheeler1", "First Mining Machine")
        .replace("Visit4Wheeler2", "Second Mining Machine")
        .replace("Visit4Wheeler3", "Third Mining Machine")
        .replace("OldDrillHead", "Old Drill Head")
        .replace("ICAAudioDecoyPlans", "Audio Decoy Schematics")
        .replace("ICAHowlerWildlifePhotographer", "Missing Wildlife Photographer")
        .replace("OsiHeadScientist", "assassinated Osiris Head Scientist")
        .replace("ChiefEngineer", "Chief Engineer")
        .replace("AnalysisTool", "Advanced Analysis Toolkit")
        .replace("AlienDoorFragment", "Osiris Door Fragment")
        .replace("OsirisHoloMAP", "Tharis Caverns Holo-Map")
        .replace("WorkerGroup1", "Worker Group 1")
        .replace("WorkerGroup2", "Worker Group 2")
        .replace("WorkerGroup3", "Worker Group 3")
        .replace("PowerplantOfficeMAP2", "Geothermal Plant Office")
        .replace("PowerplantOfficeMAP1", "Bright Sands Power Plant Office")
        .replace("HouseOnStiltsAtNorthUplink", "the House on Stilts")
        .replace("SosSign", "SOS Sign")
        .replace("ICAHowlerProspector", "Howler Combat Tips")
        .replace("CentralBaseCampOffice", "Security Camera Footage")
        .replace("OSIIvySample", "Flora Sample")
        .replace("OSIStrongStimRecipe", "Med Stims Formula")
        .replace("OSICrystalCaveClue", "Crystalline Material Research")
        .replace("FossilAreaEastCaverns", "Fossil Area in East Caverns")
        .replace("ExtinctCreaturesLab", "Extinct Creatures Lab")
        .replace("InsideCrashedShip", "Crashed Ship Freighter")
        .replace("LostScientist", "the Lost Scientist")
        .replace("FrozenEngineer", "the Frozen Scientist")
        .replace("OsirisResearchBall1", "Surveyor Pod 1")
        .replace("OsirisResearchBall2", "Surveyor Pod 2")
        .replace("OsirisResearchBall3", "Surveyor Pod 3")
        .replace("Marking1", "First Cave Marking")
        .replace("Marking2", "Second Cave Marking")
        .replace("Marking3", "Third Cave Marking")
        .replace("ForgeConsole", "and Inspect the Forge Console")
        .replace("ShieldRecipe", "Cultist Scribblings")
        .replace("OSIHowlerDestruction", "Shredded Armor Panel")
        .replace("OSIHowlerClue1", "the Feeding Grounds east of Water Facility")
        .replace("OSIHowlerClue2", "the Feeding Grounds between Woodcutter Camp and Waterfall Labs")
        .replace("OSIHowlerClue3", "the Feeding Grounds on the south end of Dig Site")
        .replace("OSIHowlerNest1", "Auditory Organ")

    if (locationData[location]) return `Visit ${locationData[location]["name"]}`
    else if (itemsToFind.some(item => item === location)) return `Find ${location}`
    else if (killLocation) return location
    else if (location) return `Visit ${location}`
    else return ""
}

const alphabeticalContainers: Containers = {
  AmmoContainer: "Ammo Box",
  AlienContainer: "Alien Vent",
  AbilityBox: "Consumable Box",
  OrganicsBox: "Cooler",
  FactoryContainer: "Dumpster",
  HiddenStash: "Hidden Stash",
  KorolevContainer: "Industrial Container",
  Jacket: "Jacket",
  Locker: "Locker",
  Luggage: "Luggage",
  MedCase: "Med Case",
  WeaponCrate: "Military Crate",
  Safe: "Safe",
  SuitCase: "Suit Case",
  FilingCabinet: "Osiris Filing Cabinet"
}