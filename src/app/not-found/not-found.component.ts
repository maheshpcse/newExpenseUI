import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as _ from 'underscore';
declare var $: any;
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

  // dynamic menu form and dynamic menu table variables
  dynamicMenuForm: FormGroup;
  dynamicMenuList: any = [
    {mainMenuId: 1, menuType: 'Main Menu', menuTitle: 'Admissions', contentType: 'Url', contentValue: 'http:tjohncollege.com/admissions', status: 1},
    {mainMenuId: 1, subMenuId: 1, menuType: 'Sub Menu', menuTitle: 'Diploma Courses', contentType: 'Page', contentValue: 'Page One', status: 1},
    {mainMenuId: 1, subMenuId: 2, menuType: 'Sub Menu', menuTitle: 'PG Courses', contentType: 'Page', contentValue: 'Page Two', status: 0},
    {mainMenuId: 1, subMenuId: 1, childSubMenuId: 1, menuType: 'Child Sub Menu', menuTitle: 'MBA Courses', contentType: 'File', contentValue: 'mba_course_details.pdf', status: 0},
    {mainMenuId: 2, menuType: 'Main Menu', menuTitle: 'Students', contentType: 'Url', contentValue: 'http:tjohncollege.com/students', status: 1},
    {mainMenuId: 2, subMenuId: 3, menuType: 'Sub Menu', menuTitle: 'Student Login', contentType: 'Page', contentValue: 'Page One', status: 1},
    {mainMenuId: 2, subMenuId: 4, menuType: 'Sub Menu', menuTitle: 'College E-Mail ID', contentType: 'Page', contentValue: 'Page Two', status: 0},
    {mainMenuId: 2, subMenuId: 3, childSubMenuId: 1, menuType: 'Child Sub Menu', menuTitle: 'Terms Login Guidelines', contentType: 'File', contentValue: 'terms_login_guidelines.pdf', status: 0},
  ];
  tempdynamicMenuList: any = [];
  selectMenuIndex: any = [];
  selectSubMenuIndex: any = [];
  selectChildSubMenuIndex: any = [];

  constructor(
    public userService: UserService,
    public fb: FormBuilder,
    public toaster: ToastrManager
  ) { }

  ngOnInit() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
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
    this.getDynamicMenuList();
  }

  // dynamic menu form and get menu list functionalities
  getDynamicMenuList() {
    this.tempdynamicMenuList = [...this.dynamicMenuList];
    const copyDynamicMenuList = [...this.dynamicMenuList];
    const filterDynamicMenuList = _.filter(copyDynamicMenuList, (ele: any) => {
      return ele.menuType === 'Main Menu';
    });
    for (const main of filterDynamicMenuList) {
      main['subMenuList'] = [];
      this.selectMenuIndex.push(false);
    }
    this.dynamicMenuList = filterDynamicMenuList;
    console.log('Final dynamic menu list isss', this.dynamicMenuList);
  }

  getDynamicSubMenuList(item?: any, index?: any) {
    console.log('Selected main menu item isss', item, index);
    item['subMenuList'] = [];
    const copyDynamicMenuList = [...this.tempdynamicMenuList];
    const filterDynamicMenuList = _.filter(copyDynamicMenuList, (ele: any) => {
      return ele.mainMenuId === Number(item.mainMenuId) && ele.menuType === 'Sub Menu';
    });
    item['subMenuList'] = filterDynamicMenuList;
    for (const sub of item['subMenuList']) {
      sub['childSubMenuList'] = [];
      this.selectSubMenuIndex.push(false);
    }
    console.log('Final dynamic sub menu list isss', item['subMenuList']);
  }

  getDynamicChildSubMenuList(item?: any, index?: any) {
    console.log('Selected sub menu item isss', item, index);
    item['childSubMenuList'] = [];
    const copyDynamicMenuList = [...this.tempdynamicMenuList];
    const filterDynamicMenuList = _.filter(copyDynamicMenuList, (ele: any) => {
      return ele.subMenuId === Number(item.subMenuId) && ele.menuType === 'Child Sub Menu';
    });
    item['childSubMenuList'] = filterDynamicMenuList;
    for (const sub of item['childSubMenuList']) {
      this.selectChildSubMenuIndex.push(false);
    }
    console.log('Final dynamic child sub menu list isss', item['childSubMenuList']);
  }

  changeMenuIcon(index?: any) {
    let id: any = 0;
    for (const item of this.selectMenuIndex) {
      if (id === index) {
        this.selectMenuIndex[id] = !this.selectMenuIndex[id];
      } else {
        this.selectMenuIndex[id] = false;
      }
      id += 1;
    }
    console.log('selectMenuIndex isss', this.selectMenuIndex);
  }

  changeSubMenuIcon(index?: any) {
    let id: any = 0;
    for (const item of this.selectSubMenuIndex) {
      if (id === index) {
        this.selectSubMenuIndex[id] = !this.selectSubMenuIndex[id];
      } else {
        this.selectSubMenuIndex[id] = false;
      }
      id += 1;
    }
    console.log('selectSubMenuIndex isss', this.selectSubMenuIndex);
  }

  changeChildSubMenuIcon(index?: any) {
    let id: any = 0;
    for (const item of this.selectChildSubMenuIndex) {
      if (id === index) {
        this.selectChildSubMenuIndex[id] = !this.selectChildSubMenuIndex[id];
      } else {
        this.selectChildSubMenuIndex[id] = false;
      }
      id += 1;
    }
    console.log('selectChildSubMenuIndex isss', this.selectChildSubMenuIndex);
  }

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
