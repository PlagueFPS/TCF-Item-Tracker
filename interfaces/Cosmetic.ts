export interface Cosmetic {
  Droppods:    { [key: string]: Banner };
  Charms:      { [key: string]: Banner };
  Sprays:      { [key: string]: Banner };
  Emotes:      { [key: string]: Banner };
  WeaponSkins: { [key: string]: Banner };
  Melees:      { [key: string]: Banner };
  Banners:     { [key: string]: Banner };
}

export interface Banner {
  ingamename:        string;
  description:       string;
  image:             string;
  shopImage:         string;
  rarity:            Rarity;
  tags:              Tag[];
  priceHardCurrency: number;
  priceRealMoney:    number;
  exclusiveWeapon?:  string[];
}

export type Rarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Invalid" | "Exotic";

export type Tag = "Vanity.Type.Banner" | "Vanity.Type.WeaponCharm" | "Vanity.Type.DropPod" | "Vanity.Type.NormalEmote" | "Vanity.Type.MeleeWeapon" | "Vanity.Type.Spray" | "Vanity.Type.WeaponCoating" | "Vanity.Type.WeaponSkin";
