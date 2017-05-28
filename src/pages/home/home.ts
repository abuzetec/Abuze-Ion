import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OffersProvider } from '../../providers/offers/offers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [OffersProvider]
})
export class HomePage {
  offers: any;
  search: string;

  constructor(public navCtrl: NavController, offersProvider: OffersProvider) {
    offersProvider.load().then(_offers => {
      this.offers = _offers;
    });
  }

}
