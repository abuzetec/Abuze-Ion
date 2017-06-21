import { Component, ViewChild } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { OffersProvider } from '../../providers/offers/offers';
import { OfferPage } from '../offer/offer';

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

  constructor(public navCtrl: NavController, public offersProvider: OffersProvider, public events:Events) {
    this.events.subscribe('abuze:city:changed', (city) => {
      this.loadOffers();
    });

    this.loadOffers();
  }

  ionViewDidLoad() {
    //this.categoriesMenu.nativeElement.scrollLeft = 70;
  }

  loadOffers(){
    this.offers = null;
    this.offersProvider.load().then(_offers => {
      this.offers = _offers;
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
