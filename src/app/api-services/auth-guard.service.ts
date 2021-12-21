import { Injectable } from '@angular/core';
import { AuthUserService } from './auth-user.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  userId: any = sessionStorage.getItem('user_id');
  role: any = sessionStorage.getItem('role');

  constructor(
    private authUserService: AuthUserService,
    private router: Router,
    public toastr: ToastrManager
  ) { }

  canActivate(): boolean {
    if (!this.authUserService.isLoggedIn()) {
      this.toastr.warningToastr('You are not authenticated or authorized user, Please login or signup.');
      this.authUserService.isLoggedOut();
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
