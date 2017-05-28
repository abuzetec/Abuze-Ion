import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ENV } from '../../config/environment.dev'

@Injectable()
export class CouponsProvider {

  constructor(public http: Http) {
  }

  load(){
    return new Promise(resolve => {
      this.http.get([ENV.API_URL, '/user/coupons'].join(''))
        .map(res => res.json())
        .subscribe(_coupons => {
          resolve(_coupons);
        });
    });    
  }  
}
