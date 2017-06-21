import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, Events, AlertController, Config } from 'ionic-angular';
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
@Component({
  templateUrl: 'app.html',
  providers: [SessionProvider]
})
export class Abuze {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  couponsPage: any = CouponsPage;
  cardsPage: any = CardsPage;
  invoicesPage: any = InvoicesPage
  changeCityPage: any = ChangeCityPage;

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
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.config.set('backButtonText', 'Voltar');

      this.events.subscribe('abuze:user:logged', (user) => {
        this.currentUser = user;

        /*zE.identify({
          name: this.currentUser.name,
          email: this.currentUser.email
        });*/
      });

      this.session.checkLogin().then(logged => {
        if (logged){
          this.currentUser = this.session.getUserData();

          /*zE.identify({
            name: this.currentUser.name,
            email: this.currentUser.email
          });*/
        }
      });

      this.events.subscribe('abuze:city:changed', (city) => {
        this.currentCity = city;
      });

      this.currentCity = this.citiesProvider.getCurrentCity();
    });
  }

  showOffers(){
    this.nav.setRoot(HomePage);
  }

  pushTo(page, params){
    this.nav.push(page, params);
  }
}
