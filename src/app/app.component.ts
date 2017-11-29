import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform, Modal, ModalController, Events, AlertController, Config } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { CouponsPage } from '../pages/coupons/coupons';
import { CardsPage } from '../pages/cards/cards';
import { InvoicesPage } from '../pages/invoices/invoices';
import { Login } from '../modals/login/login';
import { ChangeCityPage } from '../modals/change-city/change-city';
import { SessionProvider } from '../providers/session/session';
import { CitiesProvider } from  '../providers/cities/cities';
import { OfflinePage } from '../pages/offline/offline';

declare var Offline: any;

@Component({
  templateUrl: 'app.html',
  providers: [SessionProvider]
})
export class Abuze implements OnInit{
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  couponsPage: any = CouponsPage;
  cardsPage: any = CardsPage;
  invoicesPage: any = InvoicesPage
  changeCityPage: any = ChangeCityPage;
  offlinePage: Modal;

  currentUser: any;
  currentCity: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public modalCtrl: ModalController, public session: SessionProvider, public events: Events, public alertCtrl: AlertController, private config: Config, public citiesProvider: CitiesProvider) {
    this.initializeApp();
  }

  isLogged(){
    return this.currentUser != null;
  }

  showLoginModal() {
    let loginModal = this.modalCtrl.create(Login);
    loginModal.present();
  }

  showOfflineModal() {
    if (!this.offlinePage){
      this.offlinePage = this.modalCtrl.create(OfflinePage);
      this.offlinePage.present();
    }
  }

  hideOfflineModal() {
    if (this.offlinePage) {
      this.offlinePage.dismiss();
      this.offlinePage = null;
    }
  }

  logOut(){
    let confirm = this.alertCtrl.create({
      title: 'Abuze',
      message: 'Deseja realmente sair?',
      buttons: [
        {
          text: 'Não',
          handler: () => {}
        },
        {
          text: 'Sim',
          handler: () => {
            this.session.logOut();
            this.currentUser = null;
          }
        }
      ]
    });

    confirm.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.config.set('backButtonText', 'Voltar');
    });

  }

  ngOnInit(){
    this.session.checkLogin().then(logged => {
      if (logged){
        this.currentUser = this.session.getUserData();
      }
    });

    this.currentCity = this.citiesProvider.getCurrentCity();

    this.events.subscribe('abuze:user:logged', (user) => {
      this.currentUser = user;
    });

    this.events.subscribe('abuze:city:changed', (city) => {
      this.currentCity = city;
    });

    this.events.subscribe('abuze:login:open', () => {
      this.showLoginModal();
    });

    this.events.subscribe('network:status:change', (online) => {
      if (online){
        this.hideOfflineModal();
      } else {
        this.showOfflineModal();
      }
    });

    Offline.options = {checks: {xhr: {url: '/assets/icon/online.ico'}}};
    let abuzeApp = this;
    Offline.on('confirmed-down', () => {
      abuzeApp.events.publish('network:status:change', false);
    });

    Offline.on('confirmed-up', () => {
      abuzeApp.events.publish('network:status:change', true);
    });

    setTimeout(() => {
      if (!Offline.check()){
        this.showOfflineModal();
      }
    }, 1000);
  }

  showOffers(){
    this.nav.setRoot(HomePage);
  }

  pushTo(page, params){
    this.nav.push(page, params);
  }
}
