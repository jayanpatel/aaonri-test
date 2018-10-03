import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { User, Login } from './registration.model';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {
  readonly rootUrl = 'http://172.104.20.175:8080';
  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    console.log(user);
    const body: User = {
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.emailId,
      emailId: user.emailId,
      password: user.password,
      phoneNo: user.phoneNo,
      address1: user.address1,
      address2: user.address2,
      city: user.city,
      state: user.state,
      zipcode: user.zipcode,
      newsletter: user.newsletter,
      activeUser: true,
      authorized: true,
      isSurveyCompleted: false,
      regdEmailSent: false
    }

    console.log(body.firstName);
     var reqHeader = new HttpHeaders({'No-Auth':'True'});
     return this.http.post(this.rootUrl + '/api/add', body, {headers : reqHeader});
  }

  authorizeUser(user: User) {
    console.log(user);
    const body: Login = {
      userName: user.emailId,
      emailId: user.emailId,
      password: user.password
    }

    console.log(body.emailId);
     var reqHeader = new HttpHeaders({'No-Auth':'True'});
     return this.http.post(this.rootUrl + '/api/authorize', body, {headers : reqHeader});
  }

  userExists(login: Login) {
    const body: Login = {
      userName: login.emailId,
      emailId: login.emailId,
      password: login.password
    }

    console.log(body.emailId);
     var reqHeader = new HttpHeaders({'No-Auth':'True'});
     return this.http.post(this.rootUrl + '/api/userExists', body, {headers : reqHeader});
  }

  // userAuthentication(userName, password) {
  //   var data = "username=" + userName + "&password=" + password + "&grant_type=password";
  //   var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
  //   return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  // }

  getUserInterests(){
    return this.http.get(this.rootUrl+'/api/interests/all');
  }
}
