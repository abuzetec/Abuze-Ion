import { Component, ViewChild } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { OffersProvider } from '../../providers/offers/offers';
import { OfferPage } from '../offer/offer';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [OffersProvider]
})
export class HomePage {
  @ViewChild('categoriesMenu')
  categoriesMenu:any;

  offers: any;
  search: string;
  categoryFilter: string;

  constructor(public navCtrl: NavController, public offersProvider: OffersProvider, public events:Events, public splashScreen: SplashScreen) {
    this.events.subscribe('abuze:city:changed', (city) => {
      this.loadOffers(null);
    });
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter(){
    //this.categoriesMenu.nativeElement.scrollLeft = 70;
    this.splashScreen.hide();
    this.loadOffers(null);
  }

  loadOffers(infiniteScroll){
    this.offersProvider.loadNextPage().then(_offers => {
      if (this.offers){
        this.offers = this.offers.concat(_offers);
      } else {
        this.offers = _offers;
      }

      if (infiniteScroll) infiniteScroll.complete();
    });
  }

  showOfferDetails(offer){
    this.navCtrl.push(OfferPage, {offer: offer});
  }

  filterByCategory(categoryID){
    if (this.categoryFilter == categoryID){
      this.categoryFilter = null;
    } else {
      this.categoryFilter = categoryID;

      setTimeout(()=>{
        let selected = this.categoriesMenu.nativeElement.getElementsByClassName('active')[0];
        this.categoriesMenu.nativeElement.scrollLeft = (selected.offsetLeft - selected.offsetWidth);
      }, 300);
    }

  }
}
