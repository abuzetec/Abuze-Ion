import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, Events, AlertController, Config } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { CouponsPage } from '../pages/coupons/coupons';
import { Login } from '../modals/login/login';

import { SessionProvider } from '../providers/session/session';

@Component({
  templateUrl: 'app.html',
  providers: [SessionProvider]
})
export class Abuze {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  couponsPage: any = CouponsPage;

  currentUser: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public modalCtrl: ModalController, public session: SessionProvider, public events: Events, public alertCtrl: AlertController, private config: Config) {
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
      });    

      this.session.checkLogin().then(logged => {
        if (logged){
          this.currentUser = this.session.getUserData();
        }
      });

    });
  }

  showOffers(){
    this.nav.setRoot(HomePage);
  }

  pushTo(page){
    this.nav.push(page);
  }
}
