import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './access/login/login.component';
import { AuthGuardService } from './api-services/auth-guard.service';
import { SignupComponent } from './access/signup/signup.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileViewComponent } from './access/profile-view/profile-view.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'profile',
    canActivate: [AuthGuardService],
    component: ProfileViewComponent
  },
  {
    path: 'user/dashboard',
    canActivate: [AuthGuardService],
    component: UserDashboardComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
