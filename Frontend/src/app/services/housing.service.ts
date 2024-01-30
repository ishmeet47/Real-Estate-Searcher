import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Property } from '../model/property';
import { environment } from '../../environments/environment';
import { Ikeyvaluepair } from '../model/IKeyValuePair';
import { IProperty } from '../property/IProperty.interface';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllCities(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + '/city/cities');
  }

  // getPropertyTypes(): Observable<Ikeyvaluepair[]> {
  //   return this.http.get<Ikeyvaluepair[]>(this.baseUrl + '/propertytype/list');
  // }

  // getFurnishingTypes(): Observable<Ikeyvaluepair[]> {
  //   return this.http.get<Ikeyvaluepair[]>(
  //     this.baseUrl + '/furnishingtype/list'
  //   );
  // }

  getPropertyTypes(): Ikeyvaluepair[] {
    return [
      { id: 1, name: 'House' },
      { id: 2, name: 'Apartment' },
      { id: 3, name: 'Duplex' },
    ];
  }

  getFurnishingTypes(): Ikeyvaluepair[] {
    return [
      { id: 1, name: 'Fully' },
      { id: 2, name: 'Semi' },
      { id: 3, name: 'Unfurnished' },
    ];
  }

  getProperty(id: number) {
    return this.getAllProperties().pipe(
      map((propertiesArray) => {
        return propertiesArray.find((p) => p.Id === id);
      })
    );

    // return this.http.get<Property>(
    //   this.baseUrl + '/property/detail/' + id.toString()
    // );
  }

  getAllProperties(SellRent?: number): Observable<Property[]> {
    // return this.http.get<Property[]>(
    //   this.baseUrl + '/property/list/' + SellRent.toString()
    // );
    return this.http.get('data/properties.json').pipe(
      map((data) => {
        const propertiesArray: Array<Property> = [];
        const localProperties = JSON.parse(localStorage.getItem('newProp'));

        if (localProperties) {
          for (const id in localProperties) {
            if (SellRent) {
              if (
                localProperties.hasOwnProperty(id) &&
                localProperties[id].SellRent === SellRent
              ) {
                propertiesArray.push(localProperties[id as keyof object]);
              }
            } else {
              propertiesArray.push(localProperties[id as keyof object]);
            }
          }
        }

        for (const id in data) {
          if (SellRent) {
            if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
              propertiesArray.push(data[id as keyof object]);
            }
          } else {
            propertiesArray.push(data[id as keyof object]);
          }
        }

        return propertiesArray;
      })
    );
  }
  addProperty(property: Property) {
    let newProp = [property];
    if (localStorage.getItem('newProp')) {
      newProp = [property, ...JSON.parse(localStorage.getItem('newProp'))];
    }
    localStorage.setItem('newProp', JSON.stringify(newProp));
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     Authorization: 'Bearer ' + localStorage.getItem('token'),
    //   }),
    // };
    // return this.http.post(
    //   this.baseUrl + '/property/add',
    //   property,
    //   httpOptions
    // );
  }

  newPropID() {
    if (localStorage.getItem('PID')) {
      localStorage.setItem('PID', String(+localStorage.getItem('PID') + 1));
      return +localStorage.getItem('PID');
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }

  getPropertyAge(dateofEstablishment: string): string {
    const today = new Date();
    const estDate = new Date(dateofEstablishment);
    let age = today.getFullYear() - estDate.getFullYear();
    const m = today.getMonth() - estDate.getMonth();

    // Current month smaller than establishment month or
    // Same month but current date smaller than establishment date
    if (m < 0 || (m === 0 && today.getDate() < estDate.getDate())) {
      age--;
    }

    // Establshment date is future date
    if (today < estDate) {
      return '0';
    }

    // Age is less than a year
    if (age === 0) {
      return 'Less than a year';
    }

    return age.toString();
  }

  setPrimaryPhoto(propertyId: number, propertyPhotoId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.post(
      this.baseUrl +
        '/property/set-primary-photo/' +
        String(propertyId) +
        '/' +
        propertyPhotoId,
      {},
      httpOptions
    );
  }

  deletePhoto(propertyId: number, propertyPhotoId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.delete(
      this.baseUrl +
        '/property/delete-photo/' +
        String(propertyId) +
        '/' +
        propertyPhotoId,
      httpOptions
    );
  }
}
