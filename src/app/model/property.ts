import { IPropertyBase } from './ipropertybase';
import { Photo } from './photo';

export class Property implements IPropertyBase {
  Id: number;
  SellRent: number;
  Name: string;
  PropertyTypeId: number;
  PropertyType: string;
  BHK: number;
  FurnishingTypeId: number;
  FurnishingType: string;
  Price: number;
  BuiltArea: number;
  CarpetArea?: number;
  Address: string;
  Address2?: string;
  CityId: number;
  City: string;
  FloorNo?: string;
  TotalFloors?: string;
  ReadyToMove: boolean;
  Age?: string;
  MainEntrance?: string;
  Security?: number;
  Gated?: boolean;
  Maintenance?: number;
  EstPossessionOn?: string;
  Photo?: string;
  Description?: string;
  Photos?: Photo[];
}
