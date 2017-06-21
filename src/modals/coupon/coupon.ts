import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'coupon.html',
  providers: []
})
export class Coupon {
  
  coupon: any;

  constructor(public viewCtrl: ViewController, public params: NavParams) {
    this.coupon = params.get('coupon')
  }

  dismiss() {
    this.viewCtrl.dismiss();
  } 
}