import { Injectable } from '@angular/core';
import { BaseRequestOptions, Headers } from '@angular/http';
import { Events } from 'ionic-angular';
import { ENV } from '../config/environment.dev';
import { SessionData } from './session/session-data';

@Injectable()
export class HttpDefaultHeaders extends BaseRequestOptions{

  headers:Headers;

  constructor(public sessionData: SessionData, public events:Events) {
    super();
    this.setCommonHeaders();

    this.events.subscribe('abuze:user:logged', (user) => {
      this.setCommonHeaders();
    });
  }

  setCommonHeaders(){
    this.headers = new Headers({
      'Content-Type': 'application/json; charset=UTF-8',
      'X-APP-ID': ENV.APP_ID,
      'X-APP-TOKEN': ENV.APP_TOKEN,
      'X-ACCESS-TOKEN': this.sessionData.getSessionToken()
    });
    console.log(this.sessionData.getSessionToken());
  }
}
