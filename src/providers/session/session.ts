import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ENV } from '../../config/environment.dev';
import { SessionData } from './session-data';

@Injectable()
export class SessionProvider {

  constructor(public http: Http, public events: Events, public sessionData: SessionData) {
  }

  login(email: string, password: string){

    let body = { email: email, password: password };

    return new Promise(resolve => {
      this.http.post(ENV.API_URL + '/login', body)
        .map(res => res.json())
        .subscribe(user => {
          this.sessionData.setUserData(user)
          this.events.publish('abuze:user:logged', user);

          resolve(true);
        }, err => {
          resolve(false);
        });
    });
  }

  checkLogin(){
    return new Promise(resolve => {
      this.http.get(ENV.API_URL + '/check-login')
        .map(res => res.json())
        .subscribe(user => {
          this.sessionData.setUserData(user)
          this.events.publish('abuze:user:logged', user);
          resolve(true);
        }, err => {
          resolve(false);
        });
    });
  }

  getUserData(){
    return this.sessionData.userData;
  }

  isLogged(){
    return this.sessionData.userData != null;
  }

  logOut(){
    this.sessionData.clean();
  }

  getSessionToken(){
    return this.sessionData.getSessionToken();
  }
}
