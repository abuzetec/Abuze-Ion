import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CitiesProvider } from '../../providers/cities/cities';
import { OffersProvider } from '../../providers/offers/offers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CitiesProvider, OffersProvider]
})
export class HomePage {
  offers: any;

  search: string;

  doSearch(){
    
  }

  constructor(public navCtrl: NavController, public citiesProvider: CitiesProvider, offersProvider: OffersProvider) {
    offersProvider.load().then(offers => {
      this.offers = offers;
    });
  }

}
