import { Component } from '@angular/core';
import { NavController, ModalController, Events, Modal } from 'ionic-angular';
import { CouponsPage } from '../coupons/coupons';
/**
 * Generated class for the OfflinePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-offline',
  templateUrl: 'offline.html',
})
export class OfflinePage {
  cuponsPage: Modal;

  constructor(public nav: NavController, public modalCtrl: ModalController, public events: Events) {
  }

  openCoupons(){
    this.nav.push(CouponsPage);
  }
}
