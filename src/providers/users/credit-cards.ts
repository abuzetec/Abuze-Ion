import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ENV } from '../../config/environment.dev'

@Injectable()
export class CreditCardsProvider {

  constructor(public http: Http) {
  }

  remove(creditCard){
    return new Promise(resolve => {
      this.http.delete([ENV.API_URL, '/user/credit-card/', creditCard.id, '/remove'].join(''))
        .map(res => res.json())
        .subscribe(() => {
          resolve(true);
        });
    });
  }

  load(){
    return new Promise(resolve => {
      this.http.get([ENV.API_URL, '/user/credit-cards'].join(''))
        .map(res => res.json())
        .subscribe(_creditCards => {
          resolve(_creditCards);
        });
    });    
  }  
}