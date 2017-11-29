import { Injectable } from '@angular/core';

@Injectable()
export class SessionData {

  sessionToken: string;
  userData: any;

  constructor() {
    this.sessionToken = localStorage.getItem("session-token");
  }

  getSessionToken(){
    return this.sessionToken || localStorage.getItem("session-token");
  }

  setUserData(user:any){
    localStorage.setItem("session-token", user.session_token);
    this.sessionToken = user.session_token;
    this.userData = user;
  }

  clean(){
    window.localStorage.removeItem("session-token");
    this.sessionToken = null;
    this.userData = null;
  }
}
