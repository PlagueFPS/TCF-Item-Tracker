import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeContactFields {
  title: EntryFieldTypes.Symbol;
  body: EntryFieldTypes.RichText;
}

export type TypeContactSkeleton = EntrySkeletonType<TypeContactFields, "contact">;
export type TypeContact<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeContactSkeleton, Modifiers, Locales>;

export interface TypeGeneralPagesFields {
  title: EntryFieldTypes.Symbol;
  description: EntryFieldTypes.Symbol;
  featuredImage: EntryFieldTypes.AssetLink;
  images?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}

export type TypeGeneralPagesSkeleton = EntrySkeletonType<TypeGeneralPagesFields, "generalPages">;
export type TypeGeneralPages<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeGeneralPagesSkeleton, Modifiers, Locales>;

export interface TypeUpdateFields {
  title: EntryFieldTypes.Symbol;
  date: EntryFieldTypes.Date;
  body: EntryFieldTypes.RichText;
}

export type TypeUpdateSkeleton = EntrySkeletonType<TypeUpdateFields, "update">;
export type TypeUpdate<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeUpdateSkeleton, Modifiers, Locales>;