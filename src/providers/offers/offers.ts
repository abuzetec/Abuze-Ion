import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ENV } from '../../config/environment.dev'
import { CitiesProvider } from '../cities/cities';

@Injectable()
export class OffersProvider {

  offers:any;

  constructor(public http: Http, public citiesProvider: CitiesProvider) {
    this.offers = JSON.parse(window.localStorage.getItem("offersByCity-" + this.citiesProvider.getCurrentCity()));
  }

  getAvailableOffers(){
    return new Promise(resolve => {
      this.http.get(ENV.API_URL + '/cidade/' + this.citiesProvider.getCurrentCity() + '/available-offers')
        .map(res => res.json())
        .subscribe(_offers => {
          window.localStorage.setItem("offersByCity-" + this.citiesProvider.getCurrentCity(), JSON.stringify(_offers));
          resolve(_offers);
        });
    });    
  }

  load(){
    if (this.offers) {
      this.getAvailableOffers().then(_offers => {
        this.offers = _offers;
      });    

      return Promise.resolve(this.offers);
    } else {
      return this.getAvailableOffers();      
    }
  }  

}
