import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ENV } from '../../config/environment.dev'

@Injectable()
export class CitiesProvider {

  currentCity:any;
  cities:any;

  constructor(public http: Http) {
  }

  getCurrentCity(){
    if (!this.currentCity){
      this.currentCity = window.localStorage.getItem("currentCity") || 9;
    }

    return this.currentCity;
  }

  setCurrentCity(cityID){
    window.localStorage.setItem("currentCity", cityID);

    this.currentCity = cityID;
  }

  load(){
    if (this.cities) {
      // already loaded data
      return Promise.resolve(this.cities);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get(ENV.API_URL + '/get-available-cities')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.cities = data;
          resolve(this.cities);
        });
    });
  }

}
