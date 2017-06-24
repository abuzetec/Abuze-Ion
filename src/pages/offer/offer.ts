import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { OffersProvider } from '../../providers/offers/offers';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ShowOnMap } from '../../pages/map/map';
import { CitiesProvider } from '../../providers/cities/cities';
import { SessionProvider } from '../../providers/session/session';
import { PricesPage } from '../../modals/prices/prices';

@Component({
  selector: 'page-offer',
  templateUrl: 'offer.html',
  providers: [OffersProvider, CitiesProvider, SessionProvider]
})
export class OfferPage {
  offer: any;
  offerDetail: any;
  partner: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public offersProvider: OffersProvider, public iab: InAppBrowser, public modalCtrl: ModalController, public cityService: CitiesProvider, public sessionService: SessionProvider, public events: Events) {
    this.offer = this.navParams.get('offer');
    this.offersProvider.loadDetail(this.offer.id).then(_detail => {
      this.offerDetail = _detail;
      console.log(_detail);
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

  showOnMap() {
    this.navCtrl.push(ShowOnMap, {partner: this.partner});
  }

  showPriceOptions(){
    let pricesModal = this.modalCtrl.create(PricesPage, {offerDetail: this.offerDetail});
    pricesModal.onDidDismiss(data => {
      this.buyOffer(data.price);
    });
    pricesModal.present();
  }

  buyOffer(price){
    if (this.sessionService.isLogged()){
      let currentCity = this.cityService.getCurrentCity().id;
      let sessionToken = this.sessionService.getSessionToken();
      if (price){
        let buyOfferUrl = ["https://www.abuze.com.br/cidade/", currentCity, "/oferta/", this.offer.id, "/comprar?price_id=", price.id, "&jwt_access_token=", sessionToken]
        this.iab.create(buyOfferUrl.join(''), '_blank');
      } else {
        let buyOfferUrl = ["https://www.abuze.com.br/cidade/", currentCity, "/oferta/", this.offer.id, "/comprar", "?jwt_access_token=", sessionToken]
        this.iab.create(buyOfferUrl.join(''), '_blank');
      }
    } else {
      this.events.publish('abuze:login:open');
    }
  }
}
