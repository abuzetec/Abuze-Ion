import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ENV } from '../../config/environment.dev'
import { CitiesProvider } from '../cities/cities';
import { Events } from 'ionic-angular';

@Injectable()
export class OffersProvider {

  constructor(public http: Http, public citiesProvider: CitiesProvider, public events: Events) {
  }

  load(){
    return new Promise(resolve => {
      this.http.get(ENV.API_URL + '/cidade/' + this.citiesProvider.getCurrentCity() + '/available-offers')
        .map(res => res.json())
        .subscribe(_offers => {
          this.events.publish('abuze:loading:hide');          
          resolve(_offers);
        });
    });    
  }  

}
