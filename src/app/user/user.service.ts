import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../api-services/apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllNobelPrizesData(data: any) {
    return this.http.post<any>(APIURL.GET_ALL_NOBEL_PRIZES, data);
  }
}
