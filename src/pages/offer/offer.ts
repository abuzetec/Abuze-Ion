import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events, Platform } from 'ionic-angular';
import { OffersProvider } from '../../providers/offers/offers';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ShowOnMap } from '../../pages/map/map';
import { CitiesProvider } from '../../providers/cities/cities';
import { SessionProvider } from '../../providers/session/session';
import { PricesPage } from '../../modals/prices/prices';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Loading } from '../../providers/loading';

@Component({
  selector: 'page-offer',
  templateUrl: 'offer.html',
  providers: [OffersProvider, CitiesProvider, SessionProvider, SocialSharing, Loading]
})
export class OfferPage {
  offer: any;
  offerDetail: any;
  partner: any;
  selectedPrice: any;
  private _loginsub: (user:any) => void;

  constructor(public navCtrl: NavController, public navParams: NavParams, public offersProvider: OffersProvider, public iab: InAppBrowser, public modalCtrl: ModalController, public cityService: CitiesProvider, public sessionService: SessionProvider, public events: Events, private socialSharing: SocialSharing, public loading: Loading, public platform: Platform) {
    this.offer = this.navParams.get('offer');
  }

  ionViewDidEnter(){
    this.offersProvider.loadDetail(this.offer.id).then(_detail => {
      this.offerDetail = _detail;
    });

    this.offersProvider.loadPartner(this.offer.partner_id).then(_partner => {
      this.partner = _partner;
    });
  }

  isOnMobile(){
    return this.platform.is('cordova');
  }

  share(){
    this.loading.show('sharing');
    let currentCity = this.cityService.getCurrentCity().id;
    let offerUrl = ["https://www.abuze.com.br/cidade/", currentCity, "/oferta/", this.offer.id, "/detalhes"].join('');
    this.socialSharing.share(this.offer.title, null, this.offer.main_photo, offerUrl).then(() => {
      this.loading.hide('sharing');
    }).catch(() => {
      this.loading.hide('sharing');
    });
  }

  ionViewDidLoad(){
    this._loginsub = (user) => {
      this.buyOffer(this.selectedPrice);
    };
    this.events.subscribe('abuze:user:logged', this._loginsub);
  }

  ionViewWillUnload(){
    this.events.unsubscribe('abuze:user:logged', this._loginsub);
  }

  discount(discount){
    return parseInt(discount);
  }

  openPartnerSite(){
    if (this.isOnMobile){
      this.iab.create(this.partner.site, '_blank');
    } else {
      this.iab.create(this.partner.site, '_system');
    }
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
    this.selectedPrice = price;
    if (this.sessionService.isLogged()){
      let currentCity = this.cityService.getCurrentCity().id;
      let sessionToken = this.sessionService.getSessionToken();
      if (price){
        let buyOfferUrl = ["https://www.abuze.com.br/cidade/", currentCity, "/oferta/", this.offer.id, "/comprar?price_id=", price.id, "&jwt_access_token=", sessionToken]
        window.location.href = buyOfferUrl.join('');
//        this.iab.create(buyOfferUrl.join(''), '_blank');
      } else {
        let buyOfferUrl = ["https://www.abuze.com.br/cidade/", currentCity, "/oferta/", this.offer.id, "/comprar", "?jwt_access_token=", sessionToken]
        window.location.href = buyOfferUrl.join('');
        //this.iab.create(buyOfferUrl.join(''), '_blank');
      }
    } else {
      this.events.publish('abuze:login:open');
    }
  }
}
