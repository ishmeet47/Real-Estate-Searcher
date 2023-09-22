import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Ikeyvaluepair } from 'src/app/model/IKeyValuePair';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  // @ViewChild('Form') addPropertyForm: NgForm;
  @ViewChild('formTabs') formTabs: TabsetComponent;
  addPropertyForm: FormGroup;
  nextClicked: boolean;
  property = new Property();

  // Will come from masters
  propertyTypes: Ikeyvaluepair[];
  furnishTypes: Ikeyvaluepair[];
  cityList: any[];

  propertyView: IPropertyBase = {
    Id: null,
    Name: '',
    Price: null,
    SellRent: null,
    PropertyType: null,
    FurnishingType: null,
    BHK: null,
    BuiltArea: null,
    City: '',
    ReadyToMove: null,
  };

  constructor(
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private router: Router,
    private housingService: HousingService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    if (!localStorage.getItem('userName')) {
      this.alertify.error('You must be logged in to add a property');
      this.router.navigate(['/user/login']);
    }

    this.CreateAddPropertyForm();
    // this.housingService.getAllCities().subscribe((data) => {
    //   this.cityList = data;
    //   console.log(data);
    // });
    const data1 = this.housingService.getAllCities();
    this.cityList = data1;
    console.log(data1);

    // this.housingService.getPropertyTypes().subscribe((data) => {
    //   this.propertyTypes = data;
    // });
    const data2 = this.housingService.getPropertyTypes();
    this.propertyTypes = data2;

    // this.housingService.getFurnishingTypes().subscribe((data) => {
    //   this.furnishTypes = data;
    // });
    const data3 = this.housingService.getFurnishingTypes();
    this.furnishTypes = data3;
  }

  CreateAddPropertyForm() {
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: ['1', Validators.required],
        BHK: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required],
      }),

      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null],
        Security: [0],
        Maintenance: [0],
      }),

      AddressInfo: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],
      }),

      OtherInfo: this.fb.group({
        RTM: [null, Validators.required],
        PossessionOn: [null, Validators.required],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null],
      }),
    });
  }

  // #region <Getter Methods>
  // #region <FormGroups>
  get BasicInfo() {
    return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
  }

  get PriceInfo() {
    return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
  }

  get AddressInfo() {
    return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
  }

  get OtherInfo() {
    return this.addPropertyForm.controls['OtherInfo'] as FormGroup;
  }
  // #endregion

  // #region <Form Controls>
  get SellRent() {
    return this.BasicInfo.controls['SellRent'] as FormControl;
  }

  get BHK() {
    return this.BasicInfo.controls['BHK'] as FormControl;
  }

  get PType() {
    return this.BasicInfo.controls['PType'] as FormControl;
  }

  get FType() {
    return this.BasicInfo.controls['FType'] as FormControl;
  }

  get Name() {
    return this.BasicInfo.controls['Name'] as FormControl;
  }

  get City() {
    return this.BasicInfo.controls['City'] as FormControl;
  }

  get Price() {
    return this.PriceInfo.controls['Price'] as FormControl;
  }

  get BuiltArea() {
    return this.PriceInfo.controls['BuiltArea'] as FormControl;
  }

  get CarpetArea() {
    return this.PriceInfo.controls['CarpetArea'] as FormControl;
  }

  get Security() {
    return this.PriceInfo.controls['Security'] as FormControl;
  }

  get Maintenance() {
    return this.PriceInfo.controls['Maintenance'] as FormControl;
  }

  get FloorNo() {
    return this.AddressInfo.controls['FloorNo'] as FormControl;
  }

  get TotalFloor() {
    return this.AddressInfo.controls['TotalFloor'] as FormControl;
  }

  get Address() {
    return this.AddressInfo.controls['Address'] as FormControl;
  }

  get LandMark() {
    return this.AddressInfo.controls['LandMark'] as FormControl;
  }

  get RTM() {
    return this.OtherInfo.controls['RTM'] as FormControl;
  }

  get PossessionOn() {
    return this.OtherInfo.controls['PossessionOn'] as FormControl;
  }

  get AOP() {
    return this.OtherInfo.controls['AOP'] as FormControl;
  }

  get Gated() {
    return this.OtherInfo.controls['Gated'] as FormControl;
  }

  get MainEntrance() {
    return this.OtherInfo.controls['MainEntrance'] as FormControl;
  }

  get Description() {
    return this.OtherInfo.controls['Description'] as FormControl;
  }

  // #endregion
  // #endregion

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.nextClicked = true;
    if (this.allTabsValid()) {
      this.mapProperty();
      // this.housingService.addProperty(this.property).subscribe(() => {
      //   this.alertify.success(
      //     'Congrats, your property listed successfully on our website'
      //   );
      //   console.log(this.addPropertyForm);

      //   if (this.SellRent.value === '2') {
      //     this.router.navigate(['/rent-property']);
      //   } else {
      //     this.router.navigate(['/']);
      //   }
      // });
      this.housingService.addProperty(this.property);
      this.alertify.success(
        'Congrats, your property listed successfully on our website'
      );
      console.log(this.addPropertyForm);

      if (this.SellRent.value === '2') {
        this.router.navigate(['/rent-property']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.alertify.error(
        'Please review the form and provide all valid entries'
      );
    }
  }

  mapProperty(): void {
    this.property.Id = this.housingService.newPropID();
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.PropertyTypeId = this.PType.value;
    this.property.Name = this.Name.value;
    this.property.CityId = this.City.value;
    this.property.FurnishingTypeId = this.FType.value;
    this.property.Price = this.Price.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloors = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.LandMark.value;
    this.property.ReadyToMove = this.RTM.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.EstPossessionOn = this.datePipe.transform(
      this.PossessionOn.value,
      'MM/dd/yyyy'
    );
    this.property.Description = this.Description.value;
  }

  allTabsValid(): boolean {
    if (this.BasicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
    }

    if (this.PriceInfo.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }

    if (this.AddressInfo.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }

    if (this.OtherInfo.invalid) {
      this.formTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }

  selectTab(NextTabId: number, IsCurrentTabValid: boolean) {
    this.nextClicked = true;
    if (IsCurrentTabValid) {
      this.formTabs.tabs[NextTabId].active = true;
    }
  }
}
