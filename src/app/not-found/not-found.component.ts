import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  public limit: any = 10;
  public rowsOnPage: any = 10;
  public rowsOnPageSet: any = [5, 10, 25];
  public page: any = 1;
  public pager: any = {};
  public totalPages: any = 0;
  public count: any = 0;
  public searchQuery: any = '';
  public statusFilter: any = null;
  public searchEnable: any = false;
  prizesList: any = [];
  tempPrizesList: any = [];

  // dynamic menu form variables
  dynamicMenuForm: FormGroup;

  constructor(
    public userService: UserService,
    public fb: FormBuilder,
    public toaster: ToastrManager
  ) { }

  ngOnInit() {
    // this.getNobelPrizesList();
    this.dynamicMenuForm = this.fb.group({
      menuType: new FormControl(null, [Validators.required]),
      menuTitle: new FormControl(null, [Validators.required]),
      mainMenu: new FormControl(null, [Validators.required]),
      subMenu: new FormControl(null, [Validators.required]),
      contentType: new FormControl(null, [Validators.required]),
      contentImage: new FormControl(null, [Validators.required]),
      contentUrl: new FormControl(null, [Validators.required]),
      contentPage: new FormControl(null, [Validators.required]),
      statusType: new FormControl(null, [Validators.required])
    });
  }

  // dynamic menu form functionalities
  get Form() {
    return this.dynamicMenuForm.controls;
  }

  onSelectMenuType(type?: any) {
    console.log('Selected menu type isss:', type);
    const formControlFields = Object.keys(this.dynamicMenuForm.controls).filter((ele: any) => ele !== 'menuType');
    console.log('dynamic form fields isss:', formControlFields);
    for (const item of formControlFields) {
      this.Form[item].reset();
      this.Form[item].setValue(null);
      this.Form[item].setValidators([Validators.required]);
      this.Form[item].updateValueAndValidity();
    }
  }

  onSelectContentType(type?: any) {
    console.log('Selected content type isss:', type);
    const formControlFields = ['contentImage', 'contentUrl', 'contentPage'];
    console.log('dynamic form fields isss:', formControlFields);
    for (const item of formControlFields) {
      this.Form[item].reset();
      this.Form[item].setValue(null);
      this.Form[item].setValidators([Validators.required]);
      this.Form[item].updateValueAndValidity();
    }
  }

  submitMenuForm() {
    console.log('dynamic form values isss', this.dynamicMenuForm.controls);
  }

  setMenuFormDisable() {
    if (!this.Form['menuType'].value) {
      return true;
    } else if (this.Form['menuType'].value) {
      if (this.Form['menuType'].value === 'mainmenu') {
        if (!this.Form['menuTitle'].value || !this.Form['statusType'].value || this.setContentTypeFormDisable()) {
          return true;
        }
      } else if (this.Form['menuType'].value === 'submenu') {
        if (!this.Form['menuTitle'].value || !this.Form['mainMenu'].value || !this.Form['statusType'].value || this.setContentTypeFormDisable()) {
          return true;
        }
      } else if (this.Form['menuType'].value === 'childsubmenu') {
        if (!this.Form['menuTitle'].value || !this.Form['mainMenu'].value || !this.Form['subMenu'].value || !this.Form['statusType'].value || this.setContentTypeFormDisable()) {
          return true;
        }
      }
    } else {
      return false;
    }
  }

  setContentTypeFormDisable() {
    if (!this.Form['contentType'].value) {
      return true;
    } else if (this.Form['contentType'].value) {
      if (!this.Form['contentImage'].value && !this.Form['contentUrl'].value && !this.Form['contentPage'].value) {
        return true;
      }
    } else {
      return false;
    }
  }
  // End dynamic menu form functionalities

  onSearchData() {
    this.searchEnable = true;
    this.getNobelPrizesList();
  }

  onFilterData() {
    this.getNobelPrizesList();
  }

  getNobelPrizesList() {
    const prizesPayload = {
      limit: Number(this.limit),
      page: Number(this.page),
      search: this.searchQuery,
      status: !this.statusFilter ? 'all' : Number(this.statusFilter)
    };
    console.log('Post payload to get nobel prizes data isss', prizesPayload);

    this.userService.getAllNobelPrizesData(prizesPayload).subscribe((response: any) => {
      console.log('Get nobel prizes data isss', response);
      if (response.success) {
        this.prizesList = response.data.list;
        this.count = response.data.count;
        this.createPager();
      } else {
        this.toaster.errorToastr(response.message);
      }
    }, (error: any) => {
      this.toaster.errorToastr('Network failed, Please try again.');
    });
  }

  setPager() {
  }

  createPager() {
  }

}
