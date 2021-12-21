import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthUserService } from 'src/app/api-services/auth-user.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id: string;
  firstname: string | null;
  middlename: string | null;
  lastname: string | null;
  username: string | null;
  email: string | null;
  date_of_birth: string | null;
  mobile: string | null;
  address: string | null;
}

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  isUpdate: any = [];
  userInputValue: any = [];
  userItem: any = {};

  isChangeProfile: any = false;
  imageFile: any = null;
  @ViewChild('fileName', { static: false }) fileNameRef: ElementRef;

  imageDetailList: AngularFireList<any>;

  // Firestore Database
  private userCollection: AngularFirestoreCollection<User>;
  imageUrl: any = '';
  tempImageUrl: any = '../../../assets/images/user-avatar.png';

  // dateformat: YYYY-MM-DD, ex: '2021-12-17'
  datesArr: any = ['2021-12-15', '2021-12-17', '2021-12-19', '2021-12-20', '2021-12-23', '2021-12-25'];

  constructor(
    public authUserService: AuthUserService,
    public toastr: ToastrManager,
    public ngFireStore: AngularFirestore, // Firestore Database
    public ngFireDatabase: AngularFireDatabase, // Realtime Database
    public ngFireStorage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.getUserData();
    this.getImageDetailList();
  }

  getImageDetailList() {
    this.imageUrl = this.tempImageUrl;
    this.ngFireDatabase.list('userProfiles/').snapshotChanges().subscribe(
      async (list: any) => {
        console.log('list isss', list);
        const imageList: any = list.map(item => item.payload.val());
        console.log('images list isss', imageList);
        this.imageUrl = imageList && imageList.length ? imageList[0].filePath : this.tempImageUrl;
      }, (error: any) => {
        console.log('Error while getting image url', error);
        this.imageUrl = this.tempImageUrl;
      });
  }

  getUserData() {
    const userPayload = {
      user_id: sessionStorage.getItem('user_id'),
      email: sessionStorage.getItem('email')
    };
    console.log('Post payload to get user data isss', userPayload);
    this.authUserService.getUserInfo(userPayload).subscribe((response: any) => {
      console.log('Get user data response isss', response);
      this.userItem = response && response.length !== 0 ? response[0] : {} as User;
      for (const item of Object.keys(this.userItem)) {
        // tslint:disable-next-line:max-line-length
        this.userItem[item] = (this.userItem[item] && this.userItem[item].length >= 25) ? this.userItem[item].slice(0, 24) + '...' : this.userItem[item];
        this.userInputValue.push(null);
      }
    }, (error: any) => {
      console.log('Error while get user data isss', error);
      this.toastr.errorToastr('Error while get user data');
    });
  }

  onUpdateUser() {
    this.userCollection = this.ngFireStore.collection<User>('UserData');
    this.userCollection.valueChanges().subscribe(async (response: any) => {
      console.log('response isss', response);
    }, (error: any) => {
      console.log('Error isss', error);
      this.toastr.errorToastr('Network failed, Please try again.');
    });
  }

  onEditProfileAll(value?: any) {
    console.log('Value isss', value);
    console.log('user data isss', this.userItem);
    let index: any = 0;
    for (const item of Object.keys(this.userItem)) {
      this.isUpdate[index] = value;
      // if (value) {
      //   if (Number(index) === 6) {
      //     this.userInputValue[index] = this.isUpdate[index] ? Number(this.userItem[item]) : null;
      //   } else {
      //     this.userInputValue[index] = this.isUpdate[index] ? this.userItem[item] : null;
      //   }
      // }
      index += 1;
    }
    this.userInputValue[0] = this.userItem.firstname ? this.userItem.firstname : null;
    this.userInputValue[1] = this.userItem.middlename ? this.userItem.middlename : null;
    this.userInputValue[2] = this.userItem.lastname ? this.userItem.lastname : null;
    this.userInputValue[3] = this.userItem.username ? this.userItem.username : null;
    this.userInputValue[4] = this.userItem.email ? this.userItem.email : null;
    this.userInputValue[5] = this.userItem.date_of_birth ? this.userItem.date_of_birth : null;
    this.userInputValue[6] = this.isUpdate[6] ? Number(this.userItem.mobile) : null;
    this.userInputValue[7] = this.userItem.address ? this.userItem.address : null;
  }

  onEditProfile(index?: any, value?: any, item?: any) {
    this.isUpdate[index] = value;
    if (Number(index) === 6) {
      this.userInputValue[index] = this.isUpdate[index] ? Number(item) : null;
    } else {
      this.userInputValue[index] = this.isUpdate[index] ? item : null;
    }
  }

  updateUserData(index?: any, value?: any, item?: any) {
    const userPayload: any = {
      user_id: this.userItem.id,
      password: '1234',
      profile_pic: null,
      role: 'user',
      last_login_time: null,
      status: 0
    };
    userPayload[Object.keys(item)[0]] = Object.values(item)[0];
    console.log('Post payload to save user data isss', userPayload);
    this.authUserService.updateUserInfo(userPayload).then((response: any) => {
      console.log('Get save user data response isss', response);
      this.toastr.successToastr('User data saved successful');
      this.isUpdate[index] = value;
      this.userItem[Object.keys(item)[0]] = Object.values(item)[0];
    }).catch((error: any) => {
      console.log('Error while save user data isss', error);
      this.toastr.errorToastr('Error while get user data');
    });
  }

  onSelectFile(event?: any) {
    console.log('Selected file event isss', event);
    this.imageFile = event.target.files[0] as File;

    const file = event.target.files[0] as File;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log('base64 image data isss', reader.result);
      this.getOriginalFile(reader.result.toString());
    };
    reader.onerror = (error: any) => {
      console.log('Error: ', error);
    };
  }

  getOriginalFile(imageBase64?: any) {
    const blob = this.dataURItoBlob(imageBase64);

    const file = new File([blob], 'fileName.jpeg', {
      type: '\'image/jpeg\''
    });

    console.log('original image file isss', file);
  }

  dataURItoBlob(dataURI?: any) {

    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString: any = null;

    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = unescape(dataURI.split(',')[1]);
    }

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  onUploadFile() {
    console.log('image file isss', this.imageFile);
    const filePath = `userProfiles/${this.imageFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.ngFireStorage.ref(filePath);
    // tslint:disable-next-line:max-line-length
    this.ngFireStorage.upload(filePath, this.imageFile).then(async (response: any) => {
      console.log('Get upload a file response isss', response);
      this.toastr.successToastr('User profile changed successful');
      fileRef.getDownloadURL().subscribe(async (url: any) => {
        const userProfiles = {
          fileName: `${this.imageFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`,
          filePath: url
        };
        this.ngFireDatabase.list('userProfiles/').push(userProfiles).then(async (result: any) => {
          console.log('result isss', result);
          this.getImageDetailList();
          this.onCancelUpload(false);
        }).catch((error1: any) => {
          console.log('error1 isss', error1);
        });
      }, (error2: any) => {
        console.log('error2 isss', error2);
      });
    }).catch((error: any) => {
      console.log('Error while uploading a file', error);
      this.toastr.errorToastr('Error while uploading a file');
    });
  }

  onCancelUpload(value?: any) {
    this.isChangeProfile = value;
    this.imageFile = null;
    if (this.fileNameRef) {
      this.fileNameRef.nativeElement.value = null;
    }
  }

  resetFileForm() {
    this.imageFile = null;
    if (this.fileNameRef) {
      this.fileNameRef.nativeElement.value = null;
    }
  }
}
