import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'prices.html'
})
export class PricesPage {
  offerDetail: any;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.offerDetail = this.navParams.get('offerDetail');
  }

  discount(value){
    return parseInt(value);
  }

  selectPrice(price){
    this.viewCtrl.dismiss({ 'price': price });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
