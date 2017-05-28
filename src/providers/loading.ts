import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class Loading {

  loads: Array<string> = [];
  loading: any;

  constructor(public events: Events, public loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      duration: 10000
    });    

    this.events.subscribe('abuze:loading:show', (ID) => {
      this.show(ID);
    });            

    this.events.subscribe('abuze:loading:hide', (ID) => {
      this.hide(ID);
    });                
  }

  show(ID:string){
    this.loads.push(ID);
    this.loading.present();
  }

  hide(ID:string){
    this.loads.splice(this.loads.indexOf(ID), 1);
    if (this.loads.length == 0){
      this.loading.dismiss();
    }
  }
}