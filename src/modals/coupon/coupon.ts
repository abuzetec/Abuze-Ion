import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

declare var QRCode: any;

@Component({
  templateUrl: 'coupon.html',
  providers: []
})
export class Coupon {

  coupon: any;

  constructor(public viewCtrl: ViewController, public params: NavParams) {
    this.coupon = params.get('coupon')

    new QRCode(document.getElementById("qrcode"), this.coupon.token);    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  } 
}