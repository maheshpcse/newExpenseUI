import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { AuthUserService } from 'src/app/api-services/auth-user.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  fullName: any = null;
  userName: any = null;
  userEmail: any = null;
  userPassword: any = null;
  userConfirmPwd: any = null;
  @ViewChild('fullname', { static: false }) fullnameRef: NgModel;
  @ViewChild('username', { static: false }) usernameRef: NgModel;
  @ViewChild('emailname', { static: false }) emailnameRef: NgModel;
  @ViewChild('pwdname', { static: false }) pwdnameRef: NgModel;
  @ViewChild('confirmpwdname', { static: false }) confirmpwdnameRef: NgModel;

  constructor(
    public router: Router,
    public authUserService: AuthUserService,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
  }

  userSignupData() {
    if (this.setSignupFormValidation()) {
      return this.toastr.errorToastr('Please fill the required fields.');
    }
    const userSignupPayload = {
      user_id: null,
      firstname: this.fullName,
      middlename: null,
      lastname: null,
      username: this.userName,
      email: this.userEmail,
      password: this.userPassword,
      mobile: null,
      date_of_birth: null,
      address: null,
      profile_pic: null,
      last_login_time: null,
      role: 'user',
      status: 0,
      created_at: new Date(),
      updated_at: new Date()
    };
    console.log('Post paylod to get user singup data isss', userSignupPayload);
    this.authUserService.addNewUser(userSignupPayload).then(async (response: any) => {
      console.log('Get user singup data response isss', response);
      if (response && response.success) {
        this.toastr.successToastr('Singup success');
        this.resetSignupForm();
        this.router.navigate(['/login']);
      } else {
        this.toastr.successToastr(response.message);
      }
    }).catch((error: any) => {
      console.log('Error while get user signup data', error);
      this.toastr.errorToastr('Network failed, Please try again.');
    });
  }

  setSignupFormValidation() {
    if (!this.fullName || !this.userName || !this.userEmail || !this.userPassword || !this.userConfirmPwd) {
      return true;
    } else {
      return false;
    }
  }

  resetSignupForm() {
    if (this.fullnameRef) {
      this.fullnameRef.reset();
    }
    if (this.usernameRef) {
      this.usernameRef.reset();
    }
    if (this.emailnameRef) {
      this.emailnameRef.reset();
    }
    if (this.pwdnameRef) {
      this.pwdnameRef.reset();
    }
    if (this.confirmpwdnameRef) {
      this.confirmpwdnameRef.reset();
    }
    this.fullName = null;
    this.userName = null;
    this.userEmail = null;
    this.userPassword = null;
    this.userConfirmPwd = null;
  }

}
