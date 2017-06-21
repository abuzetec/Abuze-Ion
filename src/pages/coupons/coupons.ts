import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { CouponsProvider } from '../../providers/users/coupons';
import { Coupon } from '../../modals/coupon/coupon';


@Component({
  selector: 'page-coupons',
  templateUrl: 'coupons.html',
  providers: [CouponsProvider]
})
export class CouponsPage {
  couponsPage: any = CouponsPage;
  coupons: any;
  filter: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public couponsService: CouponsProvider, public modalCtrl: ModalController, public alertCtrl:AlertController) {
    this.filter = this.navParams.get('filter') || 'available';

    this.couponsService.load().then(_coupons => {
      this.coupons = _coupons;
    });            
  }

  archiveCoupon(coupon){
    let confirm = this.alertCtrl.create({
      title: 'Abuze',
      message: 'Deseja mesmo arquivar este cupom?',
      buttons: [
        {
          text: 'Não',
          handler: () => {}
        },
        {
          text: 'Sim',
          handler: () => {
            this.couponsService.archive(coupon).then(() => {
              coupon.archived = true;
              this.coupons = this.coupons.filter(it => !it.archived && Date.parse(it.expiration) >= new Date().getTime());
            })
          }
        }
      ]
    });
    
    confirm.present();
  }

  showCoupon(coupon) {
    let couponModal = this.modalCtrl.create(Coupon, {coupon: coupon});
    couponModal.present();
  }
}
