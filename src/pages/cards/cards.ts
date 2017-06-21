import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CreditCardsProvider } from '../../providers/users/credit-cards';

@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html',
  providers: [CreditCardsProvider]
})
export class CardsPage {

  creditCards: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public creditCardsProvider: CreditCardsProvider, public alertCtrl:AlertController) {
    this.creditCardsProvider.load().then(_creditCards => {
      this.creditCards = _creditCards;
    });
  }

  remove(creditCard){
    let confirm = this.alertCtrl.create({
      title: 'Abuze',
      message: 'Deseja mesmo remover este cartão?',
      buttons: [
        {
          text: 'Não',
          handler: () => {}
        },
        {
          text: 'Sim',
          handler: () => {
            this.creditCardsProvider.remove(creditCard).then(() => {
              this.creditCards.splice(this.creditCards.indexOf(creditCard), 1);
            });
          }
        }
      ]
    });
    
    confirm.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardsPage');
  }
}
