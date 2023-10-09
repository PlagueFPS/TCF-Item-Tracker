export interface RawRecipe {
  description:        string;
  elite:              boolean;
  equipment:          RawEquipment[] | Equipment[];
  items:              { [key: string]: number };
  attributes:         Attribute[];
  attributeOverrides: AttributeOverrides;
  key:                string;
}

interface AttributeOverrides {
  minValue:           number | string;
  stepGranularity:    number;
  numSteps:           number;
  calculatedMaxValue: number | string;
}

interface Attribute {
  attribute:      string;
  type:           Type;
  value:          number;
  minValue:       number;
  duration:       number;
  lerpTime:       number;
  lerpStartValue: number;
  lerpEndValue:   number;
  runtimeValue:   number;
}

type Type = "EYGPAModifierType::Additive" | "EYGPAModifierType::Multiplicitive_PreAdd" | "EYGPAModifierType::Override" | "EYGPAModifierType::Multiplicitive_PostAdd";

type RawEquipment = "Equipment.Helmet" | "Equipment.Shield" | "Equipment.Back Item";

type Equipment = "Backpack" | "Helmet" | "Shield" | undefined

export interface ForgeRecipe extends RawRecipe {
  inGameName: string
  equipment: Equipment[]
}