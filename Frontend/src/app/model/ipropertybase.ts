export interface IPropertyBase {
  Id: number;
  SellRent: number;
  Name: string;
  PropertyType: string;
  FurnishingType: string;
  Price: number;
  BHK: number;
  BuiltArea: number;
  City: string;
  ReadyToMove: boolean;
  Photo?: string;
  EstPossessionOn?: string;
}
