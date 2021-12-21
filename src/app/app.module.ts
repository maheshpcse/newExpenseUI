import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AuthUserService } from './api-services/auth-user.service';
import { AuthGuardService } from './api-services/auth-guard.service';
import { AuthInterceptorService } from './api-services/auth-interceptor.service';
import { UserService } from './user/user.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './access/login/login.component';
import { SignupComponent } from './access/signup/signup.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserSettingsComponent } from './user/user-settings/user-settings.component';
import { ManageGroupsComponent } from './user/manage-groups/manage-groups.component';
import { ManageFriendsComponent } from './user/manage-friends/manage-friends.component';
import { UserActivitiesComponent } from './user/user-activities/user-activities.component';
import { ProfileViewComponent } from './access/profile-view/profile-view.component';

const firebaseConfig = {
  // apiKey: 'AIzaSyAYjm_2DYyF6Aa-NRjRLOZGBNg6ZAcCTd0',
  // authDomain: 'expensesystem-89763.firebaseapp.com',
  // projectId: 'expensesystem-89763',
  // storageBucket: 'expensesystem-89763.appspot.com',
  // messagingSenderId: '539229698242',
  // appId: '1:539229698242:web:cd0b07930a9a4a1befe35b',
  // measurementId: 'G-HDE49BENKD'
  apiKey: 'AIzaSyAYjm_2DYyF6Aa-NRjRLOZGBNg6ZAcCTd0',
  authDomain: 'expensesystem-89763.firebaseapp.com',
  databaseURL: 'https://expensesystem-89763-default-rtdb.firebaseio.com',
  projectId: 'expensesystem-89763',
  storageBucket: 'expensesystem-89763.appspot.com',
  messagingSenderId: '539229698242',
  appId: '1:539229698242:web:cd0b07930a9a4a1befe35b',
  measurementId: 'G-HDE49BENKD'
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidemenuComponent,
    TopmenuComponent,
    NotFoundComponent,
    LoginComponent,
    SignupComponent,
    UserDashboardComponent,
    UserProfileComponent,
    UserSettingsComponent,
    ManageGroupsComponent,
    ManageFriendsComponent,
    UserActivitiesComponent,
    ProfileViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    CalendarModule,
    ToastrModule.forRoot(),
    AngularMultiSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [
    AuthUserService,
    AuthGuardService,
    UserService,
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
