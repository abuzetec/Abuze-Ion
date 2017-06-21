import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OffersProvider } from '../../providers/offers/offers';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-offer',
  templateUrl: 'offer.html',
  providers: [OffersProvider]
})
export class OfferPage {
  offer: any;
  offerDetail: any;
  partner: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public offersProvider: OffersProvider, public iab: InAppBrowser) {
    this.offer = this.navParams.get('offer');
    this.offersProvider.loadDetail(this.offer.id).then(_detail => {
      this.offerDetail = _detail;
    });

    this.offersProvider.loadPartner(this.offer.partner_id).then(_partner => {
      this.partner = _partner;
    });
  }

  discount(discount){
    return parseInt(discount);
  }

  openPartnerSite(){
    this.iab.create(this.partner.site, '_blank');
  }
}
