import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { CitiesProvider } from '../../providers/cities/cities';

@Component({
  templateUrl: 'change-city.html'
})
export class ChangeCityPage {
  cities: any;

  constructor(public viewCtrl: ViewController, public citiesProvider: CitiesProvider) {
    this.citiesProvider.load().then(_cities => {
      this.cities = _cities;
    });
  }

  changeCityTo(city){
    this.citiesProvider.setCurrentCity(city);
    this.viewCtrl.dismiss();    
  }
}
