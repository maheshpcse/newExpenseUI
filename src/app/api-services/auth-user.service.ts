import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { APIURL } from './apiurl.service';
import { map } from 'rxjs/operators';

export interface User {
  id: string;
  user_id: string | null;
  firstname: string | null;
  middlename: string | null;
  lastname: string | null;
  username: string | null;
  email: string | null;
  password: string | null;
  mobile: string | null;
  date_of_birth: string | null;
  address: string | null;
  profile_pic: string | null;
  last_login_time: string | null;
  role: string | null;
  status: number | null;
  created_at: string | null;
  updated_at: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(
    private http: HttpClient,
    private ngFireStore: AngularFirestore,
    private ngFireDatabase: AngularFireDatabase
  ) { }

  getUserLogin(data?: any) {
    // tslint:disable-next-line:max-line-length
    return this.ngFireStore.collection('UserData', ref => ref.where('email', '==', data.email).where('password', '==', data.password)).valueChanges();
  }

  addNewUser(data?: any) {
    // return this.ngFireStore.collection<User>('UserData').add(data);
    return new Promise(async (resolve, reject) => {
      try {
        // tslint:disable-next-line:max-line-length
        await this.ngFireStore.collection('UserData', ref => ref.where('email', '==', data.email)).valueChanges().subscribe(async (emailData: any) => {
          console.log('Get email data isss', emailData);
          if (emailData.length > 0) {
            return resolve({
              success: false,
              error: true,
              statusCode: 200,
              message: 'Email is already registered'
            });
          }
          // tslint:disable-next-line:max-line-length
          await this.ngFireStore.collection('UserData', ref => ref.where('username', '==', data.username))
            .valueChanges()
            .subscribe(async (userNameData: any) => {
              console.log('Get username data isss', userNameData);
              if (userNameData.length > 0) {
                return resolve({
                  success: false,
                  error: true,
                  statusCode: 200,
                  message: 'Username is already registered'
                });
              } else {
                await this.ngFireStore.collection('UserData').add(data).then(async (insertData: any) => {
                  console.log('Get user inserted data isss', insertData);
                  return resolve({
                    success: true,
                    error: false,
                    statusCode: 200,
                    message: 'Signup success'
                  });
                }).catch((insertErr: any) => {
                  throw insertErr;
                });
              }
          }, (getUserNameErr: any) => {
            throw getUserNameErr;
          });
        }, (getEmailErr: any) => {
          throw getEmailErr;
        });
      } catch (error) {
        console.log('Error at while adding new user', error);
        return reject(error);
      }
    });
  }

  getUserInfo(body?: any) {
    // return this.ngFireStore.collection<User>('UserData').valueChanges();
    return this.ngFireStore.collection<User>('UserData', ref => ref.where('user_id', '==', body.user_id)).snapshotChanges().pipe(
      map((actions) => actions.map((a) => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getUserDetails(body?: any) {
    return this.ngFireStore.collection<User>('UserData', ref => ref.where('email', '==', body.email)).snapshotChanges().pipe(
      map((actions) => actions.map((a) => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  updateUserInfo(data?: any) {
    return this.ngFireStore.doc('UserData/' + data.user_id).update(data);
  }

  sendOTPToUserMail(data?: any) {
    return this.http.post(APIURL.SEND_OTP_TO_USER_MAIL, data);
  }

  updateUserPassword(data?: any) {
    return this.ngFireStore.doc('UserData/' + data.user_id).update(data);
  }

  // ******************* Mysql Database *****************************
  userLogin(data: any) {
    return this.http.post<any>(APIURL.USER_LOGIN, data);
  }

  userSignup(data: any) {
    return this.http.post<any>(APIURL.USER_SIGNUP, data);
  }

  userReSignIn(data: any) {
    return this.http.post<any>(APIURL.USER_RESIGNIN, data);
  }

  getUserToken() {
    return sessionStorage.getItem('token');
  }

  getUserId() {
    return sessionStorage.getItem('user_id');
  }

  getUserRole() {
    return sessionStorage.getItem('role');
  }

  getUserPayload() {
    const token = this.getUserToken();
    if (token) {
      // const userPayload = atob(token.split('.')[1]);
      // return JSON.parse(userPayload);
      const userPayload = {
        user_id: sessionStorage.getItem('user_id'),
        email: sessionStorage.getItem('email'),
        username: sessionStorage.getItem('username'),
        exp: new Date().getTime()
      };
      return userPayload;
    } else {
      return null;
    }
  }

  isLoggedIn(): boolean {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  isLoggedOut() {
    localStorage.clear();
    sessionStorage.clear();
  }
}
