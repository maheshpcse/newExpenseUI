import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { AuthUserService } from 'src/app/api-services/auth-user.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  userEmail: any = 'maheshpm1599@gmail.com';
  tempUserEmail: any = 'maheshpm1599@gmail.com';
  userOtpCode: any = null;
  userPassword: any = null;
  userConfirmPassword: any = null;
  @ViewChild('emailname', { static: false }) emailnameRef: NgModel;
  @ViewChild('otpname', { static: false }) otpnameRef: NgModel;
  @ViewChild('pwdname', { static: false }) pwdnameRef: NgModel;
  @ViewChild('confirmpwdname', { static: false }) confirmpwdnameRef: NgModel;
  formStep: any = 'email';
  mailOtpCode: any = null;
  spinner: any = false;
  startTime: any = null;
  showTimer: any = '02:00';

  constructor(
    public router: Router,
    public authUserService: AuthUserService,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
  }

  sendOTPtoMail() {
    if (this.setEmailFormValidation()) {
      return this.toastr.errorToastr('Please fill the require fields');
    }
    this.spinner = true;
    const userPayload = {
      email: this.userEmail
    }
    console.log('Post payload to send otp to an user email data isss', userPayload);

    this.authUserService.sendOTPToUserMail(userPayload).subscribe(async (response: any) => {
      console.log('Get send otp to an user email data response isss', response);
      if (response['success']) {
        this.toastr.successToastr(response['message']);
        this.mailOtpCode = response.data;
        this.formStep = 'otp';
        this.resetEmailForm();
        this.setTimerToOtp();
      } else {
        this.toastr.errorToastr(response['message']);
      }
      this.spinner = false;
    }, (error: any) => {
      this.toastr.errorToastr('Network failed, Please try again.');
      this.spinner = false;
    });
  }

  verifyUserOTP() {
    if (this.setOtpFormValidation()) {
      return this.toastr.errorToastr('Please fill the required fields');
    } else {
      this.spinner = true;
      if (this.userOtpCode !== this.mailOtpCode) {
        this.spinner = false;
        return this.toastr.errorToastr('OTP is invalid, Please enter valid OTP');
      } else {
        this.toastr.successToastr('OTP verified successfully');
        this.formStep = 'password';
        this.resetOtpForm();
        this.spinner = false;
      }
    }
  }

  updateNewPassword() {
    if (this.setPasswordFormValidation()) {
      return this.toastr.errorToastr('Please fill the required fields.');
    }
    if (this.userPassword !== this.userConfirmPassword) {
      return this.toastr.errorToastr('Passwords is not match');
    }
    this.spinner = true;
    const userPayload = {
      user_id: null,
      email: this.tempUserEmail,
      password: this.userPassword
    };
    console.log('Post paylod to get update user password data isss', userPayload);

    this.authUserService.getUserDetails(userPayload).subscribe(async (response: any) => {
      console.log('Get user info response isss', response);
      if (response && response.length > 0) {
        userPayload.user_id = response[0]['id'];
        await this.authUserService.updateUserPassword(userPayload).then(async (result: any) => {
          console.log('Get update user password data result isss', result);
          this.toastr.successToastr('New password updated successful');
          this.resetPasswordForm();
          this.router.navigate(['/login']);
          this.spinner = false;
        }).catch((err: any) => {
          console.log('Error while update user password isss', err);
          this.toastr.errorToastr('Error while updating user password.');
          this.spinner = false;
        });
      } else {
        this.toastr.errorToastr('Error while getting user data');
      }
      this.spinner = false;
    }, (error: any) => {
      console.log('Error while get user data isss', error);
      this.toastr.errorToastr('Network failed, Please try again');
      this.spinner = false;
    });
  }

  setTimerToOtp() {
    this.showTimer = '02:00';
    this.startTime = setInterval(() => {
      const tempShowTimer = `${moment().format('YYYY-MM-DD')} 00:${this.showTimer}`;
      this.showTimer = moment(tempShowTimer).subtract(1, 'seconds').format('mm:ss');
      if (this.showTimer === '00:00') {
        this.toastr.errorToastr('OTP verification time is over.');
        this.clearTimer(this.startTime);
      }
    }, 1000);
  }

  clearTimer(data?: any) {
    clearInterval(data);
    this.startTime = null;
    this.showTimer = '02:00';
    this.formStep = 'email';
    this.resetEmailForm();
  }

  // ng-otp-input
  onOtpChange(event?: any) {
    event.setValue(1234);
  }

  setEmailFormValidation() {
    if (!this.userEmail) {
      return true;
    } else {
      return false;
    }
  }

  setOtpFormValidation() {
    if (!this.userOtpCode) {
      return true;
    } else {
      return false;
    }
  }

  setPasswordFormValidation() {
    if (!this.userPassword || !this.userConfirmPassword) {
      return true;
    } else {
      return false;
    }
  }

  resetEmailForm() {
    if (this.emailnameRef) {
      this.emailnameRef.reset();
    }
    this.userEmail = null;
  }

  resetOtpForm() {
    if (this.otpnameRef) {
      this.otpnameRef.reset();
    }
    this.userOtpCode = null;
    this.mailOtpCode = null;
  }

  resetPasswordForm() {
    if (this.pwdnameRef) {
      this.pwdnameRef.reset();
    }
    if (this.confirmpwdnameRef) {
      this.confirmpwdnameRef.reset();
    }
    this.userPassword = null;
    this.userConfirmPassword = null;
  }

}
