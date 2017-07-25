import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InvoicesProvider } from '../../providers/users/invoices';
/**
 * Generated class for the InvoicesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-invoices',
  templateUrl: 'invoices.html',
   providers: [InvoicesProvider]
})
export class InvoicesPage {

  invoices: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public invoicesProvider: InvoicesProvider) {
  }

  ionViewDidEnter() {
    this.invoicesProvider.load().then(_invoices => {
      this.invoices = _invoices;
    });
  }

  statusColor(){
  }

  statusText(invoice){
    if (invoice.paid) {
      if ((invoice.gateway == "" || invoice.gateway == 'moip' || invoice.gateway == 'PagSeguro') || invoice.captured) {
        return "Aprovado";
      } else {
        return "Em análise";
      }
    } else if (invoice.status == 'Em análise'){
      return "Em análise";
    } else if (invoice.status == 'Boleto impresso' || invoice.status == 'Iniciado'){
      return "Aguardando";
    } else {
      return "Cancelado";
    }
  }

}
