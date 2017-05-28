import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { CouponsProvider } from '../../providers/users/coupons';
import { Coupon } from '../../modals/coupon/coupon';
/**
 * Generated class for the CouponsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-coupons',
  templateUrl: 'coupons.html',
  providers: [CouponsProvider]
})
export class CouponsPage {
  couponsPage: any = CouponsPage;
  coupons: any;
  filter: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public couponsService: CouponsProvider, public modalCtrl: ModalController) {
    this.filter = this.navParams.get('filter') || 'available';
    this.couponsService.load().then(_coupons => {
      this.coupons = _coupons;
    });
  }

  showCoupon(coupon) {
    let couponModal = this.modalCtrl.create(Coupon, {coupon: coupon});
    couponModal.present();
  }
}
