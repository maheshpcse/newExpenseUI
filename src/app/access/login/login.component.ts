import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { AuthUserService } from 'src/app/api-services/auth-user.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userEmail: any = null;
  userPassword: any = null;
  @ViewChild('emailname', { static: false }) emailnameRef: NgModel;
  @ViewChild('pwdname', { static: false }) pwdnameRef: NgModel;
  spinner: any = false;

  constructor(
    public router: Router,
    public authUserService: AuthUserService,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
  }

  userLoginData() {
    if (this.setLoginFormValidation()) {
      return this.toastr.errorToastr('Please fill the required fields.');
    }
    this.spinner = true;
    const userLoginPayload = {
      email: this.userEmail,
      password: this.userPassword
    };
    console.log('Post paylod to get user login data isss', userLoginPayload);
    
    this.authUserService.getUserLogin(userLoginPayload).subscribe(async (response: any) => {
      console.log('Get user login data response isss', response);
      if (!response || response.length === 0) {
        this.toastr.errorToastr('Email or password is invalid');
      } else if (response && response.length) {
        this.toastr.successToastr('Login success');
        this.resetLoginForm();
        const token = window.btoa('ExPeNsESysTeM@PmCSe');
        console.log('token isss', token);
        localStorage.setItem('token', token);
        sessionStorage.setItem('token', token);
        const copyResponse = Object.assign({}, response[0]);
        delete copyResponse.password;
        for (const item of Object.keys(copyResponse)) {
          sessionStorage.setItem(item, copyResponse[item]);
        }
        this.router.navigate(['/profile']);
      }
      this.spinner = false;
    }, (error: any) => {
      console.log('Error while get user login data', error);
      this.toastr.errorToastr('Network failed, Please try again.');
      this.spinner = false;
    });
  }

  setLoginFormValidation() {
    if (!this.userEmail || !this.userPassword) {
      return true;
    } else {
      return false;
    }
  }

  resetLoginForm() {
    if (this.emailnameRef) {
      this.emailnameRef.reset();
    }
    if (this.pwdnameRef) {
      this.pwdnameRef.reset();
    }
    this.userEmail = null;
    this.userPassword = null;
  }
}
