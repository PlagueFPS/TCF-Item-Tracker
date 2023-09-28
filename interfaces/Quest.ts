export interface Quest {
  inGameName:        string;
  description:       string;
  faction:           Faction;
  factionReputation: number;
  difficulty:        Difficulty;
  failConditions:    any[];
  image:             string;
  objectives:        Objective[];
  rewards:           Reward[];
  unlockLevel:       number;
  unlockContracts:   string[];
  isMainChain:       boolean;
  chainName:         string;
  chainDescription:  string;
  chainImage:        string;
  chainPart:         number;
  key:               string;
}

export interface Reward {
  item:                string;
  amount:              number;
  isEndOfChainReward?: boolean;
  isUnlockReward?:     boolean;
}

export interface Objective {
  type:                ObjectiveType;
  maxProgress:         number;
  itemToOwn?:          string;
  locationConditions:  string[];
  killConditions?:     KillConditions;
  m_mapName?:          string;
  m_anyLootContainer?: boolean;
  container?:          string;
  deadDropLocation?:   string;
  deadDropItem?:       string;
  faction?:            string;
}

interface KillConditions {
  m_killTarget:                MKillTarget;
  m_allowedWeaponCategories:   string[];
  m_allowedSpecificWeapons:    MSpecificVariationToKill[];
  m_specificAIEnemyTypeToKill: MSpecificAIEnemyTypeToKill;
  m_specificVariationToKill:   MSpecificVariationToKill;
  m_mapName:                   MMapName;
  m_onlyDuringStorm:           boolean;
}

interface MSpecificVariationToKill {
  DataTable: DataTable | null;
  RowName:   string;
}

interface DataTable {
  ObjectName: ObjectName;
  ObjectPath: ObjectPath;
}

type Difficulty = "Invalid";

type Faction = "Korolev" | "ICA" | "Osiris" | "Badum";


 type ObjectName = "DataTable PRO_Weapons" | "DataTable Ai_Tuning_DT";

 type ObjectPath = "Prospect/Content/DataTables/Items/PRO_Weapons.0" | "Prospect/Content/AI/Datatables/Ai_Tuning_DT.0";

 type MKillTarget = "EYKillTypeAction::Creatures" | "EYKillTypeAction::Players" | "EYKillTypeAction::All";

 export type MMapName = "" | "MP_Map01_P" | "MP_Map02_P" | "MP_AlienCaverns_P";

 type MSpecificAIEnemyTypeToKill = "EYEnemyType::Strider" | "EYEnemyType::None" | "EYEnemyType::Rattler" | "EYEnemyType::Weremole" | "EYEnemyType::Crusher" | "EYEnemyType::Howler" | "EYEnemyType::GlowBeetle_Blast";

 type ObjectiveType = "OwnNumOfItem" | "Kills" | "LootContainer" | "VisitArea" | "DeadDrop" | "FactionLevel";
