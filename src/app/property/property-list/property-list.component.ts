import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from '../IProperty.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  SellRent = 1;
  properties: Array<IProperty>;
  Today = new Date();

  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService
  ) {
    this.properties = [];
  }

  ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.SellRent = 2; // Means we are on rent-property URL else we are on base URL
    }

    this.housingService.getAllProperties(this.SellRent).subscribe(
      (data: any) => {
        this.properties = data;
        const newProperty = JSON.parse(localStorage.getItem('newProp'));
        if (newProperty.SellRent === this.SellRent) {
          this.properties = [newProperty, ...this.properties];
        }
        console.log(data);
      },
      (error: any) => {
        console.log('httperror:');
        console.log(error);
      }
    );
  }
}
